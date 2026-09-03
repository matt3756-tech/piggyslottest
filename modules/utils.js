(function () {
  'use strict';
  const Slot = window.Slot;
  const U = Slot.Utils = {};

  U.cacheUrl = path => path;

  const ua=navigator.userAgent||'';
  U.isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  U.isWebKit=/AppleWebKit/i.test(ua);
  U.isIOSWebKit=U.isIOS&&U.isWebKit;

  U.mod = (n, m) => ((n % m) + m) % m;
  U.delay = ms => new Promise(resolve => setTimeout(resolve, Math.max(0, Number(ms) || 0)));
  U.clone = obj => JSON.parse(JSON.stringify(obj));
  U.clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  U.randomInt = (min, max) => {
    min = Math.ceil(Number(min)); max = Math.floor(Number(max));
    if (max < min) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  U.getPath = function (obj, path) {
    return path.split('.').reduce((o, k) => o == null ? undefined : o[k], obj);
  };
  U.setPath = function (obj, path, value) {
    const parts = path.split('.');
    let cur = obj;
    parts.slice(0,-1).forEach(k => { if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}; cur = cur[k]; });
    cur[parts.at(-1)] = value;
  };

  U.deepMerge = function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    for (const [k,v] of Object.entries(source)) {
      if (Array.isArray(v)) target[k] = v.slice();
      else if (v && typeof v === 'object') {
        if (!target[k] || typeof target[k] !== 'object' || Array.isArray(target[k])) target[k] = {};
        deepMerge(target[k], v);
      } else target[k] = v;
    }
    return target;
  };

  U.weightedPick = function (items, weightFn) {
    const weighted = items.map(item => ({ item, weight: Math.max(0, Number(weightFn(item)) || 0) }));
    const total = weighted.reduce((s, x) => s + x.weight, 0);
    if (total <= 0) return items[0];
    let r = Math.random() * total;
    for (const entry of weighted) { r -= entry.weight; if (r <= 0) return entry.item; }
    return weighted.at(-1).item;
  };
})();
