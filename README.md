# gatsby-plugin-express

![version](https://img.shields.io/npm/v/gatsby-plugin-express.svg)
![downloads](https://img.shields.io/npm/dt/gatsby-plugin-express.svg)

Server side client route matching, redirect and 404 handling

## Usage

### `gatsby-config.js`

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-express',
    options: {
      output: 'config/gatsby-express.json',
    }
  }
]
```

### express app

```javascript
const gatsyExpress = require('gatsby-plugin-express');
const app = express();

// serve static files before gatsbyExpress
app.use(express.static('public/'));
app.use(gatsyExpress('config/gatsby-express.json', {
  publicDir: 'public/',
  template: 'public/404/index.html',

  // redirects all /path/ to /path
  // should be used with gatsby-plugin-remove-trailing-slashes
  redirectSlashes: true,
}));
```
