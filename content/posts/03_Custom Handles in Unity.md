# Custom Handles in Unity

![img](https://i.gyazo.com/4a6c50bfd3283421027ffd783b70fdbe.png)

The Handles class in Unity offers extremely powerful tools for extending editor interactions. Despite this, the documentation is underwhelming at best, particularly for the CapFunction delegate that allows for custom mesh handles to be drawn.

The [existing documentation](https://docs.unity3d.com/ScriptReference/Handles.CapFunction.html) has the following description:

### Description

The function to use for drawing the handle e.g. Handles.RectangleCap.

Custom CapFunction has two responsibilities:

1. For [EventType.Layout](https://docs.unity3d.com/ScriptReference/EventType.Layout.html) event, call [HandleUtility.AddControl](https://docs.unity3d.com/ScriptReference/HandleUtility.AddControl.html) to inform Unity about the distance of the handle from mouse position.
2. For [EventType.Repaint](https://docs.unity3d.com/ScriptReference/EventType.Repaint.html) event, render the actual handle.

Though this is technically sufficient to use a custom handle, I definitely needed more direction on step 2.



Let's look at the [Unity source code](https://github.com/Unity-Technologies/UnityCsReference/blob/258abdf1d3dd9c35c4494d7b7acd3f1ce3d9ae84/Editor/Mono/Handles/Handles.cs#L612) to find how the [CubeHandleCap](https://docs.unity3d.com/ScriptReference/Handles.CubeHandleCap.html) function works

```cs
// Draw a cube. Pass this into handle functions.
        public static void CubeHandleCap(int controlID, Vector3 position, Quaternion rotation, float size, EventType eventType)
        {
            switch (eventType)
            {
                case EventType.Layout:
                case EventType.MouseMove:
                    HandleUtility.AddControl(controlID, HandleUtility.DistanceToCube(position, rotation, size));
                    break;
                case (EventType.Repaint):
                    Graphics.DrawMeshNow(cubeMesh, StartCapDraw(position, rotation, size));
                    break;
            }
        }
```

As it says in the documentation, the Events are properly handled. StartCapDraw also is not accessible outside of the source code, so [lets look at this as well](https://github.com/Unity-Technologies/UnityCsReference/blob/258abdf1d3dd9c35c4494d7b7acd3f1ce3d9ae84/Editor/Mono/Handles/Handles.cs#L1101):

```cs
// Sets up matrix
        internal static Matrix4x4 StartCapDraw(Vector3 position, Quaternion rotation, float size)
        {
            Shader.SetGlobalColor("_HandleColor", realHandleColor);
            Shader.SetGlobalFloat("_HandleSize", size);
            Matrix4x4 mat = matrix * Matrix4x4.TRS(position, rotation, Vector3.one);
            Shader.SetGlobalMatrix("_ObjectToWorld", mat);
            HandleUtility.handleMaterial.SetFloat("_HandleZTest", (float)zTest);
            HandleUtility.handleMaterial.SetPass(0);
            return mat;
        }
```

If you were to paste this, you'd see that matrix and zTest are [both getters to native bindings](https://github.com/Unity-Technologies/UnityCsReference/blob/258abdf1d3dd9c35c4494d7b7acd3f1ce3d9ae84/Editor/Mono/Handles/Handles.bindings.cs#L32). Uh oh!

```cs
		// ZTest of the handles		
		[NativeProperty("handles::g_HandleZTest", true, TargetType.Field)]
        public static extern CompareFunction zTest { get; set; }

        // Matrix for all handle operations
        public static extern Matrix4x4 matrix
        {
            [FreeFunction("Internal_GetMatrix")] get;
            [FreeFunction("Internal_SetMatrix")] set;
        }
```

It seems like you can get away with referencing these via Handles.__, so let's step through actual functional code:



## The Solution

1. Substitute a StartCapDraw method - substitutions compared to the native method are commented.

   ```cs
           public static Matrix4x4 StartCapDraw(Vector3 position, Quaternion rotation, float size)
           {
               //Pull the handles color instead of realHandleColor
               Shader.SetGlobalColor("_HandleColor", Handles.color);
               Shader.SetGlobalFloat("_HandleSize", size);
   
               //Pull handles matrix
               Matrix4x4 mat = Handles.matrix * Matrix4x4.TRS(position, rotation, Vector3.one);
               Shader.SetGlobalMatrix("_ObjectToWorld", mat);
   
               //Cast and assign Handles.zTest
               HandleUtility.handleMaterial.SetFloat("_HandleZTest", (float)Handles.zTest);
               HandleUtility.handleMaterial.SetPass(0);
   
               return mat;
           }
   ```

2. Create a second-order method that'll return a CapFunction:

   ```cs
           public static Handles.CapFunction GenerateHandleCapFunction(Mesh m)
           {
               Handles.CapFunction capFunction = (int controlID, Vector3 position, Quaternion rotation, float size, EventType eventType) =>
               {
                   switch (eventType)
                   {
                       case EventType.Layout:
                       case EventType.MouseMove:
                           HandleUtility.AddControl(controlID, HandleUtility.DistanceToRectangle(position, rotation, size));
                           break;
                       case (EventType.Repaint):
                           Graphics.DrawMeshNow(m, StartCapDraw(position, rotation, size));
                           break;
                   }
               };
   
               return capFunction;
           }
   ```

   Note the HandleUtility.DistanceToRectangle. Though internally, there are a number of DistanceTo... functions, it's probably simplest to approximate the size of the mesh using either Circle or Rectangle. A more advanced solution would be to use a polyline or disc with a corresponding normal, but this is functional enough for my use. If you really want to make a DistanceTo for an arbitrary mesh - [start here](https://github.com/Unity-Technologies/UnityCsReference/blob/258abdf1d3dd9c35c4494d7b7acd3f1ce3d9ae84/Editor/Mono/Handles/HandleUtility.cs#L342C10-L342C10).

   

3. Call the handles from an OnSceneGUI delegate:

   ```cs
   					Handles.color = Color.red;
                       if (Handles.Button(Vector3.zero, Quaternion.identity, 1.0f, 1.0f, GenerateHandleCapFunction(testMesh)))
                           Debug.Log("Clicked your mesh!");
   ```



Now, the mesh is drawn as a handle! 

![img](https://i.gyazo.com/b9db0ce43c742965ad1b3981be523226.png)

Our new HandleCapFunction can be passed anywhere the normal delegates can - Slider, Slider2D, Button, and FreeMoveHandle all accept the ability to draw a custom mesh.