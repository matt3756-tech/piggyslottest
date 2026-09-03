(function () {
  'use strict';
  const Slot = window.Slot;
  const P = Slot.Paylines = {};

  // 50 deterministic 4-reel paths selected from all 3^4 possibilities. Paths
  // with smoother movement are placed first, followed by progressively more
  // angular zig-zags. Each row value is 0=top, 1=middle, 2=bottom.
  const all=[];
  for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let c=0;c<3;c++)for(let d=0;d<3;d++){
    const rows=[a,b,c,d];
    const rough=Math.abs(a-b)+Math.abs(b-c)+Math.abs(c-d);
    const centerBias=Math.abs(a-1)+Math.abs(b-1)+Math.abs(c-1)+Math.abs(d-1);
    all.push({rows,rough,centerBias,key:rows.join('')});
  }
  all.sort((x,y)=>x.rough-y.rough || x.centerBias-y.centerBias || x.key.localeCompare(y.key));
  P.lines=all.slice(0,50).map((x,i)=>({id:i+1,rows:x.rows}));
})();
