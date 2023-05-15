const fs = require('fs')
const path = require('path')
const match = require('@reach/router/lib/utils').match

module.exports = function redirect (data = 'gatsby-express.json', options) {
  const publicDir = options.publicDir || path.resolve('public/')

  if (typeof data === 'string') {
    data = fs.readFileSync(data)
    data = JSON.parse(data)
  }

  const join = p => path.join(publicDir, p)

  return async function (req, res, next) {
    for (var r of data.redirects) {
      if (req.path === r.fromPath) {
        const code = r.isPermanent ? 301 : 302
        return res.redirect(code, r.toPath)
      }
    }

    for (var page of data.pages) {
      if (req.path === page.path) {
        // handle /without-trailing-slash to /without-trailing-slash/index.html
        const index = require.resolve('index.html', {
          paths: [
            join(page.path)
          ]
        })

        if (index) {
          // remove trailing slashes in request
          if (options.redirectSlashes && req.path.endsWith('/')) {
            return res.redirect(req.path.substr(0, req.path.length - 1))
          }
          return res.sendFile(path.resolve(index))
        }
        break
      }
    }

    for (const page of data.pages.filter(p => p.matchPath)) {
      const m = match(page.matchPath, req.path)

      if (m) {
        const index = require.resolve('index.html', {
          paths: [join(m.uri)]
        })

        if (index) {
          return res.sendFile(path.resolve(index))
        }
        break
      }
    }

    next()
  }
}
