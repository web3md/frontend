import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const HEADER_WIDTH = 840;
export const DESKTOP_CONTENT_WIDTH = 840;
export const IS_HIGH_RESOLUTION = SCREEN_HEIGHT > 667;
export const IS_DESKTOP = SCREEN_WIDTH > HEADER_WIDTH;
export const HEADER_HEIGHT = 64;

export const Spacing = IS_HIGH_RESOLUTION
    ? {
          tiny: 8,
          small: 16,
          normal: 32,
          large: 48,
          huge: 64
      }
    : {
          tiny: 6,
          small: 12,
          normal: 24,
          large: 32,
          huge: 48
      };
