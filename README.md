# DivergenceMeter
Analyzing real-world news, tries to estimate the current divergence value of the world in Steins;Gate terms.
<div id="divergence-meter" style="cursor: pointer;">
  <img alt="Digit 0" class="digit" src="https://divergence.nyarchlinux.moe/images/11.gif" width="10%">
  <img alt="Digit 1" class="digit" src="https://divergence.nyarchlinux.moe/images/12.gif" width="10%">
  <img alt="Digit 2" class="digit" src="https://divergence.nyarchlinux.moe/images/11.gif" width="10%">
  <img alt="Digit 3" class="digit" src="https://divergence.nyarchlinux.moe/images/12.gif" width="10%">
  <img alt="Digit 4" class="digit" src="https://divergence.nyarchlinux.moe/images/11.gif" width="10%">
  <img alt="Digit 5" class="digit" src="https://divergence.nyarchlinux.moe/images/12.gif" width="10%">
  <img alt="Digit 6" class="digit" src="https://divergence.nyarchlinux.moe/images/11.gif" width="10%">
  <img alt="Digit 7" class="digit" src="https://divergence.nyarchlinux.moe/images/12.gif" width="10%">
</div>

- [Website](https://divergence.nyarchlinux.moe)
- [API Documentation](https://divergence.nyarchlinux.moe/docs.html)
- [Features](#features)
- [Screenshots](#screenshots)
- [Worldline Calculation](#worldline-calculation)
- [Python Example](https://github.com/FrancescoCaracciolo/DivergenceMeter/blob/main/src/client/client.py)
- [Credits](#credits)

## Features

- <img alt="Digit 0" class="digit" src="https://divergence.nyarchlinux.moe/images/11.gif" width="5px" /> <img alt="Digit 0" class="digit" src="https://divergence.nyarchlinux.moe/images/12.gif" width="5px" /> The website can be visited at <a href="https://divergence.nyarchlinux.moe">https://divergence.nyarchlinux.moe</a>. 
- 🔄 **Auto Updated**: the counter updates itself every 15 minutes
- 🗞 **News Table**: see how our world news affect the timeline
- 📊 **Plot**: displaying the estimations of the worldline over time
- 🔉 **Sound**: Sound from the VN is played when the estimation of the worldline is changed
- 🪶 **Lite mode**: <a href="https://divergence.nyarchlinux.moe/lite.html">a lite mode is available</a>, not displaying the plot that takes resources
- 🛠 **Free & Public API**: Integrate our mesurements in your projects. Create custom widgets, real world divergence meter, apps and much more with it!  
The divergence counter refreshes automatically every 15 minutes. <a href="https://divergence.nyarchlinux.moe/docs.html">API Docs</a>
- ⏳ **Analysis interval**: every 15 minutes, the current world news are analyzed in order to estimate the current worldline divergence

## Screenshots
**Divergence Meter**
![image](https://github.com/user-attachments/assets/4dfacc07-6d5e-4e66-9450-ada057e17725)

**Worldline Status Report**
![image](https://github.com/user-attachments/assets/2ee7c178-d182-4075-a9be-5e298bf83dbb)

**Divergence Plot**
![image](https://github.com/user-attachments/assets/abe100b6-4d88-46de-838a-f2a8227be1aa)

## Worldline calculation
In Steins;Gate, the divergence is calculated using the difference in gravity value between wordlines.
Since I don't have the Reading Steiner (at least to my knowledge), and I have not travelled to any worldline yet, the worldline is **estimated** using 
world news. The news are taken from multiple RSS feeds featuring world news, science news and local news.

**TODO**

## Credits
- [Steins;Gate Wiki](https://steins-gate.fandom.com/wiki/Steins;Gate_Wiki) for some information about divergence
- [LuqueDaniel/Divergence-Meter](https://github.com/LuqueDaniel/Divergence-Meter/tree/master) for images and gifs
- [SciAdv Series](https://wikipedia.org/wiki/Science_Adventure) for being peak

If you want to support the project, leave a ⭐️

Made with ❤️ by <a href="https://nyarchlinux.moe">Nyarch Linux</a> lead developer
