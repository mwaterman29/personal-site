# Data Structure Visualization - VR App for teaching CS concepts

![Quest App Lab Screenshot](https://i.gyazo.com/b2e602322c1ac5ade0568ab28130d1b3.png)

Virtual Reality App for teaching computer science concepts, taking advantage of VR's unique abilities as a medium to allow for 'hands on' interaction, enhance focus, and reinforce visualization.



I've been passionate about both Virtual Reality and CS Education for a long time, and I wanted to combine my interests. During my work at Code Wiz, I saw clearly the potential for virtual reality as an education tool. For kids, teenagers, and university students alike, virtual reality holds people's interest and focus well, and is generally fun to engage with. 



As a result, I built an app that intends to teach computer science students about introductory concepts in Data Structures and Algorithms. I published this [on the Quest Store](https://www.meta.com/experiences/4172240029502629) during the Summer of 2021. During the spring of 2021, when it came time for my Honors Project, I wanted to explore this idea further.



For my project, I built a version of the app that was more of a linear, on-rails experience than a sandbox, and used it to evaluate whether VR had benefits for education. You can read the [full report here](https://www.mwaterman.dev/dist/Honors%20Report%20Final.pdf), but as it's a formal report, it's very, ***very*** long (203pg), as it contains both the full submission for my university's ethics and review board, and the **entire** source code, converted to PDF via enscript and ps2pdf, then concatenated via pdftk. I'll summarize the methodology and findings here, and leave the abstract in full as a tl;dr. Alternatively, you can read through the presentation I [presented, here.](https://www.mwaterman.dev/dist/Honors%20Project%20Final%20Report.pptx)



### Abstract

As virtual reality (VR) continues to advance and become more user-friendly, it seems to have potential as a medium for education. Some research surrounding educational VR content exists, but none that delivers the same content across multiple modalities. The purpose of this study was to evaluate whether VR itself offers benefits to students. To do so, three learning modules were created using Unity, and then published both for the desktop and for the VR headset. These modules related to concepts in Data Structures and Algorithms, and had an embedded assessment. The participants were split into two groups, one doing the first two modules in VR, the other doing the first two on a computer. Both groups completed the final module in the other modality. Participants were not aware that only the results of the first two modules were being examined, nor that other participants got a different modality first. Participant results were evaluated from both the embedded assessment and the post survey. The post survey includes Likert scale evaluations of the usability, informativeness, and enjoyability of both modalities, as well as a section for open feedback. The results seem to show that virtual reality does not offer inherent benefits to learning outcomes, but does offer benefits to student focus and engagement. It is believed that with further study, and deeper student engagement, benefits may arise.



### Context and Purpose

As I said, Computer Science education is something I've been passionate about for a long time. For a good portion of high school and even into college, I worked as a "coding coach" for Code Wiz, at which I taught kids to code, primarily focused on making video games. Through my time there, I grew into my role not only as a teacher, but helping them expand as well. This meant I had to make content and learning modules for them, to give to other coaches, so I also have expertise with iterating on educational content.

While working there, using Unity and the Quest headset, I ran summer camps, teaching kids how to code. I saw the value it had as an engaging environment for the kids, how much they enjoyed it, and the efficacy with which it helped them learn. As a result, I wanted to investigate whether VR was useful as purely an environment for learning. Could content, if delivered in VR, outperform its traditional counterparts, even without modification? **Does VR, on its own, offer benefits for learning outcomes?** That was the central question for the study.



### Study Design

To answer whether Virtual Reality as a medium offers benefits, participants were split into two groups. Each group would engage with one modality first in which they would complete two modules. Then, they would complete the final module in the opposite modality. Each module contains an embedded assessment that would test their understanding. This would collect some quantitative data on their performance.

Additionally, there was a post-survey to collect some demographic info, and then to ask the user to compare their experiences with the two different versions of the software. This sought to gather qualitative data, with questions like:

- Did you find it enjoyable? 

- Did you find it informative 
- Did you find it easy to use?

For the actual content, users were given a number of modules to go through.

![](https://i.gyazo.com/48d1708bb63e481a067b030e7f42bdae.png)

Each module had content for the users to learn:

![](https://i.gyazo.com/703cd7ea0cc3bd4a0f661e86c13354ae.png)

Then, they would be asked questions about the content they just learned.

![img](https://i.gyazo.com/fb3efb96c46c7e1ac46701a25afd11fd.png)

This general process repeats for each module, with modules on Binary Trees, Linked Lists, and Graph Theory. 



### Results

Perhaps unfortunately, the results lack sufficient evidence to reject the null hypothesis. The mean results from the embedded assessment were nearly identical, at about 75% correct. (Table 1) In fact, the mean score for the Linked List modules was exactly identical, with the exact same number of total correct answers between the two groups. The only statistically significant differences observed were with the results on enjoyability. It's important to note that these results are ordinal: "strongly agree" only tells that someone agrees more than a "slightly agree" result, but not at all by how much. These results were tested by the Mann-Whitney U test, which is a test for ordinal data. According to that test, the results for “I would like to learn more content through Virtual Reality/Desktop” are statistically significant.

Despite this, the open-feedback responses are still certainly informative. Participants reported that:

-  "I feel like it was more engaging to me to be in VR. helps me focus"
-  "I really enjoyed the VR and to treat it as a game in a sense." 
- "I think that learning about data structures in VR was very informative and far more enjoyable then learning about them on the desktop experience." 

Clearly, some students find this to be a viable, more engaging, more fun medium compared to traditional content.



### Limitations; Context for Future Work

These results also can serve as contextual work for future studies. This is for a couple reasons:

- The modules were identical in content.
- The target time was short.
- This study tested things students already knew to some degree.
- Students said VR was more engaging.

Over the course of a semester or long time frame course, students could be separated into two groups. One would receive content in Virtual Reality, the other traditional materials. These materials could have some different activities, while covering the same conceptual content. Retaining a modality switch could also still provide useful insight. With a long time frame, one could evaluate the differences in the pre-post swap. If students improved after switching to VR, and/or got worse after switching to traditional materials, that serves as further evidence for this phenomenon. Regardless, the clear potential for extending the scope, the reported engagement by students, and the relative lack of research in this area all necessitates future study.



### Conclusion and Reflection

Though in this case, we failed to reject the null hypothesis, the process and data were still instructive. We accomplished about as much as is possible in a one-semester project, and received unprecedented interest in participating in the study. 

Personally, I have deeply enjoyed the process of creating, refining, and testing this software, and it's nice to have an answer to a question I've wondered about for years. I look forward to continued research in the area of computer science education with virtual reality.

Professionally, this whole project was a really great experience for me. I finished the publishing process right before I went to Acadia national park, and received the notification from Oculus and the ratings board that it went live on the top of a mountain, since I didn't have cell service anywhere else in the park. It was immensely useful to build, test, refine, and polish a project, and to submit it to go live. There's a big difference between working on something for yourself, and calling it "done", compared to when it's "done" in the eyes of an app store or publisher. Similarly for my Honors Project - I had big adaptations to make to the software - and I had to have it done by the start of May - no exceptions. Being held to a rigorous deadline like that, while working nearly full-time for VRtex to launch the Marketplace on time, refined and locked in my work ethic. If I could do it all again, I would - but I'd better manage the scope of almost everything I worked on. Still, I think the experience was immensely useful.