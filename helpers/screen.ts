import { isClient } from "~/helpers/env";

export function isHDScreen() {
  if (!isClient) {
    return false;
  }
  if (window.devicePixelRatio > 1) return true;
  const mediaQuery =
    "(-webkit-min-device-pixel-ratio: 1.1),\
            (min--moz-device-pixel-ratio: 1.1),\
            (-o-min-device-pixel-ratio: 10/9),\
    ";
  if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
  return false;
}
