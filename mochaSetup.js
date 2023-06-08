const { JSDOM } = require("jsdom");

const dom = new JSDOM('<div class="app"></div>', {
  url: "http://localhost:3000",
});


global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;

require.extensions[".sass"] = function () {
  module.exports = {};
};
