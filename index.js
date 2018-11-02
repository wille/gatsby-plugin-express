const fs = require('fs');

module.exports = function redirect(data = 'gatsby-express.json') {
  if (typeof data === 'string') {
    data = fs.readFileSync(data);
    data = JSON.parse(data);
  }

  return function(req, res, next) {
    for (var r of data.redirects) {
      if (req.path === r.fromPath) {
        const code = r.isPermanent ? 301 : 302;
        return res.redirect(code, r.toPath);
      }
    }

    for (var page of data.pages) {
      if (req.path === page.path) {
        return res.sendStatus(404);
      }
    }

    next();
  }
}
