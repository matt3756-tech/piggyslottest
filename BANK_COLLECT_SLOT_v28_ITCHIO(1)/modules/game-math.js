(function () {
  'use strict';
  const Slot=window.Slot;
  const M=Slot.GameMath={placeholderPays:{}};

  M.generatePlaceholderPays=function(){
    M.placeholderPays=Slot.Utils.clone(Slot.Config.linePays||{});
    return M.placeholderPays;
  };

  function matchTarget(cells){
    const payable=new Set(['wild','bank','money','hammer','A','K','Q','J']);
    const first3=cells.slice(0,3).map(c=>c?.symbolId);
    const nonWild=first3.find(id=>id!=='wild');
    const target=nonWild||'wild';
    if(!payable.has(target)) return null;
    if(!first3.every(id=>id===target||id==='wild')) return null;
    return target;
  }

  M.evaluatePaylines=function(grid,bet){
    if(!Slot.Config.game.placeholderLinePaysEnabled)return{total:0,wins:[]};
    const uniqueWins=new Map();
    for(const line of Slot.Paylines.lines){
      const cells=line.rows.map((row,reel)=>grid[reel]?.[row]);
      const target=matchTarget(cells); if(!target)continue;
      const fourth=cells[3]?.symbolId;
      const count=(fourth===target||fourth==='wild')?4:3;
      const mult=Number(M.placeholderPays[target]?.[count===4?'four':'three']||0);
      if(mult<=0)continue;
      const amount=Math.round(Number(bet)*mult);
      const win={lineId:line.id,rows:line.rows.slice(),symbolId:target,count,multiplier:mult,amount},key=`${target}:${line.rows.slice(0,3).join(',')}`;
      const prior=uniqueWins.get(key);if(!prior||win.count>prior.count||(win.count===prior.count&&win.amount>prior.amount))uniqueWins.set(key,win);
    }
    const wins=[...uniqueWins.values()],total=wins.reduce((sum,win)=>sum+win.amount,0);
    return{total,wins};
  };
  M.evaluatePlaceholderLines=M.evaluatePaylines;

  M.collectAmount=function(grid,bet){
    let multiplierTotal=0; const coins=[];
    for(let reel=0;reel<3;reel++)grid[reel].forEach((cell,row)=>{if(cell?.symbolId==='dollar'){const multiplier=Math.max(0,Number(cell.creditMultiplier)||0);multiplierTotal+=multiplier;coins.push({reel,row,multiplier,amount:multiplier*bet});}});
    return{multiplierTotal,total:multiplierTotal*bet,coins};
  };
})();
