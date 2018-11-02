const fs = require('fs');
const path = require('path');
const match = require('@reach/router/lib/utils').match;

module.exports = function redirect(data = 'gatsby-express.json', options) {
  const publicDir = options.publicDir || path.resolve('public/');
  const template = options.template || path.resolve(publicDir || 'public/', '404/index.html');

  if (typeof data === 'string') {
    data = fs.readFileSync(data);
    data = JSON.parse(data);
  }

  return async function(req, res) {
    for (var r of data.redirects) {
      if (req.path === r.fromPath) {
        const code = r.isPermanent ? 301 : 302;
        return res.redirect(code, r.toPath);
      }
    }

    for (var page of data.pages) {
      const b = page.matchPath && match(page.matchPath, req.path);
      if (b) {
        const html = require.resolve('index.html', {
          paths: [
            path.join(publicDir, b.uri.slice(1))
          ]
        });

        return res.sendFile(html);
      }
    }

    if (template) {
      res.status(404);
      res.sendFile(template);
    } else {
      res.sendStatus(404);
    }
  }
}
