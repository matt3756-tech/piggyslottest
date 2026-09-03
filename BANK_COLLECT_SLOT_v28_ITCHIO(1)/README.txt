BANK COLLECT - HTML5 SLOT PLAYER BUILD V25

RUN:
1. Double-click index.html
   OR
2. Double-click PLAY_GAME.bat on Windows.

No Python, Node, server, framework, or install is required.
The page cache-busts CSS, JavaScript, and artwork on every load.

CORE CONTROLS:
- Click SPIN, or press Space / Enter / Numpad Enter.
- BET - / BET + use the supplied artwork panel hotspots.
- PAYS opens the temporary randomly-generated paytable.
- EDITOR opens the local visual editor.

V2 BEHAVIOR:
- Final reel symbols are preloaded off-screen before the stop sequence, preventing last-frame symbol swaps.
- The two horizontal row-divider lines inside the reels are removed.
- COLLECT stays fixed when it lands and receives only a short outer glow.
- Each visible $ CREDIT lifts out of its reel position one at a time, leaving an empty spot, then flies into COLLECT at full size/full opacity.
- Each $ impact bumps COLLECT and produces a short burst of small gold coins.
- FREE SPINS symbols pop/enlarge slightly when they land, then ease back to their configured size.
- Win popups contain only the credit amount.
- PAYS shows the WILD/BANK/MONEY/A/K/Q/J thumbnails and their temporary random multipliers.

EDITOR:
- DRAG LAYOUT lets you drag the outlined HUD, reel frame, message strip and controls, including PAYS.
- The settings editor is auto-generated from config.js.
- BUTTON PRESS contains adjustable press duration, X/Y position, scale, brightness, saturation, overlay, shadow, blur and highlight controls.
- SPIN contains stop-lead cells, reel speed, stop intervals, bounce distance and bounce duration.
- COLLECT ANIMATION contains lift, flight, impact/bump and splash controls.
- LANDING EFFECTS contains COLLECT glow and FREE SPINS pop controls.
- SAVE stores settings in browser localStorage.
- EXPORT writes a JSON settings file.
- IMPORT loads a JSON settings file.
- RESET restores this build's defaults.
- TEST POPUP previews the amount-only win popup.
- FORCE COLLECT makes the next spin land three $ credits plus a COLLECT for tuning.

IMPORTANT:
- The supplied PNG artwork in /assets is not edited; it is only positioned/transformed at runtime.
- FREE SPINS gameplay and CASH OUT / LEADERBOARD logic are placeholders until their rules are provided.
- Placeholder line pays are generated randomly at startup in modules/game-math.js. No RTP calculation is performed.

V3 NOTES
- 50 paylines pay matching 3 or 4 symbols left-to-right; winning lines are drawn over the reels.
- FREE SPINS is scatter-only, can appear only on reels 1-3, max one per reel, and 3 scatters award 6 free spins.
- One of the 6 free spins is guaranteed to contain a coin COLLECT.
- Editor includes FORCE FREE SPINS, landing-effect lead time, $ value size, paylines, and per-button press-effect controls.
