/* Monte Carlo verifier for the shipped outcome and pay logic. Run: node RTP_SIMULATOR.js 1000000 */
global.window={};
require('./modules/config.js');require('./modules/utils.js');require('./modules/paylines.js');require('./modules/reel-outcomes.js');require('./modules/game-math.js');
const S=window.Slot,c=S.Config,n=Math.max(1000,Number(process.argv[2])||500000),bet=100;
S.GameMath.placeholderPays=JSON.parse(JSON.stringify(c.linePays));
let returned=0,lineReturn=0,collectReturn=0,bonusReturn=0,luckReturn=0,bonusCount=0,luckCount=0,pigBonusCount=0,pigScale=1;
function settle(grid){const line=S.GameMath.evaluatePaylines(grid,bet),collect=grid[3].some(x=>x?.symbolId==='collect')?S.GameMath.collectAmount(grid,bet).total:0;return{line:line.total,collect,total:line.total+collect};}
function playBonus(){let total=0;for(let i=0;i<c.outcomes.freeSpinsAward;i++){const weights=c.outcomes.freeSpinsCoinCountWeights||[98,1.5,.5],coinCount=S.Utils.weightedPick([1,2,3],count=>Number(weights[count-1])||0),g=S.ReelOutcomes.createForcedCollectOutcome({suppressFreeSpins:true,coinCount}),r=settle(g);total+=r.total;}return total;}
for(let i=0;i<n;i++){
  let grid,isLuck=c.luckHasArrived.enabled&&Math.random()<c.luckHasArrived.chance;
  if(isLuck){luckCount++;grid=Math.random()<c.luckHasArrived.collectAwardChance?S.ReelOutcomes.createLuckCollectOutcome(c.luckHasArrived.minimumCollectBetMultiplier,c.luckHasArrived.maximumCollectBetMultiplier):S.ReelOutcomes.createForcedFreeSpinsOutcome();}
  else grid=S.ReelOutcomes.createSpinOutcome();
  const r=settle(grid);returned+=r.total;lineReturn+=r.line;collectReturn+=r.collect;if(isLuck)luckReturn+=r.total;
  if(S.ReelOutcomes.freeSpinScatterCount(grid)>=c.outcomes.freeSpinsTriggerCount){bonusCount++;const b=playBonus();returned+=b;bonusReturn+=b;if(isLuck)luckReturn+=b;}
  else if(!grid[3].some(x=>x?.symbolId==='collect')&&grid.slice(0,3).some(col=>col.some(x=>x?.symbolId==='dollar'))){let grew=false;if(pigScale<c.pig.maxScale&&Math.random()<c.pig.growthChance){pigScale=Math.min(c.pig.maxScale,pigScale*(1+c.pig.growthStep));grew=true;}if((grew||pigScale>=c.pig.maxScale)&&Math.random()<c.pig.burstChanceAfterGrowth){pigBonusCount++;const b=playBonus();returned+=b;bonusReturn+=b;pigScale=1;}}
}
console.log(JSON.stringify({spins:n,rtpPercent:returned/(n*bet)*100,linePercent:lineReturn/(n*bet)*100,collectPercent:collectReturn/(n*bet)*100,allBonusPercent:bonusReturn/(n*bet)*100,luckContributionPercent:luckReturn/(n*bet)*100,scatterBonusFrequency:bonusCount/n,pigBurstFrequency:pigBonusCount/n,luckFrequency:luckCount/n},null,2));
