const {JSDOM} = require("jsdom");
const fs = require("fs")
const Handlebars = require("handlebars")

const dom = new JSDOM(`
        <!DOCTYPE html>
        <html lang="ru">
          <body>
            <div id="app"></div>
          </body>
        </html>
`);

global.window = dom.window
global.document = dom.window.document
global.DocumentFragment = dom.window.DocumentFragment

require.extensions[".hbs"] = (module, filename) => {
  const contents = fs.readFileSync(filename,  'utf-8');
  module.exports = Handlebars.compile (contents);
}

require.extensions[".sass"] = () => {
  module.exports = {};
}

