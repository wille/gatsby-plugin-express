const fs = require('fs');

module.exports = function redirect(data = 'redirects.json') {
  if (typeof data === 'string') {
    data = fs.readFileSync(data);
    data = JSON.parse(data);
  }

  return function(req, res, next) {
    for (var r of data) {
      if (req.path === r.fromPath) {
        const code = r.isPermanent ? 301 : 302;
        return res.redirect(code, r.toPath);
      }
    }

    next();
  }
}
