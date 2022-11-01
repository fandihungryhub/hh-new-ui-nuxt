const path = require("path");

/** @type {import("@previewjs/config").PreviewConfig} */
module.exports = {
  wrapper: {
    path: path.resolve(__dirname, "./components/Wrapper.vue"),
  },
  alias: {
    "~": path.resolve(__dirname, "./"),
  },
};
