(function () {
  'use strict';
  const Slot = window.Slot;
  const O = Slot.ReelOutcomes = {};

  function allowedIds(reelIndex, suppressFreeSpins=false) {
    return Object.entries(Slot.Config.symbols)
      .filter(([id,s]) => Array.isArray(s.allowedReels) && s.allowedReels.includes(reelIndex) && !(id==='freeSpins' && reelIndex>2) && !(suppressFreeSpins && id==='freeSpins'))
      .map(([id]) => id);
  }

  O.makeCell = function (symbolId) {
    const c={symbolId,creditMultiplier:null};
    if(symbolId==='dollar'){
      const step=.5,min=Math.max(step,Number(Slot.Config.outcomes.dollarMinMultiplier)||step),max=Math.max(min,Number(Slot.Config.outcomes.dollarMaxMultiplier)||25),values=[];
      for(let value=Math.ceil(min/step)*step;value<=max+.001;value+=step)values.push(Math.round(value*10)/10);
      const low=Math.max(.01,Number(Slot.Config.outcomes.dollarLowTierWeight)||5),mid=Math.max(.01,Number(Slot.Config.outcomes.dollarMidTierWeight)||2.2),high=Math.max(.01,Number(Slot.Config.outcomes.dollarHighTierWeight)||1.2);
      c.creditMultiplier=Slot.Utils.weightedPick(values,value=>value<=10?low:value<=20?mid:high);
    }
    return c;
  };

  O.randomCellForReel = function (reelIndex, blockedIds=[], suppressFreeSpins=false) {
    let ids=allowedIds(reelIndex,suppressFreeSpins).filter(id=>!blockedIds.includes(id));
    if(!ids.length) ids=allowedIds(reelIndex,suppressFreeSpins);
    const id=Slot.Utils.weightedPick(ids,key=>Slot.Config.symbols[key]?.weight||0);
    return O.makeCell(id);
  };

  O.createSpinOutcome = function (options={}) {
    const suppressFreeSpins=!!options.suppressFreeSpins;
    const cols=[];
    for(let reel=0;reel<Slot.Config.reels.count;reel++){
      const col=[];
      let collectUsed=false,freeUsed=false,dollars=0;
      const stackEligible=reel<3 && Math.random()<Math.max(0,Number(Slot.Config.outcomes.dollarStackChance)||0);
      if(stackEligible){
        for(let row=0;row<Slot.Config.reels.rows;row++) col.push(O.makeCell('dollar'));
        cols.push(col); continue;
      }
      for(let row=0;row<Slot.Config.reels.rows;row++){
        const blocked=[];
        if(reel===3 && Slot.Config.outcomes.enforceSingleCollectOnReel4 && collectUsed) blocked.push('collect');
        // FREE SPINS: first 3 reels only and never more than one visible per reel.
        if(freeUsed) blocked.push('freeSpins','dollar');
        if(dollars>0) blocked.push('freeSpins');
        if(dollars>=Number(Slot.Config.outcomes.maxDollarSymbolsWithoutStack||2)) blocked.push('dollar');
        const cell=O.randomCellForReel(reel,blocked,suppressFreeSpins);
        if(cell.symbolId==='collect') collectUsed=true;
        if(cell.symbolId==='freeSpins') freeUsed=true;
        if(cell.symbolId==='dollar') dollars++;
        col.push(cell);
      }
      cols.push(col);
    }
    const scatterReels=cols.slice(0,3).filter(col=>col.some(c=>c?.symbolId==='freeSpins')).length;
    if(scatterReels>=Number(Slot.Config.outcomes.freeSpinsTriggerCount||3))cols.slice(0,3).forEach((col,reel)=>col.forEach((cell,row)=>{if(cell?.symbolId==='dollar')cols[reel][row]=O.randomCellForReel(reel,['dollar','freeSpins'],true);}));
    return cols;
  };

  O.createForcedCollectOutcome = function (options={}) {
    const cols=[];
    for(let reel=0;reel<4;reel++){
      const blocked=reel<3?['dollar','freeSpins']:['collect'];
      cols.push(Array.from({length:Slot.Config.reels.rows},()=>O.randomCellForReel(reel,blocked,!!options.suppressFreeSpins)));
    }
    const positions=[];for(let reel=0;reel<3;reel++)for(let row=0;row<Slot.Config.reels.rows;row++)positions.push([reel,row]);for(let i=positions.length-1;i>0;i--){const j=Slot.Utils.randomInt(0,i),tmp=positions[i];positions[i]=positions[j];positions[j]=tmp;}const coinCount=Slot.Utils.clamp(Math.round(Number(options.coinCount??3)),1,positions.length);for(let i=0;i<coinCount;i++){const [reel,row]=positions[i];cols[reel][row]=O.makeCell('dollar');}cols[3][Slot.Utils.randomInt(0,Slot.Config.reels.rows-1)]=O.makeCell('collect');
    return cols;
  };

  // Bonus collect spins use the normal symbol/coin weighting, then guarantee the
  // feature requirement: at least one $ coin on reels 1-3 and a COLLECT on reel 4.
  // This allows multiple $ symbols (including natural stacks) without changing any weights.
  O.createBonusCollectOutcome = function () {
    const cols=O.createSpinOutcome({suppressFreeSpins:true});
    const coinPositions=[];
    for(let reel=0;reel<3;reel++)for(let row=0;row<Slot.Config.reels.rows;row++){
      if(cols[reel][row]?.symbolId==='dollar')coinPositions.push([reel,row]);
    }
    if(!coinPositions.length){
      const reel=Slot.Utils.randomInt(0,2),row=Slot.Utils.randomInt(0,Slot.Config.reels.rows-1);
      cols[reel][row]=O.makeCell('dollar');
    }
    const collectRows=[];
    for(let row=0;row<Slot.Config.reels.rows;row++)if(cols[3][row]?.symbolId==='collect')collectRows.push(row);
    if(!collectRows.length){
      const row=Slot.Utils.randomInt(0,Slot.Config.reels.rows-1);
      cols[3][row]=O.makeCell('collect');
    }
    return cols;
  };

  O.createLuckCollectOutcome=function(minimumMultiplier=20,maximumMultiplier=60){
    const cols=O.createForcedCollectOutcome({coinCount:3}),minimum=Math.max(1,Math.ceil(Number(minimumMultiplier)||20)),maximum=Math.max(minimum+1,Math.floor(Number(maximumMultiplier)||60)),target=Slot.Utils.randomInt(minimum+1,maximum);
    const values=[Math.max(1,Math.floor(target*.25)),Math.max(1,Math.floor(target*.30))];values.push(Math.max(1,target-values[0]-values[1]));
    const coins=[];cols.slice(0,3).forEach(col=>col.forEach(cell=>{if(cell?.symbolId==='dollar')coins.push(cell);}));coins.forEach((cell,i)=>cell.creditMultiplier=values[i]||1);
    return cols;
  };

  O.createForcedFreeSpinsOutcome = function () {
    const cols=[];
    for(let reel=0;reel<4;reel++){
      const blocked=['freeSpins','dollar']; if(reel===3) blocked.push('collect');
      cols.push(Array.from({length:Slot.Config.reels.rows},()=>O.randomCellForReel(reel,blocked,true)));
    }
    const rows=[Slot.Utils.randomInt(0,2),Slot.Utils.randomInt(0,2),Slot.Utils.randomInt(0,2)];
    for(let reel=0;reel<3;reel++) cols[reel][rows[reel]]=O.makeCell('freeSpins');
    return cols;
  };

  O.countSymbol=function(grid,id){return grid.reduce((sum,col)=>sum+col.filter(c=>c?.symbolId===id).length,0)};
  O.freeSpinScatterCount=function(grid){let n=0;for(let reel=0;reel<3;reel++)if(grid[reel].some(c=>c?.symbolId==='freeSpins'))n++;return n};
})();
