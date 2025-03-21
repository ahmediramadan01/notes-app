import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import pxtorem from "postcss-pxtorem";

export const plugins = [
  autoprefixer,
  cssnanoPlugin,
  pxtorem({ propList: ["*"] }),
];
