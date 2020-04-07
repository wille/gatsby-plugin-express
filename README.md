# gatsby-plugin-express

![version](https://img.shields.io/npm/v/gatsby-plugin-express.svg)
![downloads](https://img.shields.io/npm/dt/gatsby-plugin-express.svg)

Server side client route matching, redirect and 404 handling

## Usage

Install the plugin.

```bash
npm i gatsby-plugin-express
```

or

```bash
yarn add gatsby-plugin-express
```

Create the configuration file.

```bash
mkdir config
touch config/gatsby-express.json
```

Add the plugin to `gatsby-config.js`

```js
plugins: [
  {
    resolve: 'gatsby-plugin-express',
    options: {
      output: 'config/gatsby-express.json',
    }
  }
]
```

You can create your express app anywhere in the project.

In this example, `server.js` is created in the project root with the following content:

```js
const gatsbyExpress = require('gatsby-plugin-express');
const app = express();

// serve static files before gatsbyExpress
app.use(express.static('public/'));
app.use(gatsbyExpress('config/gatsby-express.json', {
  publicDir: 'public/',
  template: 'public/404/index.html',

  // redirects all /path/ to /path
  // should be used with gatsby-plugin-remove-trailing-slashes
  redirectSlashes: true,
}));

app.listen(3000, function() {
  console.log('App started on port 3000');
});
```

Build the site

```bash
gatsby build
```

Serve the site using your express app.

```bash
node server.js
```

View the site on `http://localhost:3000`

During development, when running `gatsby develop`, gatsby provides its own express application to serve the site.

You can hook into the express used by Gatsby using the [Gatsby APIs - Advanced Proxying](https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying).
