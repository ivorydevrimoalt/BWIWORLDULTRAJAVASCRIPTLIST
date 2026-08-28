// 1. Inject hidden YouTube player container
const playerContainer = document.createElement('div');
playerContainer.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
playerContainer.innerHTML = '<div id="yt-player-instance"></div>';
document.body.appendChild(playerContainer);

// 2. Inject SVG displacement filter with phase/frequency shift logic
const svgNs = "http://www.w3.org/2000/svg";
const svgElement = document.createElementNS(svgNs, 'svg');
svgElement.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;z-index:-1;';

svgElement.innerHTML = `
  <defs>
    <filter id="displacement-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence id="turb-element" type="turbulence" baseFrequency="0.02 0.02" numOctaves="2" result="noise" seed="1" />
      <feDisplacementMap id="disp-map" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
`;
document.body.appendChild(svgElement);

// Apply SVG filter to document body without transform/rotation
document.body.style.filter = 'url(#displacement-filter)';

// 3. Inject Brightness Overlay
const brightnessOverlay = document.createElement('div');
brightnessOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#ffffff;opacity:0;pointer-events:none;z-index:99999;mix-blend-mode:screen;';
document.body.appendChild(brightnessOverlay);

const dispMap = document.getElementById('disp-map');
const turbElement = document.getElementById('turb-element');

// 4. Load YouTube IFrame API
let player;
if (!window.YT) {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('yt-player-instance', {
    height: '200',
    width: '200',
    videoId: '6d_xGeW56Hk',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'disablekb': 1,
      'playsinline': 1
    },
    events: {
      'onReady': (event) => {
        event.target.playVideo();
        requestAnimationFrame(animationLoop);
      }
    }
  });
};

if (window.YT && window.YT.Player) {
  window.onYouTubeIframeAPIReady();
}

// 5. Animation Loop based purely on SVG turbulence phase shifts
let currentPhase = 0;

function animationLoop() {
  if (player && player.getCurrentTime) {
    const currentTime = player.getCurrentTime();

    // Phase 1: 0s to 16s (Idle)
    if (currentTime < 16) {
      dispMap.setAttribute('scale', '0');
      brightnessOverlay.style.opacity = '0';
    }

    // Phase 2: 16s to 25s (Displacement scale 0 -> 20, ripple phase accelerates to 3-frame cycle)
    else if (currentTime >= 16 && currentTime < 25) {
      const progress = (currentTime - 16) / 9;

      // Amplitude ramps linearly from 0 to 20
      const currentScale = progress * 20;
      dispMap.setAttribute('scale', currentScale.toFixed(2));

      // Phase shift accelerates: reaches 120deg (2PI / 3) per frame -> full 360deg cycle every 3 frames
      const phaseStep = 0.05 + Math.pow(progress, 2) * ((Math.PI * 2 / 3) - 0.05);
      currentPhase += phaseStep;

      // Shift base frequencies across X/Y in SVG space without rotating DOM
      const baseFreqX = 0.02 + Math.sin(currentPhase) * 0.015;
      const baseFreqY = 0.02 + Math.cos(currentPhase) * 0.015;
      turbElement.setAttribute('baseFrequency', `${baseFreqX.toFixed(4)} ${baseFreqY.toFixed(4)}`);

      brightnessOverlay.style.opacity = '0';
    }

    // Phase 3: 25s to 48s (Scale = 20, max speed 3-frame ripple cycle, screen brightens)
    else if (currentTime >= 25 && currentTime < 48) {
      dispMap.setAttribute('scale', '20');

      // Exactly 3 frames per full 360deg phase cycle
      currentPhase += (Math.PI * 2) / 3;

      const baseFreqX = 0.02 + Math.sin(currentPhase) * 0.015;
      const baseFreqY = 0.02 + Math.cos(currentPhase) * 0.015;
      turbElement.setAttribute('baseFrequency', `${baseFreqX.toFixed(4)} ${baseFreqY.toFixed(4)}`);

      // Brightness slowly increases from 0 to 1
      const brightProgress = (currentTime - 25) / 23;
      brightnessOverlay.style.opacity = brightProgress.toFixed(3);
    }

    // Phase 4: 48s+ (Fade out displacement scale and brightness over 5s)
    else if (currentTime >= 48) {
      const fadeProgress = Math.min((currentTime - 48) / 5, 1);
      const remainingFactor = 1 - fadeProgress;

      dispMap.setAttribute('scale', (20 * remainingFactor).toFixed(2));
      brightnessOverlay.style.opacity = remainingFactor.toFixed(3);

      currentPhase += ((Math.PI * 2) / 3) * remainingFactor;
      const baseFreqX = 0.02 + Math.sin(currentPhase) * 0.015 * remainingFactor;
      const baseFreqY = 0.02 + Math.cos(currentPhase) * 0.015 * remainingFactor;
      turbElement.setAttribute('baseFrequency', `${baseFreqX.toFixed(4)} ${baseFreqY.toFixed(4)}`);

      if (fadeProgress >= 1) {
        document.body.style.filter = 'none';
      }
    }
  }

  requestAnimationFrame(animationLoop);
}
