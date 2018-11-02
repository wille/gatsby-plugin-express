# gatsby-plugin-express

![version](https://img.shields.io/npm/v/gatsby-plugin-express.svg)
![downloads](https://img.shields.io/npm/dt/gatsby-plugin-express.svg)
![minizipped size](https://img.shields.io/bundlephobia/minzip/gatsby-plugin-express.svg)

Usage

## `gatsby-config.js`

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

## express app

```javascript
const gatsyExpress = require('gatsby-plugin-express');
const app = express();

app.use(gatsyExpress('config/gatsby-express.json'));
```
