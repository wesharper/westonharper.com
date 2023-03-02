---
title: "Why Like Now is Ditching React Native"
description: "We made the hard choice to go full native, but it probably still isn't the right choice for your startup."
pubDate: "Mar 2 2023"
---

A few weeks ago, after around 8 months of development on Like Now, we decided to pull the plug on React Native. I still think that React Native or some other cross-platform framework is the right choice for most startups, but that choice doesn't come with serious tradeoffs. Through that time we learned a lot about the strengths and weaknesses of React Native and about why some teams might prefer to avoid that route altogether.

## The Good

React Native and other build-once-run-anywhere platforms are, in theory, the best way to build an app with a small team. Your whole squad can contribute to one codebase with shared logic and a mostly shared UI layer and over time, as the team gets more and more comfortable with the quirks of the framework, the reduced overhead should pay dividends for development speed.

We saw some of this play out at Like Now. Spinning up an app with React Native is pretty straightforward and we were up and running with an app that could authenticate users with Firebase Auth in a really short amount of time.
Having shared UI and business logic meant that once something was built, it could be easily reused or manipulated to fit our needs, and we were seeing some good progress for a while.

We also reaped the benefits of React Native's maturity. The ecosystem is huge and there are a ton of 3rd party packages that solve a bunch of common problems. Not to mention, Expo's vetted library of packages makes discovery and auditing of said packages pretty straightforward.

Additionally, one huge advantage of React Native is that you can push "over the air" updates to your app to patch a bug as long as none of the native code changed, avoiding a lengthy app review process for any critical issues. We were never able to benefit from this particular feature because we never released an app, but it was a big reason why we stuck with it for so long.

## The Bad

Unfortunately, for us, the promise of the build-once-run-anywhere codebase never really panned out. Our goal was to publish an app on 2 different platforms, iOS and Android mobile phones. In theory, React Native has support for building consistent UI across platforms using CSS-like styling rules. In practice, React Native doesn't abstract away some of the platform specifics. We noticed that little things like line height, padding, and the behavior of a `KeyboardAvoidingView` had to be handled differently on each platform because React Native often doesn't consistently apply styles with parity to both platforms. Here's an example of one such carve out from their own documentation for `KeyboardAvoidingView` behavior:

> Android and iOS both interact with this prop differently. On both iOS and Android, setting behavior is recommended.

We started to realize that for some components, if we wanted to achieve a UI that "felt good" on both iOS and Android, we would need to build a completely different version for each platform. In my opinion, Flutter handles this sort of styling consistency better, but at the end of the day iOS and Android are different beasts and React Native just doesn't handle making a consistent UI layer as elegantly as it might purport.

We also started seeing cracks in some of the 3rd party packages we were using. The RNFirebase package is the best supported SDK wrapper for Firebase and writing our own bridge for the extensive breadth of the Firebase suite of tools was too much to stomach. However, it became quickly obvious that the package behaved differently on Android and iOS. Why? Because the package simply wraps the Android and iOS native SDKs in a thin layer of JavaScript, so any SDK differences either need to be abstracted in the JS package or left in for the end user to find.

We were willing to write these off as minor inconveniences. We still got the benefit of contributing to the same codebase and we never expected a framework like this to be completely seamless. We could forge ahead and make minor tweaks where needed, no biggie.

## The Ugly?

The final death blow for React Native wasn't really any inherent issue with the framework itself, but the realization that our team never found a productive groove. Here's the composition of the engineering team:

- 2 native iOS engineers.
- 1 native Android engineer.
- 1 full-stack JavaScript engineer (me).

Trying to build the app in React Native meant that 75% of the team had to learn a new language, a new framework, new build tools, new paradigms, etc. It's not that the team can't learn React Native, it's that when your whole team is building the app in their free time away from their day job, development hours are pretty scant. The reality is that the team was constantly having to prioritize learning over building, and when you only have 2-3 hours here or there to write code, you might get stuck in a rut of feeling like productivity will _never_ come.

Finally, after months of the team silently wishing they could focus on what they already know, we decided that we'd give the full-native approach a 2 week test run. In that 2 weeks, team morale skyrocketed and productivity soared. We have 3 codebases (iOS, Android, back-end) and inherently are now split into dev silos, _but_ the team is _happy_ and _productive_. Since we made the switch at the beginning of February, we've almost achieved parity with what we were able to build in roughly 6 months of active React Native development. Plus, now I get to focus solely on the back-end, which is a fun new challenge for me.

## Conclusion

The biggest takeaway for me actually has nothing to do with whether or not React Native is a good choice. Instead, I learned that sometimes the most pragmatic sounding business decision might not pan out in the real world. When we started and picked out a tech stack, I pushed really hard for React Native with arguments like: "it protects us if someone leaves the team" and "we will switch to full-native when we're a bigger company and we can afford to hire separate teams". Instead, I wish I would have spent less time focusing on the theoretical best decision and spent more time thinking about what that decision meant in the real world.

The theoretical facts were less important in the long-run than the real ones:

- We are a distributed team so communication is tough
- Everyone is working on this outside of their day job so time is precious
- We have 3 expert native engineers who have proven they can get things done quickly in their stack

Choosing React Native meant that we weren't emphasizing the strengths of the existing team, but instead basically applying a blanket handicap. Moving forward, I'll be looking for opportunities to augment the strengths of the team that I have now and add more weight to the real world factors that might be at play. If your team is composed of all JavaScript developers, React Native is a great choice. For us, native is the way to go.
