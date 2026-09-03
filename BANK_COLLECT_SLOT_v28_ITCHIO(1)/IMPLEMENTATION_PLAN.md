# Bank Collect Local Slot — Implementation Plan

## What was inspected first

The supplied `REEL BEHAVIOR EXAMPLE.zip` was inspected before this build was created. Its reel behavior uses a continuously updating reel position, downward symbol travel, an extra off-screen/buffer symbol row, staggered reel stops, snap-to-cell alignment, then an ease-out bounce into the final resting position.

The key defaults carried into this prototype are:

- continuous downward reel motion at `2.5 px/ms`
- first reel stop at about `1000 ms`
- each following reel stops `500 ms` later
- symbols snap to an exact cell boundary
- `44 px` final bounce/settle movement
- cubic ease-out settling over about `257 ms`
- reel content is clipped behind the frame

All uploaded artwork is copied byte-for-byte into `assets/`; the game only scales/positions it with CSS/JavaScript.

## Architecture

- `modules/config.js` — all editable game, reel, symbol, layout, popup, collect-animation and audio settings
- `modules/game-math.js` — placeholder random pays and temporary line/collect math
- `modules/reel-outcomes.js` — weighted symbol selection, reel restrictions, $ credit values and final 4×3 outcomes
- `modules/rendering.js` — reel DOM, symbol centering, artwork, HUD/layout and popup styling
- `modules/animation.js` — continuous downward reel motion, staggered stops/bounce and $-to-COLLECT flight animation
- `modules/audio.js` — isolated local WebAudio feedback layer
- `modules/ui.js` — spin/bet/cashout/leaderboard button interactions and popups
- `modules/editor.js` — local visual editor, drag mode, generic auto-generated controls, save/export/import/reset
- `app.js` — game orchestration only

## Initial game behavior

- 4 reels × 3 visible symbols.
- Reel background is exactly `#0078d4` by default.
- 10,000 starting credits.
- Bet steps: 100, 150, 200, 250, 300, 350, 400, 450, 500.
- Symbol order for temporary pays: WILD, BANK, MONEY, A, K, Q, J.
- Temporary random 4-of-a-kind horizontal pays are generated on load. They are intentionally isolated in `game-math.js` so real math can replace them later.
- `$ CREDIT` symbols only appear on reels 1–3 and receive a random 1x–50x value.
- `COLLECT` only appears on reel 4. If it lands with visible `$ CREDIT` symbols on reels 1–3, those coins lift and fly into the collect symbol, and the values are awarded at the current bet.
- FREE SPINS currently has only a trigger placeholder because the final free-spin game rules were not supplied yet.

## Editor strategy

The editor recursively reads `Slot.Config`. New primitive settings added to the config in future builds automatically appear in the editor unless intentionally excluded (artwork paths and fixed metadata). Optional range/select behavior is supplied through `Slot.EditorMeta`.

The editor can:

- move major layout items by X/Y values or direct drag mode
- scale all major controls
- change reel width/height/background/divider colors
- change reel speed, first stop delay, stagger, bounce amount and bounce duration
- change each symbol's scale, X/Y offsets, cell padding, opacity and hit weight independently
- change popup scale/colors/radius/duration/animation and toggle popups
- change collect flight timing/lift/stagger/scale
- save settings in localStorage
- export/import settings JSON
- reset to build defaults
- preview popup styling instantly
- force a COLLECT setup on the next spin for animation tuning

## Cache prevention

`index.html` creates a unique timestamp every load and appends it to every CSS, JavaScript and artwork URL. It also unregisters service workers and clears Cache Storage when available. This is designed so reopening/reloading the local build displays the latest files instead of stale cached assets.
