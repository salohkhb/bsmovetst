import {
  FULL_DAY_DURATION,
  HALF_DAY_DURATION,
  PASSAGE_DURATION,
} from "./constants";

// PRICES FOR THE RENT
export function getLiftPrice(km, liftName, duration, floors) {
  switch (liftName) {
    case "Échelle électrique": {
      if (duration === PASSAGE_DURATION) {
        return parseInt((200 + 0.7 * km) * 1.2);
      } else if (duration === HALF_DAY_DURATION) {
        return parseInt((250 + 0.7 * km) * 1.2);
      } else {
        return parseInt((350 + 0.7 * km) * 1.2);
      }
    }
    case "Monte meuble auto-porté": {
      if (floors > 6) {
        // supérieur à 6
        if (duration === PASSAGE_DURATION) {
          return parseInt((120 + 0.7 * km + (floors - 6) * 30) * 1.2);
        } else if (duration === HALF_DAY_DURATION) {
          return parseInt((180 + 0.7 * km + (floors - 6) * 30) * 1.2);
        } else {
          return parseInt((280 + 0.7 * km + (floors - 6) * 30) * 1.2);
        }
      } else {
        if (duration === PASSAGE_DURATION) {
          return parseInt((110 + 0.7 * km) * 1.2 + 10);
        } else if (duration === HALF_DAY_DURATION) {
          return parseInt((170 + 0.7 * km) * 1.2 + 10);
        } else {
          return parseInt((270 + 0.7 * km) * 1.2 + 10);
        }
      }
    }
    case "Monte meuble tracté": {
      if (duration === PASSAGE_DURATION) {
        return parseInt((110 + km * 0.7) * 1.2);
      } else if (duration === HALF_DAY_DURATION) {
        return parseInt((170 + km * 0.7) * 1.2);
      } else {
        return parseInt((270 + km * 0.7) * 1.2);
      }
    }
    default:
      return parseInt(200 + 0.7 * km * 1.2);
  }
}

// Movers price, PASSAGE_DURATION is 75 too for now
export function getMoversPrice(nbMovers = 0, duration) {
  return duration === FULL_DAY_DURATION ? nbMovers * 150 : nbMovers * 75;
}

// PRICES FOR THE ESTIMATE
