(function () {
  'use strict';
  const Slot=window.Slot;
  Slot.State={credits:10000,bet:100,lastWin:0,isSpinning:false,autoSpin:false,fitScale:1,forceCollectNext:false,forceFreeSpinsNext:false,freeSpinsRemaining:0};

  Slot.Game={
    init(){if(Slot.Utils.isIOSWebKit)document.documentElement.classList.add('ios-webkit');Slot.Audio.prepareSamples();Slot.State.credits=Number(Slot.Config.game.startingCredits)||10000;Slot.Config.game.currentBetIndex=Slot.Utils.clamp(Number(Slot.Config.game.currentBetIndex)||0,0,Slot.Config.game.betLevels.length-1);Slot.State.bet=Number(Slot.Config.game.betLevels[Slot.Config.game.currentBetIndex])||100;Slot.GameMath.generatePlaceholderPays();Slot.Rendering.applyArtwork();Slot.Rendering.createReels();Slot.Rendering.applyAllSettings();Slot.UI.bind();Slot.Animation.startLoop();Slot.UI.updateHud();Slot.Game.fitToViewport();const refit=()=>Slot.Game.scheduleViewportFit();window.addEventListener('resize',refit,{passive:true});window.visualViewport?.addEventListener('resize',refit,{passive:true});window.visualViewport?.addEventListener('scroll',refit,{passive:true});window.addEventListener('orientationchange',refit,{passive:true});document.addEventListener('fullscreenchange',refit,{passive:true});document.addEventListener('webkitfullscreenchange',refit,{passive:true});document.addEventListener('visibilitychange',()=>{Slot.Animation.lastTime=0;if(!document.hidden){Slot.Game.scheduleViewportFit();requestAnimationFrame(()=>Slot.Rendering.renderReelPositions());}},{passive:true});window.__BANK_GAME_READY__=true;window.__BANK_MARK_GAME_READY__?.();window.dispatchEvent(new Event('slot:game-ready'));console.info('Bank Collect player build ready. 50 paylines:',Slot.Paylines.lines);},
    scheduleViewportFit(){clearTimeout(Slot.Game._fitTimer);Slot.Game.fitToViewport();requestAnimationFrame(()=>Slot.Game.fitToViewport());Slot.Game._fitTimer=setTimeout(()=>Slot.Game.fitToViewport(),180);if(Slot.Utils.isIOSWebKit)setTimeout(()=>Slot.Game.fitToViewport(),500);},
    fitToViewport(){const root=document.documentElement,v=window.visualViewport;let vw=v?.width||window.innerWidth||root.clientWidth;let vh=v?.height||window.innerHeight||root.clientHeight;let left=v?.offsetLeft||0,top=v?.offsetTop||0;if(!Number.isFinite(vw)||vw<1)vw=root.clientWidth;if(!Number.isFinite(vh)||vh<1)vh=root.clientHeight;if(!Number.isFinite(left))left=0;if(!Number.isFinite(top))top=0;root.style.setProperty('--app-vv-left',left+'px');root.style.setProperty('--app-vv-top',top+'px');root.style.setProperty('--app-vv-width',vw+'px');root.style.setProperty('--app-vv-height',vh+'px');const w=Slot.Config.design.width,h=Slot.Config.design.height;const ios=!!Slot.Utils.isIOSWebKit;const landscape=vw>vh;const edge=ios&&landscape?2:4;const scale=Math.min((vw-edge*2)/w,(vh-edge*2)/h,1);Slot.State.fitScale=Math.max(.18,scale);root.style.setProperty('--game-fit',String(Slot.State.fitScale));},
    changeBet(direction){if(Slot.State.isSpinning)return;const levels=Slot.Config.game.betLevels;Slot.Config.game.currentBetIndex=Slot.Utils.clamp(Slot.Config.game.currentBetIndex+direction,0,levels.length-1);Slot.State.bet=Number(levels[Slot.Config.game.currentBetIndex]);Slot.State.lastWin=0;Slot.UI.updateHud();Slot.UI.setMessage(`BET ${Slot.State.bet.toLocaleString()}`);},
    async spinVisual(outcome){const shower=Number(outcome.luckExtraMs)>0?Slot.Rendering.showLuckShower():Promise.resolve();await Slot.Animation.spin(outcome,{onAnticipation:()=>Slot.UI.setMessage('COLLECT ANTICIPATION!'),onReelStopAudio:()=>Slot.Audio.reelStop()});await shower;},

    async finishSpin({allowFreeSpinTrigger=true,allowPigBurst=true}={}){
      const grid=Slot.Rendering.getVisibleGrid(),bet=Slot.State.bet;let total=0,pigBurstTriggered=false,popupDone=Promise.resolve();
      const line=Slot.GameMath.evaluatePaylines(grid,bet);if(line.total>0){total+=line.total;Slot.Audio.regularWin();Slot.Rendering.drawPaylines(line.wins);}
      const collectRows=[];grid[3].forEach((cell,row)=>{if(cell?.symbolId==='collect')collectRows.push(row);});
      if(collectRows.length){const collected=Slot.GameMath.collectAmount(grid,bet);if(collected.total>0){Slot.UI.setMessage('COLLECT!');await Slot.Animation.animateCollect(grid,collectRows[0]);total+=collected.total;}}
      else if(!(Slot.State.freeSpinsRemaining>0)&&grid.slice(0,3).some(col=>col.some(cell=>cell?.symbolId==='dollar'))){Slot.UI.setMessage('PIG BANK!');const pigResult=await Slot.Animation.animateCoinsToPig(grid,{allowBurst:allowPigBurst});pigBurstTriggered=!!pigResult?.burstTriggered;}
      if(total>0){Slot.State.credits+=total;Slot.State.lastWin=total;Slot.UI.updateHud();popupDone=total>=bet*Math.max(1,Number(Slot.Config.bigWin?.thresholdBetMultiplier)||20)?Slot.UI.showBigWin(total):Slot.UI.showWinPopup(total);if(line.wins.length)popupDone.then(()=>{if(!Slot.State.isSpinning)Slot.Rendering.replayPaylines();});Slot.UI.setMessage(`WIN ${total.toLocaleString()}`);}else{Slot.State.lastWin=0;Slot.UI.updateHud();Slot.UI.setMessage('');if(line.wins.length)Slot.Rendering.replayPaylines();}
      const scatterCount=Slot.ReelOutcomes.freeSpinScatterCount(grid);return{total,lineWins:line.wins,popupDone,triggerPigBurst:pigBurstTriggered,triggerFreeSpins:allowFreeSpinTrigger&&scatterCount>=Number(Slot.Config.outcomes.freeSpinsTriggerCount||3)};
    },

    async runFreeSpins(){
      const count=Math.max(1,Math.round(Number(Slot.Config.outcomes.freeSpinsAward)||6));Slot.State.freeSpinsRemaining=count;Slot.Rendering.updateFreeSpinsCounter(count);
      let featureTotal=0;
      for(let spinNo=1;spinNo<=count;spinNo++){
        Slot.State.freeSpinsRemaining=count-spinNo;Slot.Rendering.updateFreeSpinsCounter(Slot.State.freeSpinsRemaining);Slot.UI.setMessage(`FREE SPIN ${spinNo} OF ${count}`);
        const outcome=Slot.ReelOutcomes.createBonusCollectOutcome();outcome.suppressAnticipation=true;
        await Slot.Game.spinVisual(outcome);const result=await Slot.Game.finishSpin({allowFreeSpinTrigger:false,allowPigBurst:false});featureTotal+=result.total;await result.popupDone;if(result.lineWins?.length)await Slot.Rendering.replayFreeSpinPaylines(result.lineWins);
        if(spinNo<count)await Slot.Utils.delay(Math.max(0,Number(Slot.Config.freeSpinsWinPresentation.nextSpinDelayMs)||0));
      }
      Slot.Rendering.updateFreeSpinsCounter(0);Slot.State.lastWin=featureTotal;Slot.UI.updateHud();Slot.UI.setMessage('');await Slot.UI.showBonusTotal(featureTotal);
    },

    async requestSpin(){
      if(Slot.State.isSpinning)return;if(Slot.State.credits<100){Slot.State.autoSpin=false;document.getElementById('spin-button')?.classList.remove('auto-spin-active');Slot.UI.showAccount('LESS THAN 100 CREDITS — SELECT A REBUY AMOUNT');return;}if(Slot.State.credits<Slot.State.bet){Slot.State.autoSpin=false;document.getElementById('spin-button')?.classList.remove('auto-spin-active');Slot.UI.showPopup('NOT ENOUGH CREDITS','','LOWER YOUR BET');return;}Slot.UI.dismissPopup();Slot.Rendering.cancelPaylineReplay();Slot.State.isSpinning=true;Slot.UI.setButtonsLocked(true);Slot.State.lastWin=0;Slot.State.credits-=Slot.State.bet;Slot.UI.updateHud();Slot.UI.setMessage('GOOD LUCK!');
      let outcome,luck=false;if(Slot.State.forceFreeSpinsNext){outcome=Slot.ReelOutcomes.createForcedFreeSpinsOutcome();Slot.State.forceFreeSpinsNext=false;}else if(Slot.State.forceCollectNext){outcome=Slot.ReelOutcomes.createForcedCollectOutcome();Slot.State.forceCollectNext=false;}else{const c=Slot.Config.luckHasArrived||{};luck=!!c.enabled&&Math.random()<Slot.Utils.clamp(Number(c.chance)||0,0,1);if(luck){outcome=Math.random()<Slot.Utils.clamp(Number(c.collectAwardChance)||0,0,1)?Slot.ReelOutcomes.createLuckCollectOutcome(c.minimumCollectBetMultiplier,c.maximumCollectBetMultiplier):Slot.ReelOutcomes.createForcedFreeSpinsOutcome();outcome.luckExtraMs=Math.max(Math.max(0,Number(c.extraSpinDurationMs)||0),Math.max(0,Number(c.revealDelayMs)||0)+Math.max(0,Number(c.showerDurationMs)||0));}else outcome=Slot.ReelOutcomes.createSpinOutcome();}
      await Slot.Game.spinVisual(outcome);const result=await Slot.Game.finishSpin({allowFreeSpinTrigger:true});
      if(result.triggerPigBurst){Slot.UI.dismissPopup();Slot.Rendering.cancelPaylineReplay();await Slot.Audio.bonusWin();await Slot.UI.showPigBurstStart();Slot.Animation.restorePig();await Slot.Game.runFreeSpins();}
      else if(result.triggerFreeSpins){await Slot.Audio.bonusWin();await Slot.UI.showFreeSpinsStart();await Slot.Game.runFreeSpins();}
      Slot.State.isSpinning=false;Slot.UI.setButtonsLocked(false);if(Slot.State.autoSpin)setTimeout(()=>{if(Slot.State.autoSpin)Slot.Game.requestSpin();},Math.max(0,Number(Slot.Config.autoSpin?.betweenSpinsMs)||0));
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>Slot.Game.init(),{once:true});else Slot.Game.init();
})();
