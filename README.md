# gatsby-plugin-express

Usage

## `gatsby-config.js`

```javascript
plugins: [
  {
    resolve: 'gatsby-plugin-express',
    options: {
      output: 'config/redirects.json',
    }
  }
]
```

## express app

```javascript
const redirects = require('gatsby-plugin-express');
const app = express();

app.use(redirects('config/redirects.json'));
```