"use strict";

// takes stats and returns wins or losses + 1 and updates win/loss ratio
module.exports = (stats, type) => {
  return type === "wins"
    ? {
        wins: stats.wins + 1,
        wl: (stats.wins + 1) / (stats.losses > 0 ? stats.losses : 1),
      } // divide by 1 if losses is still 0
    : {
        losses: stats.losses + 1,
        wl: stats.wins / (stats.losses + 1),
      };
};


//generating function to calculate the wl, wins, and losses
