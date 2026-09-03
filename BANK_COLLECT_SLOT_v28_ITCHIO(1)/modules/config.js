(function () {
  'use strict';
  const Slot = window.Slot = window.Slot || {};
  const defaults = {
    "design":  {
                   "width":  1580,
                   "height":  720
               },
    "game":  {
                 "startingCredits":  10000,
                 "betLevels":  [
                                   100,
                                   150,
                                   200,
                                   250,
                                   300,
                                   350,
                                   400,
                                   450,
                                   500,
                                   600,
                                   700,
                                   800,
                                   900,
                                   1000,
                                   2000,
                                   3000,
                                   4000,
                                   5000
                               ],
                 "currentBetIndex":  8,
                 "placeholderLinePaysEnabled":  true
             },
    "economy": {
                 "leaderboardEndpoint": "https://script.google.com/macros/s/AKfycbyYTd2t7HkQw1jyd0HeMZz2rzmPNCXpd0x0OZwJczv1OcHPn_pkDnL4qXSm1H_lmhA/exec",
                 "leaderboardLimit": 10,
                 "borrowMin": 1000,
                 "borrowMax": 10000,
                 "borrowStep": 1000,
                 "cashoutMinimumNoDebt": 10000,
                 "cashoutMinimumWithDebt": 5000,
                 "debtResetDays": 30
               },
    "cashoutMenu": {
                 "labelFontSizePx": 20,
                 "valueFontSizePx": 30,
                 "fontFamily": "Arial Black, Arial, sans-serif",
                 "fontWeight": 900,
                 "labelColor": "#000000",
                 "valueColor": "#000000",
                 "letterSpacingPx": 0,
                 "lineHeight": 1.15,
                 "textShadowEnabled": false,
                 "paddingPx": 14,
                 "borderWidthPx": 2,
                 "borderRadiusPx": 10
               },
    "reels":  {
                  "count":  4,
                  "rows":  3,
                  "reelWidth":  196,
                  "cellHeight":  158,
                  "symbolBufferCells":  7,
                  "backgroundColor":  "#0078d4",
                  "dividerColor":  "#dbe9f4"
              },
    "spin":  {
                 "speedPxPerMs":  3.8,
                 "firstReelStopDelayMs":  1000,
                 "reelStopIntervalMs":  500,
                 "postStopEvaluationDelayMs":  10,
                 "bounceAmountPx":  44,
                 "bounceDurationMs":  257,
                 "stopLeadCells":  3,
                 "buttonActionDelayMs":  70
             },
    "autoSpin": { "holdDurationMs": 500, "betweenSpinsMs": 250 },
    "bigWin": { "thresholdBetMultiplier": 20, "durationMs": 6000, "minimumSkipMs": 2000, "image": "assets/pig-big-win-popup.png", "valueFontSizePx": 76, "scale": 1 },
    "buttonPress":  {
                        "durationMs":  105,
                        "translateXPx":  0,
                        "translateYPx":  4,
                        "scale":  0.98,
                        "brightness":  0.8,
                        "saturation":  0.94,
                        "overlayOpacity":  0.24,
                        "shadowOpacity":  0.48,
                        "shadowBlurPx":  12,
                        "highlightOpacity":  0.16
                    },
    "outcomes":  {
                     "dollarMinMultiplier":  0.5,
                     "dollarMaxMultiplier":  10,
                     "dollarValueWeightExponent":  3.9,
                     "dollarLowTierWeight":  20,
                     "dollarMidTierWeight":  0.4,
                     "dollarHighTierWeight":  0.2,
                     "freeSpinsTriggerCount":  3,
                     "enforceSingleCollectOnReel4":  true,
                     "freeSpinsAward":  4,
                     "freeSpinsCoinCountWeights": [98, 1.5, 0.5],
                     "dollarStackChance":  0.02,
                     "maxDollarSymbolsWithoutStack":  2,
                     "guaranteedCollectInFreeSpins":  true
                 },
    "linePays":  {
                      "wild":  {"three":  2.3, "four":  4.5},
                      "bank":  {"three":  1.1, "four":  2.2},
                      "money":  {"three":  0.7, "four":  1.1},
                      "hammer":  {"three":  0.4, "four":  0.7},
                      "A":  {"three":  0.3, "four":  0.5},
                      "K":  {"three":  0.2, "four":  0.3},
                      "Q":  {"three":  0.1, "four":  0.2},
                      "J":  {"three":  0.1, "four":  0.2}
                  },
    "popup":  {
                  "enabled":  true,
                  "durationMs":  1800,
                  "scale":  1,
                  "animation":  "pop",
                  "backgroundColor":  "#0068b8",
                  "backgroundColor2":  "#003e74",
                  "borderColor":  "#d9e5ee",
                  "accentColor":  "#ffffff",
                  "textColor":  "#fff0a8",
                  "titleColor":  "#ffffff",
                  "borderRadiusPx":  10,
                  "backdropOpacity":  0.08,
                  "xOffsetPx":  0,
                  "yOffsetPx":  0,
                  "widthPx":  430,
                  "minHeightPx":  120,
                  "paddingXPx":  34,
                  "paddingYPx":  24,
                  "borderWidthPx":  4,
                  "valueFontSizePx":  64,
                  "titleFontSizePx":  24,
                  "subtitleFontSizePx":  15,
                  "fontFamily":  "Arial, Helvetica, sans-serif",
                  "fontWeight":  1000,
                  "letterSpacingPx":  0,
                  "shadowBlurPx":  45
              },
    "paytablePopup":  {
                          "widthPx":  720,
                          "maxHeightPx":  650,
                          "titleFontSizePx":  32,
                          "rowMinHeightPx":  82,
                          "symbolSizePx":  70,
                          "nameFontSizePx":  18,
                          "payFontSizePx":  24,
                          "fontFamily":  "Arial, Helvetica, sans-serif",
                          "fontWeight":  900,
                          "borderRadiusPx":  20,
                          "borderWidthPx":  4,
                          "backgroundColor":  "#0078d4",
                          "backgroundColor2":  "#00477f",
                          "borderColor":  "#d9e5ee",
                          "textColor":  "#ffffff",
                          "payColor":  "#ffea75"
                      },
    "collectAnimation":  {
                             "liftPx":  62,
                             "liftDurationMs":  120,
                             "flyDurationMs":  300,
                             "staggerMs":  80,
                             "impactDurationMs":  200,
                             "collectBumpScale":  1.35,
                             "collectBumpDurationMs":  400,
                             "splashCoinCount":  30,
                             "splashSpreadPx":  146,
                             "splashDurationMs":  430,
                             "splashCoinSizePx":  36
                         },
    "landingEffects":  {
                           "collectGlowDurationMs":  850,
                           "collectGlowColor":  "#ffe884",
                           "collectGlowBlurPx":  18,
                           "freeSpinsPopScale":  1.4,
                           "freeSpinsPopDurationMs":  750,
                           "leadTimeMs":  100
                       },
    "audio":  {
                  "enabled":  true,
                  "masterVolume":  1,
                  "reelStopFile":  "assets/reel-stop.ogg",
                  "pigBreakFile":  "assets/pig-break-sfx.mp3",
                  "coinInPigFile":  "assets/coin-in-pig-sfx.mp3",
                  "buttonClickFile":  "assets/PIG_BUTTON_CLICK_SFX.mp3",
                  "freeSpinLandFile":  "assets/free-spin-land-sfx.mp3",
                  "bonusWinFile":  "assets/bonus-win.mp3",
                  "dollarLandFile":  "assets/dollar-land-new-sfx.mp3",
                  "coinsFallingFile":  "assets/coins-falling-sfx.mp3",
                  "regularWinFile":  "assets/regular-line-win-sfx.mp3",
                  "coinCollectFile":  "assets/coin-collect-sfx.mp3",
                  "collectLandFile":  "assets/collect-land-sfx.mp3",
                  "reelStopSfxVolume":  1,
                  "reelStopSfxLeadMs":  215,
                  "pigBreakSfxVolume":  1,
                  "pigBreakSfxDelayMs":  0,
                  "coinInPigSfxVolume":  0.74,
                  "coinInPigSfxDelayMs":  0,
                  "buttonClickVolume":  0.6,
                  "freeSpinLandVolume":  1,
                  "freeSpinLandPitchStep":  0.1,
                  "bonusWinVolume":  1,
                  "dollarLandVolume":  1,
                  "coinsFallingVolume":  1,
                  "regularWinVolume":  0.61,
                  "musicFile":  "assets/pig-BG-music.mp3",
                  "musicVolume":  0.09,
                  "coinCollectVolume":  1,
                  "collectLandVolume":  1,
                  "voicePoolSize":  8
              },
    "layout":  {
                   "hud":  {
                               "x":  440,
                               "y":  6,
                               "scale":  1
                           },
                   "reelFrame":  {
                                     "x":  390,
                                     "y":  61,
                                     "scale":  1
                                 },
                   "messageStrip":  {
                                        "x":  1051,
                                        "y":  601,
                                        "scale":  1.1
                                    },
                   "betPanel":  {
                                    "x":  578,
                                    "y":  559,
                                    "scale":  0.52
                                },
                   "cashoutButton":  {
                                         "x":  70,
                                         "y":  554,
                                         "scale":  0.62
                                     },
                   "paysButton":  {
                                      "x":  306,
                                      "y":  583,
                                      "scale":  1.58
                                  },
                   "spinButton":  {
                                      "x":  1215,
                                      "y":  230,
                                      "scale":  0.64
                                  },
                                "audioControls": { "x": 1217, "y": 71, "scale": 1.06 },
                                "pigGraphic":  {
                                      "x":  -150,
                                      "y":  -72,
                                      "scale":  0.23
                                  },
                   "freeSpinsCounter":  {
                                            "x":  622,
                                            "y":  536,
                                            "scale":  1
                                        }
               },
    "symbols":  {
                    "wild":  {
                                 "image":  "assets/wild.png",
                                 "name":  "WILD",
                                 "weight":  1.5,
                                 "allowedReels":  [
                                                      0,
                                                      1,
                                                      2,
                                                      3
                                                  ],
                                 "scale":  1.15,
                                 "xOffset":  0,
                                 "yOffset":  0,
                                 "cellPadding":  9,
                                 "opacity":  1
                             },
                    "bank":  {
                                 "image":  "assets/bank.png",
                                 "name":  "BANK",
                                 "weight":  4,
                                 "allowedReels":  [
                                                      0,
                                                      1,
                                                      2,
                                                      3
                                                  ],
                                 "scale":  1.01,
                                 "xOffset":  0,
                                 "yOffset":  0,
                                 "cellPadding":  8,
                                 "opacity":  1
                             },
                    "money":  {
                                  "image":  "assets/money.png",
                                  "name":  "MONEY",
                                  "weight":  6,
                                  "allowedReels":  [
                                                       0,
                                                       1,
                                                       2,
                                                       3
                                                   ],
                                  "scale":  1.03,
                                  "xOffset":  0,
                                  "yOffset":  0,
                                  "cellPadding":  8,
                                  "opacity":  1
                              },
                    "hammer":  {
                                   "image":  "assets/HAMMER.png",
                                   "name":  "HAMMER",
                                   "weight":  9,
                                   "allowedReels":  [
                                                        0,
                                                        1,
                                                        2,
                                                        3
                                                    ],
                                   "scale":  1,
                                   "xOffset":  0,
                                   "yOffset":  0,
                                   "cellPadding":  10,
                                   "opacity":  1
                               },
                    "A":  {
                              "image":  "assets/A.png",
                              "name":  "A",
                              "weight":  14,
                              "allowedReels":  [
                                                   0,
                                                   1,
                                                   2,
                                                   3
                                               ],
                              "scale":  0.84,
                              "xOffset":  0,
                              "yOffset":  0,
                              "cellPadding":  10,
                              "opacity":  1
                          },
                    "K":  {
                              "image":  "assets/K.png",
                              "name":  "K",
                              "weight":  18,
                              "allowedReels":  [
                                                   0,
                                                   1,
                                                   2,
                                                   3
                                               ],
                              "scale":  0.84,
                              "xOffset":  0,
                              "yOffset":  0,
                              "cellPadding":  10,
                              "opacity":  1
                          },
                    "Q":  {
                              "image":  "assets/Q.png",
                              "name":  "Q",
                              "weight":  22,
                              "allowedReels":  [
                                                   0,
                                                   1,
                                                   2,
                                                   3
                                               ],
                              "scale":  0.84,
                              "xOffset":  0,
                              "yOffset":  0,
                              "cellPadding":  10,
                              "opacity":  1
                          },
                    "J":  {
                              "image":  "assets/J.png",
                              "name":  "J",
                              "weight":  26,
                              "allowedReels":  [
                                                   0,
                                                   1,
                                                   2,
                                                   3
                                               ],
                              "scale":  0.84,
                              "xOffset":  0,
                              "yOffset":  0,
                              "cellPadding":  10,
                              "opacity":  1
                          },
                    "dollar":  {
                                   "image":  "assets/dollar.png",
                                   "name":  "$ CREDIT",
                                   "weight":  10,
                                   "allowedReels":  [
                                                        0,
                                                        1,
                                                        2
                                                    ],
                                   "scale":  1.08,
                                   "xOffset":  0,
                                   "yOffset":  0,
                                   "cellPadding":  10,
                                   "opacity":  1,
                                   "valueFontSizePx":  64
                               },
                    "collect":  {
                                    "image":  "assets/collect.png",
                                    "name":  "COLLECT",
                                    "weight":  4,
                                    "allowedReels":  [
                                                         3
                                                     ],
                                    "scale":  1.39,
                                    "xOffset":  0,
                                    "yOffset":  0,
                                    "cellPadding":  10,
                                    "opacity":  1
                                },
                    "freeSpins":  {
                                      "image":  "assets/free-spins.png",
                                      "name":  "FREE SPINS",
                                      "weight":  7,
                                      "allowedReels":  [
                                                           0,
                                                           1,
                                                           2
                                                       ],
                                      "scale":  1.49,
                                      "xOffset":  0,
                                      "yOffset":  0,
                                      "cellPadding":  10,
                                      "opacity":  1
                                  }
                },
    "artwork":  {
                    "betPanel":  "assets/buttons-bet.png",
                    "cashoutButton":  "assets/button-cashout.png",
                    "spinButton":  "assets/button-spin.png"
                },
    "paylines":  {
                     "count":  50,
                     "displayDurationMs":  1500,
                     "lineWidthPx":  5,
                     "glowWidthPx":  10,
                     "opacity":  0.95
                 },
    "freeSpinsFeature":  {
                             "popupScale":  1,
                             "widthPx":  460,
                             "minHeightPx":  360,
                             "paddingXPx":  30,
                             "paddingYPx":  22,
                             "borderWidthPx":  5,
                             "borderRadiusPx":  26,
                             "fontFamily":  "Arial, Helvetica, sans-serif",
                             "fontWeight":  1000,
                             "backdropOpacity":  0.38,
                             "backgroundColor":  "#0068b8",
                             "backgroundColor2":  "#003e74",
                             "borderColor":  "#d9e5ee",
                             "accentColor":  "#ffe884",
                             "symbolScale":  1,
                             "titleFontSizePx":  42,
                             "subtitleFontSizePx":  22
                         },
    "pigBurstPopup":  {
                          "titleText":  "THAT SOMBITCH BURSTED YO! 4 FREE SPINS AWARDED!",
                          "subtitleText":  "CLICK ANYWHERE TO BEGIN THE BONUS",
                          "titleFontSizePx":  31,
                          "subtitleFontSizePx":  23,
                          "titleColor":  "#fff6b4",
                          "subtitleColor":  "#eef8ff",
                          "fontFamily":  "Arial, Helvetica, sans-serif",
                          "fontWeight":  1000,
                          "letterSpacingPx":  2,
                          "lineHeight":  1.44
                      },
    "freeSpinsWinPresentation":  {
                                     "repeatCount":  5,
                                     "fadeInMs":  120,
                                     "holdMs":  240,
                                     "fadeOutMs":  140,
                                     "gapMs":  120,
                                     "continueOnClick":  true,
                                     "nextSpinDelayMs":  150
                                 },
    "buttonPressByButton":  {
                                "spin":  {
                                             "durationMs":  115,
                                             "translateXPx":  0,
                                             "translateYPx":  2,
                                             "scale":  0.975,
                                             "brightness":  0.8,
                                             "saturation":  0.94,
                                             "overlayOpacity":  0.24,
                                             "shadowOpacity":  0.48,
                                             "shadowBlurPx":  12,
                                             "highlightOpacity":  0.16,
                                             "regionXPercent":  10.638826990418204,
                                             "regionYPercent":  8.58915201682181,
                                             "regionWidthPercent":  78.8904356928671,
                                             "regionHeightPercent":  80.33472085937743,
                                             "regionRadiusPercent":  50
                                         },
                                "cashout":  {
                                                "durationMs":  105,
                                                "translateXPx":  0,
                                                "translateYPx":  4,
                                                "scale":  0.98,
                                                "brightness":  0.8,
                                                "saturation":  0.94,
                                                "overlayOpacity":  0.24,
                                                "shadowOpacity":  0.48,
                                                "shadowBlurPx":  12,
                                                "highlightOpacity":  0.16,
                                                "regionXPercent":  5.376343975757394,
                                                "regionYPercent":  6.847577933306748,
                                                "regionWidthPercent":  87.90322605454585,
                                                "regionHeightPercent":  86.30484413338651,
                                                "regionRadiusPercent":  12
                                            },
                                "pays":  {
                                             "durationMs":  105,
                                             "translateXPx":  0,
                                             "translateYPx":  4,
                                             "scale":  0.98,
                                             "brightness":  0.8,
                                             "saturation":  0.94,
                                             "overlayOpacity":  0.24,
                                             "shadowOpacity":  0.48,
                                             "shadowBlurPx":  12,
                                             "highlightOpacity":  0.16,
                                             "regionXPercent":  0,
                                             "regionYPercent":  0,
                                             "regionWidthPercent":  100,
                                             "regionHeightPercent":  100,
                                             "regionRadiusPercent":  12
                                         },
                                "betMinus":  {
                                                 "durationMs":  105,
                                                 "translateXPx":  0,
                                                 "translateYPx":  4,
                                                 "scale":  0.98,
                                                 "brightness":  0.8,
                                                 "saturation":  0.94,
                                                 "overlayOpacity":  0.24,
                                                 "shadowOpacity":  0.48,
                                                 "shadowBlurPx":  12,
                                                 "highlightOpacity":  0.16,
                                                 "regionXPercent":  4.966339248956569,
                                                 "regionYPercent":  14.684303667663825,
                                                 "regionWidthPercent":  20.56901264828639,
                                                 "regionHeightPercent":  69.86822811698208,
                                                 "regionRadiusPercent":  50
                                             },
                                "betPlus":  {
                                                "durationMs":  105,
                                                "translateXPx":  0,
                                                "translateYPx":  4,
                                                "scale":  0.98,
                                                "brightness":  0.8,
                                                "saturation":  0.94,
                                                "overlayOpacity":  0.24,
                                                "shadowOpacity":  0.48,
                                                "shadowBlurPx":  12,
                                                "highlightOpacity":  0.16,
                                                "regionXPercent":  38.87408608688497,
                                                "regionYPercent":  16.210632763044373,
                                                "regionWidthPercent":  20.125913913115028,
                                                "regionHeightPercent":  68.34189902160153,
                                                "regionRadiusPercent":  50
                                            },
                                "leaderboard":  {
                                                    "durationMs":  105,
                                                    "translateXPx":  0,
                                                    "translateYPx":  4,
                                                    "scale":  0.98,
                                                    "brightness":  0.8,
                                                    "saturation":  0.94,
                                                    "overlayOpacity":  0.24,
                                                    "shadowOpacity":  0.48,
                                                    "shadowBlurPx":  12,
                                                    "highlightOpacity":  0.16,
                                                    "regionXPercent":  71.41549367585681,
                                                    "regionYPercent":  13.394810024593005,
                                                    "regionWidthPercent":  24.325913913115027,
                                                    "regionHeightPercent":  73.97354449850427,
                                                    "regionRadiusPercent":  7
                                                }
                            },
    "editor":  {
                   "dockSide":  "right"
               },
    "anticipation":  {
                         "enabled":  true,
                           "thresholdBetMultiplier":  20,
                         "extraDurationMs":  3000,
                         "borderThicknessPx":  7,
                         "borderColor":  "#ffe45c",
                         "secondaryColor":  "#ff3045",
                         "glowColor":  "#fff4a8",
                         "glowBlurPx":  22,
                         "pulseDurationMs":  380,
                         "borderRadiusPx":  12
                     },
    "paylineReplay":  {
                          "enabled":  true,
                          "repeatCount":  10,
                          "fadeInMs":  120,
                          "holdMs":  240,
                          "fadeOutMs":  140,
                          "gapMs":  600
                      },
    "pig":  {
                "enabled":  true,
                "image":  "assets/GRAPHIC_PIG.png",
                    "currentGrowthScale":  1,
                "impactXPercent":  36,
                "impactYPercent":  49,
                "staggerMs":  80,
                "liftPx":  35,
                "liftDurationMs":  100,
                "flyDurationMs":  430,
                "pathArcPx":  80,
                "bumpScale":  1.09,
                "bumpDurationMs":  150,
                "growthChance":  0.4,
                    "growthStep":  0.1,
                    "maxScale":  4,
                "growthDurationMs":  1000,
                    "burstChanceAfterGrowth":  0.02,
                "burstFlyDurationMs":  1125,
                "burstExplosionDurationMs":  1600,
                "burstCoinCount":  70,
                "burstSpreadPx":  520,
                "burstMaxGrowDurationMs":  1200,
                "burstMaxHoldMs":  180
            },
    "freeSpinsCounter":  {
                             "enabled":  true,
                             "thumbnailSizePx":  36,
                             "gapPx":  3,
                             "paddingPx":  7,
                             "borderWidthPx":  2,
                             "borderRadiusPx":  10,
                             "backgroundColor":  "#003e74",
                             "borderColor":  "#ffe884",
                             "labelColor":  "#ffffff",
                             "labelFontSizePx":  15,
                             "showLabel":  true,
                             "labelText":  "FREE SPINS"
                         },
    "luckHasArrived":  {
                           "enabled":  true,
                           "chance":  0.01,
                           "extraSpinDurationMs":  4000,
                           "revealDelayMs":  3000,
                           "collectAwardChance":  0.5,
                           "minimumCollectBetMultiplier":  8,
                           "maximumCollectBetMultiplier":  25,
                           "showerDurationMs":  3500,
                           "symbolCount":  46,
                           "symbolSizePx":  128,
                           "fallDurationMs":  1500,
                           "staggerMs":  75,
                           "horizontalSpreadPx":  780,
                           "titleText":  "YOU A LUCKY SOMBITCH!!",
                           "titleFontSizePx":  45,
                           "titleColor":  "#ff0000",
                           "glowColor":  "#ffd33d",
                           "backdropOpacity":  0.02
                       }
};
  const regions={
    spin:{regionXPercent:10.638826990418204,regionYPercent:8.58915201682181,regionWidthPercent:78.8904356928671,regionHeightPercent:80.33472085937743,regionRadiusPercent:50},
    cashout:{regionXPercent:5.376343975757394,regionYPercent:6.847577933306748,regionWidthPercent:87.90322605454585,regionHeightPercent:86.30484413338651,regionRadiusPercent:12},
    pays:{regionXPercent:0,regionYPercent:0,regionWidthPercent:100,regionHeightPercent:100,regionRadiusPercent:12},
    betMinus:{regionXPercent:4.966339248956569,regionYPercent:14.684303667663825,regionWidthPercent:20.56901264828639,regionHeightPercent:69.86822811698208,regionRadiusPercent:50},
    betPlus:{regionXPercent:38.87408608688497,regionYPercent:16.210632763044373,regionWidthPercent:20.125913913115028,regionHeightPercent:68.34189902160153,regionRadiusPercent:50},
    leaderboard:{regionXPercent:71.41549367585681,regionYPercent:13.394810024593005,regionWidthPercent:24.325913913115027,regionHeightPercent:73.97354449850427,regionRadiusPercent:7}
  };
  Object.keys(defaults.buttonPressByButton).forEach(key=>Object.assign(defaults.buttonPressByButton[key],regions[key],defaults.buttonPressByButton[key]));
  Slot.DefaultSettings = defaults;
  Slot.Config = JSON.parse(JSON.stringify(defaults));

  Slot.EditorMeta = {
    'autoSpin.holdDurationMs': { min:250,max:1500,step:25,control:'range' },
    'autoSpin.betweenSpinsMs': { min:0,max:3000,step:25,control:'range' },
    'bigWin.thresholdBetMultiplier': { min:1,max:100,step:.5,control:'range' },
    'bigWin.durationMs': { min:1000,max:15000,step:100 },
    'bigWin.minimumSkipMs': { min:0,max:10000,step:100 },
    'bigWin.valueFontSizePx': { min:20,max:140,step:1,control:'range' },
    'bigWin.scale': { min:.3,max:2,step:.01,control:'range' },
    'cashoutMenu.labelFontSizePx': { min:10,max:48,step:1,control:'range' },
    'cashoutMenu.valueFontSizePx': { min:12,max:60,step:1,control:'range' },
    'cashoutMenu.fontWeight': { min:100,max:1000,step:100 },
    'cashoutMenu.letterSpacingPx': { min:-2,max:10,step:.25,control:'range' },
    'cashoutMenu.lineHeight': { min:.8,max:2,step:.05,control:'range' },
    'cashoutMenu.paddingPx': { min:0,max:40,step:1,control:'range' },
    'cashoutMenu.borderWidthPx': { min:0,max:10,step:1 },
    'cashoutMenu.borderRadiusPx': { min:0,max:30,step:1 },
    'economy.leaderboardLimit': { min:5,max:100,step:1 },
    'economy.borrowMin': { min:1000,max:10000,step:1000 },
    'economy.borrowMax': { min:1000,max:50000,step:1000 },
    'economy.cashoutMinimumNoDebt': { min:0,max:100000,step:1000 },
    'economy.cashoutMinimumWithDebt': { min:0,max:100000,step:1000 },
    'economy.debtResetDays': { min:1,max:365,step:1 },
    'reels.reelWidth': { min:130, max:250, step:1, control:'range' },
    'reels.cellHeight': { min:110, max:210, step:1, control:'range' },
    'reels.symbolBufferCells': { min:6, max:12, step:1 },
    'spin.speedPxPerMs': { min:0.5, max:7, step:0.1, control:'range' },
    'spin.firstReelStopDelayMs': { min:200, max:3000, step:25 },
    'spin.reelStopIntervalMs': { min:100, max:1500, step:25 },
    'spin.postStopEvaluationDelayMs': { min:0, max:1000, step:10 },
    'spin.bounceAmountPx': { min:0, max:100, step:1, control:'range' },
    'spin.bounceDurationMs': { min:60, max:700, step:5 },
    'spin.stopLeadCells': { min:1, max:5, step:1, control:'range' },
    'spin.buttonActionDelayMs': { min:0, max:250, step:5 },
    'landingEffects.leadTimeMs': { min:0, max:500, step:5, control:'range' },
    'landingEffects.collectGlowDurationMs': { min:50, max:1600, step:10 },
    'landingEffects.collectGlowBlurPx': { min:0, max:50, step:1, control:'range' },
    'landingEffects.freeSpinsPopScale': { min:1, max:1.8, step:0.01, control:'range' },
    'landingEffects.freeSpinsPopDurationMs': { min:80, max:1400, step:10 },
    'outcomes.dollarMinMultiplier': { min:.5, max:50, step:.5 },
    'outcomes.dollarMaxMultiplier': { min:.5, max:100, step:.5 },
    'outcomes.dollarValueWeightExponent': { min:0.2,max:8,step:.1,control:'range' },
    'outcomes.dollarLowTierWeight': { min:.1,max:20,step:.1,control:'range' },
    'outcomes.dollarMidTierWeight': { min:.1,max:20,step:.1,control:'range' },
    'outcomes.dollarHighTierWeight': { min:.1,max:20,step:.1,control:'range' },
    'outcomes.dollarStackChance': { min:0, max:0.30, step:0.005, control:'range' },
    'outcomes.maxDollarSymbolsWithoutStack': { min:0, max:2, step:1 },
    'outcomes.freeSpinsTriggerCount': { min:3, max:3, step:1 },
    'outcomes.freeSpinsAward': { min:1, max:30, step:1 },
    'symbols.dollar.valueFontSizePx': { min:10, max:72, step:1, control:'range' },
    'paylines.displayDurationMs': { min:100, max:5000, step:50 },
    'paylines.lineWidthPx': { min:1, max:14, step:1, control:'range' },
    'paylines.glowWidthPx': { min:0, max:30, step:1, control:'range' },
    'paylines.opacity': { min:0.1, max:1, step:0.01, control:'range' },
    'popup.animation': { control:'select', options:['pop','fade','slide'] },
    'popup.scale': { min:0.5, max:2, step:0.05, control:'range' },
    'popup.durationMs': { min:100, max:6000, step:50 },
    'popup.borderRadiusPx': { min:0, max:60, step:1 },
    'popup.backdropOpacity': { min:0, max:0.8, step:0.01, control:'range' },
    'popup.xOffsetPx': { min:-500,max:500,step:1,control:'range' },
    'popup.yOffsetPx': { min:-300,max:300,step:1,control:'range' },
    'popup.widthPx': { min:220,max:900,step:5,control:'range' },
    'popup.minHeightPx': { min:60,max:500,step:5 },
    'popup.paddingXPx': { min:0,max:100,step:1 },
    'popup.paddingYPx': { min:0,max:100,step:1 },
    'popup.borderWidthPx': { min:0,max:20,step:1 },
    'popup.valueFontSizePx': { min:18,max:140,step:1,control:'range' },
    'popup.titleFontSizePx': { min:10,max:72,step:1,control:'range' },
    'popup.subtitleFontSizePx': { min:8,max:48,step:1,control:'range' },
    'popup.fontWeight': { min:100,max:1000,step:100 },
    'popup.letterSpacingPx': { min:-5,max:20,step:.5,control:'range' },
    'popup.shadowBlurPx': { min:0,max:100,step:1,control:'range' },
    'collectAnimation.liftPx': { min:0, max:180, step:1, control:'range' },
    'collectAnimation.liftDurationMs': { min:40, max:1000, step:10 },
    'collectAnimation.flyDurationMs': { min:100, max:2200, step:10 },
    'collectAnimation.staggerMs': { min:0, max:1000, step:10 },
    'collectAnimation.impactDurationMs': { min:40, max:500, step:10 },
    'collectAnimation.collectBumpScale': { min:1, max:1.5, step:0.01, control:'range' },
    'collectAnimation.collectBumpDurationMs': { min:60, max:900, step:10 },
    'collectAnimation.splashCoinCount': { min:0, max:40, step:1 },
    'collectAnimation.splashSpreadPx': { min:10, max:220, step:2, control:'range' },
    'collectAnimation.splashDurationMs': { min:100, max:1200, step:10 },
    'collectAnimation.splashCoinSizePx': { min:4, max:36, step:1, control:'range' },
    'audio.masterVolume': { min:0, max:1, step:0.01, control:'range' },
    'audio.reelStopSfxVolume': { min:0,max:1,step:.01,control:'range' },
    'audio.reelStopSfxLeadMs': { min:0,max:1000,step:5,control:'range' },
    'audio.pigBreakSfxVolume': { min:0,max:1,step:.01,control:'range' },
    'audio.pigBreakSfxDelayMs': { min:0,max:1000,step:5 },
    'audio.coinInPigSfxVolume': { min:0,max:1,step:.01,control:'range' },
    'audio.coinInPigSfxDelayMs': { min:0,max:1000,step:5 },
    'freeSpinsFeature.popupScale': { min:0.5, max:1.8, step:0.01, control:'range' },
    'freeSpinsFeature.widthPx': { min:260,max:900,step:5,control:'range' },
    'freeSpinsFeature.minHeightPx': { min:180,max:650,step:5 },
    'freeSpinsFeature.paddingXPx': { min:0,max:100,step:1 },
    'freeSpinsFeature.paddingYPx': { min:0,max:100,step:1 },
    'freeSpinsFeature.borderWidthPx': { min:0,max:20,step:1 },
    'freeSpinsFeature.borderRadiusPx': { min:0,max:80,step:1 },
    'freeSpinsFeature.fontWeight': { min:100,max:1000,step:100 },
    'freeSpinsFeature.backdropOpacity': { min:0, max:0.9, step:0.01, control:'range' },
    'freeSpinsFeature.symbolScale': { min:0.5, max:1.8, step:0.01, control:'range' },
    'freeSpinsFeature.titleFontSizePx': { min:18, max:72, step:1, control:'range' },
    'freeSpinsFeature.subtitleFontSizePx': { min:12, max:42, step:1, control:'range' }
  };

  Object.assign(Slot.EditorMeta, {
    'pigBurstPopup.titleFontSizePx': { min:12,max:80,step:1,control:'range' },
    'pigBurstPopup.subtitleFontSizePx': { min:10,max:48,step:1,control:'range' },
    'pigBurstPopup.fontWeight': { min:100,max:1000,step:100 },
    'pigBurstPopup.letterSpacingPx': { min:-4,max:20,step:.5,control:'range' },
    'pigBurstPopup.lineHeight': { min:.7,max:2,step:.02,control:'range' },
    'freeSpinsWinPresentation.repeatCount': { min:1,max:20,step:1 },
    'freeSpinsWinPresentation.fadeInMs': { min:20,max:1000,step:10 },
    'freeSpinsWinPresentation.holdMs': { min:0,max:3000,step:10 },
    'freeSpinsWinPresentation.fadeOutMs': { min:20,max:1000,step:10 },
    'freeSpinsWinPresentation.gapMs': { min:0,max:2000,step:10 },
    'freeSpinsWinPresentation.nextSpinDelayMs': { min:0,max:3000,step:10 },
    'paytablePopup.widthPx': { min:500,max:1100,step:5,control:'range' },
    'paytablePopup.maxHeightPx': { min:300,max:700,step:5 },
    'paytablePopup.titleFontSizePx': { min:18,max:64,step:1,control:'range' },
    'paytablePopup.rowMinHeightPx': { min:50,max:160,step:2 },
    'paytablePopup.symbolSizePx': { min:35,max:120,step:1,control:'range' },
    'paytablePopup.nameFontSizePx': { min:10,max:42,step:1 },
    'paytablePopup.payFontSizePx': { min:12,max:48,step:1 },
    'paytablePopup.fontWeight': { min:100,max:1000,step:100 },
    'paytablePopup.borderRadiusPx': { min:0,max:60,step:1 },
    'paytablePopup.borderWidthPx': { min:0,max:16,step:1 }
  });

  Object.assign(Slot.EditorMeta, {
    'editor.dockSide': { control:'select', options:['right','left'] },
    'anticipation.thresholdBetMultiplier': { min:1,max:50,step:.5,control:'range' },
    'anticipation.extraDurationMs': { min:0,max:10000,step:100 },
    'anticipation.borderThicknessPx': { min:1,max:24,step:1,control:'range' },
    'anticipation.glowBlurPx': { min:0,max:60,step:1,control:'range' },
    'anticipation.pulseDurationMs': { min:80,max:2000,step:10 },
    'anticipation.borderRadiusPx': { min:0,max:50,step:1 },
    'paylineReplay.repeatCount': { min:0,max:12,step:1 },
    'paylineReplay.fadeInMs': { min:20,max:1000,step:10 },
    'paylineReplay.holdMs': { min:0,max:2000,step:10 },
    'paylineReplay.fadeOutMs': { min:20,max:1000,step:10 },
    'paylineReplay.gapMs': { min:0,max:1000,step:10 },
    'pig.impactXPercent': { min:0,max:100,step:1,control:'range' },
    'pig.currentGrowthScale': { min:1,max:4,step:.01,control:'range' },
    'pig.impactYPercent': { min:0,max:100,step:1,control:'range' },
    'pig.staggerMs': { min:0,max:1000,step:10 },
    'pig.liftPx': { min:0,max:200,step:1,control:'range' },
    'pig.liftDurationMs': { min:20,max:1000,step:10 },
    'pig.flyDurationMs': { min:50,max:2500,step:10 },
    'pig.pathArcPx': { min:-300,max:300,step:2,control:'range' },
    'pig.bumpScale': { min:1,max:1.5,step:.01,control:'range' },
    'pig.bumpDurationMs': { min:40,max:1000,step:10 },
    'pig.growthChance': { min:0,max:1,step:.01,control:'range' },
    'pig.growthStep': { min:.01,max:1,step:.01,control:'range' },
    'pig.maxScale': { min:1,max:4,step:.05,control:'range' },
    'pig.growthDurationMs': { min:80,max:2000,step:10 }
    ,'pig.burstChanceAfterGrowth': { min:0,max:1,step:.01,control:'range' }
    ,'pig.burstFlyDurationMs': { min:100,max:3000,step:25 }
    ,'pig.burstExplosionDurationMs': { min:100,max:2000,step:25 }
    ,'pig.burstCoinCount': { min:0,max:80,step:1 }
    ,'pig.burstSpreadPx': { min:50,max:600,step:10,control:'range' }
    ,'pig.burstMaxGrowDurationMs': { min:100,max:5000,step:25 }
    ,'pig.burstMaxHoldMs': { min:0,max:2000,step:25 }
    ,'freeSpinsCounter.thumbnailSizePx': { min:10,max:80,step:1,control:'range' }
    ,'freeSpinsCounter.gapPx': { min:0,max:30,step:1 }
    ,'freeSpinsCounter.paddingPx': { min:0,max:40,step:1 }
    ,'freeSpinsCounter.borderWidthPx': { min:0,max:12,step:1 }
    ,'freeSpinsCounter.borderRadiusPx': { min:0,max:40,step:1 }
    ,'freeSpinsCounter.labelFontSizePx': { min:8,max:32,step:1 }
    ,'audio.buttonClickVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.freeSpinLandVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.freeSpinLandPitchStep': { min:0,max:.25,step:.01,control:'range' }
    ,'audio.bonusWinVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.dollarLandVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.coinsFallingVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.regularWinVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.musicVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.coinCollectVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.collectLandVolume': { min:0,max:1,step:.01,control:'range' }
    ,'audio.voicePoolSize': { min:2,max:16,step:1 }
    ,'luckHasArrived.chance': { min:0,max:1,step:.005,control:'range' }
    ,'luckHasArrived.extraSpinDurationMs': { min:0,max:10000,step:100 }
    ,'luckHasArrived.revealDelayMs': { min:0,max:10000,step:100 }
    ,'luckHasArrived.collectAwardChance': { min:0,max:1,step:.01,control:'range' }
    ,'luckHasArrived.minimumCollectBetMultiplier': { min:1,max:200,step:1 }
    ,'luckHasArrived.maximumCollectBetMultiplier': { min:2,max:300,step:1 }
    ,'luckHasArrived.showerDurationMs': { min:250,max:10000,step:50 }
    ,'luckHasArrived.symbolCount': { min:1,max:100,step:1 }
    ,'luckHasArrived.symbolSizePx': { min:15,max:180,step:1,control:'range' }
    ,'luckHasArrived.fallDurationMs': { min:200,max:5000,step:50 }
    ,'luckHasArrived.staggerMs': { min:0,max:500,step:5 }
    ,'luckHasArrived.horizontalSpreadPx': { min:100,max:1400,step:10 }
    ,'luckHasArrived.titleFontSizePx': { min:12,max:100,step:1,control:'range' }
    ,'luckHasArrived.backdropOpacity': { min:0,max:.8,step:.01,control:'range' }
  });

  const pressFields=['durationMs','translateXPx','translateYPx','scale','brightness','saturation','overlayOpacity','shadowOpacity','shadowBlurPx','highlightOpacity','regionXPercent','regionYPercent','regionWidthPercent','regionHeightPercent','regionRadiusPercent'];
  const pressMeta={
    durationMs:{min:30,max:400,step:5}, translateXPx:{min:-25,max:25,step:1,control:'range'}, translateYPx:{min:-10,max:30,step:1,control:'range'},
    scale:{min:.80,max:1.08,step:.005,control:'range'}, brightness:{min:.35,max:1.25,step:.01,control:'range'}, saturation:{min:0,max:1.5,step:.01,control:'range'},
    overlayOpacity:{min:0,max:.7,step:.01,control:'range'}, shadowOpacity:{min:0,max:.9,step:.01,control:'range'}, shadowBlurPx:{min:0,max:40,step:1,control:'range'},
    highlightOpacity:{min:0,max:.6,step:.01,control:'range'}, regionXPercent:{min:0,max:100,step:.5,control:'range'}, regionYPercent:{min:0,max:100,step:.5,control:'range'},
    regionWidthPercent:{min:1,max:140,step:.5,control:'range'}, regionHeightPercent:{min:1,max:140,step:.5,control:'range'}, regionRadiusPercent:{min:0,max:50,step:.5,control:'range'}
  };
  pressFields.forEach(f=>Slot.EditorMeta[`buttonPress.${f}`]=pressMeta[f]);
  Object.keys(defaults.buttonPressByButton).forEach(btn=>pressFields.forEach(f=>Slot.EditorMeta[`buttonPressByButton.${btn}.${f}`]=pressMeta[f]));

  for (const id of Object.keys(defaults.symbols)) {
    Slot.EditorMeta[`symbols.${id}.scale`] = { min:0.25, max:1.7, step:0.01, control:'range' };
    Slot.EditorMeta[`symbols.${id}.xOffset`] = { min:-80, max:80, step:1 };
    Slot.EditorMeta[`symbols.${id}.yOffset`] = { min:-80, max:80, step:1 };
    Slot.EditorMeta[`symbols.${id}.cellPadding`] = { min:0, max:50, step:1 };
    Slot.EditorMeta[`symbols.${id}.opacity`] = { min:0.1, max:1, step:0.01, control:'range' };
    Slot.EditorMeta[`symbols.${id}.weight`] = { min:0, max:100, step:0.25 };
  }
  for(const [id,pays] of Object.entries(defaults.linePays||{}))for(const count of Object.keys(pays))Slot.EditorMeta[`linePays.${id}.${count}`]={min:0,max:100,step:.1};
  for (const key of Object.keys(defaults.layout)) {
    Slot.EditorMeta[`layout.${key}.x`] = { min:-200, max:1400, step:1 };
    Slot.EditorMeta[`layout.${key}.y`] = { min:-200, max:900, step:1 };
    Slot.EditorMeta[`layout.${key}.scale`] = { min:0.1, max:2, step:0.01, control:'range' };
  }
})();
