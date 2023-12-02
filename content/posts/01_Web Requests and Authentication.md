# Editor Scripting for Async web requests and Authentication

![]()

Description here 

When trying to write code that interacts with web APIs from the Editor, you need async support. Since the Editor Coroutines package doesn't work with Unity Web Requests, you need a workaround to have consistent, expected behavior.

### Awaitable Web Requests 

Sourced from [this gist](https://gist.github.com/krzys-h/9062552e33dd7bd7fe4a6c12db109a1a?permalink_comment_id=3866694), this code works to await web requests.

```csharp
    public readonly struct AsyncOperationAwaiter : INotifyCompletion
    {
        private readonly AsyncOperation _asyncOperation;
        public bool IsCompleted => _asyncOperation.isDone;

        public AsyncOperationAwaiter(AsyncOperation asyncOperation) => _asyncOperation = asyncOperation;

        public void OnCompleted(Action continuation) => _asyncOperation.completed += _ => continuation();

        public void GetResult() { }
    }

    public readonly struct UnityWebRequestAwaiter : INotifyCompletion
    {
        private readonly UnityWebRequestAsyncOperation _asyncOperation;

        public bool IsCompleted => _asyncOperation.isDone;

        public UnityWebRequestAwaiter(UnityWebRequestAsyncOperation asyncOperation) => _asyncOperation = asyncOperation;

        public void OnCompleted(Action continuation) => _asyncOperation.completed += _ => continuation();

        public UnityWebRequest GetResult() => _asyncOperation.webRequest;
    }

    public static class UnityWebRequestExtensionMethods
    {
        public static UnityWebRequestAwaiter GetAwaiter(this UnityWebRequestAsyncOperation asyncOp)
        {
            return new UnityWebRequestAwaiter(asyncOp);
        }
    }
```

In the editor, you can create an awaitable task that'll handle the request.

```csharp
    public async virtual Task<string> MakeWebRequest(string url, string endpoint = "", string query = "", bool log = false)
    {

        string uri = url + endpoint + (query.Contains('?') ? "" : "?") + query;

        UnityWebRequest webRequest = UnityWebRequest.Get(uri);

        await webRequest.SendWebRequest();

        if (webRequest.isHttpError || webRequest.isNetworkError)
        {
            Debug.Log("The site might be down! See below:");
            Debug.LogError(webRequest.error);
            return null;
        }

        if (log)
        {
            Debug.Log(webRequest.responseCode + " : " + webRequest.url);
            Debug.Log(webRequest.downloadHandler.text);
        }

        return webRequest.downloadHandler.text;
    }
```

Now, checking web endpoints is simple(ish). As long as a component is attached to an object, this'll work. I prefer to use a singleton-type object that makes sure there's always exactly one component of this type in the scene, from which web requests can be called.

For example, our code to check for an update when the software is opened.

```csharp
    public static async void CheckForUpdate(string user_id, string token)
    {
        string latest = await MakeWebRequest(VRTEX_URL, LATEST_ENDPT);

        if (string.IsNullOrEmpty(latest))
            return;

        if(latest.Contains(VERSION))
        {
            //Up to date on current version - all good!
            Debug.Log($"VRtex Studios is up to date on version {VERSION}");
            return;
        }

        //Otherwise, request new version from the site.
        Debug.Log($"New version available, downloading...");
        await VersionRuntimeObject.RequestNewVersion(user_id, token);
    }
```

RequestNewVersion initiates a request to the site that returns a presigned URL for the updated .unitypackage file.



### Handling OAuth2

 As I have mentioned, VRtex uses Discord as our authentication provider, both on the website, and in Unity. To authenticate, the approach is as follows:

1. Open an HttpListenerContext on the redirect URL from discord

2. Open the discord authentication URL in the user's browser

3. Accept the code, display a "succeeded page", and continue.

   In the code, those first three steps can be handled with one method:

   ```cs
   internal async Task GetCode()
           {
               //Start server
               listener.Prefixes.Add($"http://localhost:{PORT}/");
               listener.Start();
   
               //request
               Application.OpenURL(DISCORD_AUTH_URL);
   
               //await response
               HttpListenerContext c = await listener.GetContextAsync();
   
               byte[] _responseArray = Encoding.UTF8.GetBytes(htmlResponseString); // get the bytes to response
               c.Response.OutputStream.Write(_responseArray, 0, _responseArray.Length); // write bytes to the output stream
               c.Response.Close(); // close the connection
   
               string respUrl = c.Request.Url.ToString();
               code = respUrl.Substring(respUrl.IndexOf("code=") + 5);
   
               //Debug.Log($"Authentication returned from Discord with code {code}");
   
               listener.Stop();
           }
   ```

   DISCORD_AUTH_URL is a constant for the auth. url, and htmlResponseString is a minimal html document string to show the user that the authentication succeeded. It's not pretty, but it is functional!

4. Exchange the code for a token
   Once the token is granted, this is exchanged for an access token, following the standard OAuth2 authorization code grant, [as documented by Discord](https://discord.com/developers/docs/topics/oauth2#authorization-code-grant) 

   ```csharp
           internal async Task Exchange_Code(string code)
           {
               Dictionary<string, string> content = new Dictionary<string, string>();
               <code to pull client id and secret omitted for obvious reasons>
               content.Add("client_id", c_id);
               content.Add("client_secret", c_sec);
               content.Add("grant_type", "authorization_code");
               content.Add("code", code);
               content.Add("redirect_uri", "http://localhost:8682");
   
               UnityWebRequest request = UnityWebRequest.Post("https://discord.com/api/v10/oauth2/token", content);
   
               await request.SendWebRequest();
   
               if (request.isHttpError || request.isNetworkError)
               {
                   Debug.LogError($"Errored! {request.error}");
                   Debug.Log($"Info: {request.downloadHandler.text}");
               }
   
               string result = request.downloadHandler.text;
               //Debug.Log($"Result: {result}");
               Token json = JsonUtility.FromJson<Token>(result);
   
               //Debug.Log($"Json: {json.access_token} and {json.refresh_token}");
   
               token = json.access_token;
               refresh_token = json.refresh_token;
           }
   ```

   Now the user is successfully authenticated! 

5. Make queries for roles, user data, etc...
   In our case, we need to query the user roles to see if they're subscribed, as well as pinging our own site to get assets and avatars owned by the user.