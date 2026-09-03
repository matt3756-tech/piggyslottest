(function () {
  'use strict';
  const Slot=window.Slot;
  const Audio=Slot.Audio={samples:{},prepared:false,music:null,sfxMuted:localStorage.getItem('bankCollectSfxMuted')==='1',musicMuted:localStorage.getItem('bankCollectMusicMuted')==='1'};

  Audio.prepareSamples=function(){
    if(Audio.prepared)return;Audio.prepared=true;
    const c=Slot.Config.audio||{},files={reelStop:c.reelStopFile,pigBreak:c.pigBreakFile,coinInPig:c.coinInPigFile,buttonClick:c.buttonClickFile,freeSpinLand:c.freeSpinLandFile,bonusWin:c.bonusWinFile,dollarLand:c.dollarLandFile,coinsFalling:c.coinsFallingFile,regularWin:c.regularWinFile,coinCollect:c.coinCollectFile,collectLand:c.collectLandFile},poolSize=Slot.Utils.isIOSWebKit?2:Math.max(2,Math.round(Number(c.voicePoolSize)||8));
    Object.entries(files).forEach(([key,path])=>{if(!path)return;const voices=[];for(let i=0;i<poolSize;i++){const media=new window.Audio(Slot.Utils.cacheUrl(path));media.preload='auto';media.load();voices.push(media);}Audio.samples[key]={voices,index:0};});
  };
  Audio.unlockUserGesture=function(){
    if(!Slot.Config.audio.enabled)return;Audio.prepareSamples();
    Object.values(Audio.samples).forEach(pool=>{const media=pool?.voices?.[0];if(!media)return;try{const oldMuted=media.muted;media.muted=true;media.currentTime=0;const pr=media.play();if(pr&&pr.then)pr.then(()=>{media.pause();try{media.currentTime=0;}catch(_){}media.muted=oldMuted;}).catch(()=>{media.muted=oldMuted;});}catch(_){}});
    if(!Audio.music&&Slot.Config.audio.musicFile){Audio.music=new window.Audio(Slot.Utils.cacheUrl(Slot.Config.audio.musicFile));Audio.music.loop=true;Audio.music.preload='auto';}
    if(Audio.music&&!Audio.musicMuted){Audio.music.volume=Slot.Utils.clamp(Number(Slot.Config.audio.musicVolume)||.45,0,1);Audio.music.play().catch(()=>{});}
  };
  Audio.unlock=function(){if(!Slot.Config.audio.enabled)return;Audio.prepareSamples();if(!Audio.music&&Slot.Config.audio.musicFile){Audio.music=new window.Audio(Slot.Utils.cacheUrl(Slot.Config.audio.musicFile));Audio.music.loop=true;Audio.music.preload='auto';}if(window.__BANK_PLAY_STARTED__)Audio.startMusic();};
  Audio.startMusic=function(){if(!Slot.Config.audio.enabled)return;Audio.prepareSamples();if(!Audio.music&&Slot.Config.audio.musicFile){Audio.music=new window.Audio(Slot.Utils.cacheUrl(Slot.Config.audio.musicFile));Audio.music.loop=true;Audio.music.preload='auto';}if(Audio.music){Audio.music.volume=Audio.musicMuted?0:Slot.Utils.clamp(Number(Slot.Config.audio.musicVolume)||.45,0,1);if(!Audio.musicMuted)Audio.music.play().catch(()=>{});}};
  Audio.playSample=function(key,volume=1,options={}){
    if(!Slot.Config.audio.enabled||Audio.sfxMuted)return Promise.resolve();Audio.unlock();const pool=Audio.samples[key];if(!pool?.voices?.length)return Promise.resolve();
    let media=pool.voices.find(v=>v.paused||v.ended);if(!media){media=pool.voices[pool.index++%pool.voices.length];media.pause();}else pool.index=(pool.voices.indexOf(media)+1)%pool.voices.length;
    try{media.currentTime=0;}catch(_){}media.volume=Slot.Utils.clamp((Number(Slot.Config.audio.masterVolume)||0)*(Number(volume)||0),0,1);media.preservesPitch=false;media.mozPreservesPitch=false;media.webkitPreservesPitch=false;media.playbackRate=Slot.Utils.clamp(Number(options.playbackRate)||1,.5,2);
    return new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;media.removeEventListener('ended',finish);media.removeEventListener('error',finish);resolve();};media.addEventListener('ended',finish);media.addEventListener('error',finish);media.play().catch(finish);});
  };
  Audio.click=()=>Audio.playSample('buttonClick',Slot.Config.audio.buttonClickVolume);
  Audio.reelStop=()=>Audio.playSample('reelStop',Slot.Config.audio.reelStopSfxVolume);
  Audio.collectPing=()=>Promise.resolve();
  Audio.coinInPig=()=>Audio.playSample('coinInPig',Slot.Config.audio.coinInPigSfxVolume);
  Audio.pigBreak=()=>Audio.playSample('pigBreak',Slot.Config.audio.pigBreakSfxVolume);
  Audio.freeSpinLand=reelIndex=>Audio.playSample('freeSpinLand',Slot.Config.audio.freeSpinLandVolume,{playbackRate:1+Math.max(0,Number(reelIndex)||0)*Math.max(0,Number(Slot.Config.audio.freeSpinLandPitchStep)||.06)});
  Audio.bonusWin=()=>Audio.playSample('bonusWin',Slot.Config.audio.bonusWinVolume);
  Audio.dollarLand=()=>Audio.playSample('dollarLand',Slot.Config.audio.dollarLandVolume);
  Audio.coinsFalling=()=>Audio.playSample('coinsFalling',Slot.Config.audio.coinsFallingVolume);
  Audio.regularWin=()=>Audio.playSample('regularWin',Slot.Config.audio.regularWinVolume);
  Audio.coinCollect=()=>Audio.playSample('coinCollect',Slot.Config.audio.coinCollectVolume);
  Audio.collectLand=()=>Audio.playSample('collectLand',Slot.Config.audio.collectLandVolume);
  Audio.toggleMusic=function(){Audio.musicMuted=!Audio.musicMuted;localStorage.setItem('bankCollectMusicMuted',Audio.musicMuted?'1':'0');Audio.unlock();if(Audio.music){Audio.music.volume=Audio.musicMuted?0:Slot.Utils.clamp(Number(Slot.Config.audio.musicVolume)||.45,0,1);if(Audio.musicMuted)Audio.music.pause();else Audio.music.play().catch(()=>{});}return !Audio.musicMuted;};
  Audio.toggleSfx=function(){Audio.sfxMuted=!Audio.sfxMuted;localStorage.setItem('bankCollectSfxMuted',Audio.sfxMuted?'1':'0');return !Audio.sfxMuted;};
  document.addEventListener('slot:settings-changed',event=>{if(event.detail?.path==='audio.musicVolume'&&Audio.music)Audio.music.volume=Audio.musicMuted?0:Slot.Utils.clamp(Number(Slot.Config.audio.musicVolume)||0,0,1);});
  window.addEventListener('slot:play-started',()=>Audio.startMusic());
})();
