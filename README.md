# Chug

[Demo](http://chug.surge.sh)

#### A simple static site generator using gulp

The goal of this project is to provide a simple static site generator using utilities familiar to a JS dev.

Chug offers:
- Reusable and composable site templates using nunjucks templating engine
- Generate a blog from markdown files with YAML.
- Create static pages with html or markdown
- Automatic Sass support for writing and compiling .scss files to .css
- Includes the Bourbon and Neat Sass mixin libraries for writing Sass faster
- Ability to start local server that watches files and refreshes the browser using BrowserSync
- Contact form support and Google Analytics support ready with update to config
- Automatic bower support
- Javascript minificaiton
- Automatic google fonts integration
- Supports sourcemaps

## Get started

To get started run clone the repo and start your local server:

```
git clone https://github.com/zackhall/chug.git && cd chug
npm install
gulp
```

This will start a local server that is watching your local resources for changes. This is equivalent to `gulp serve`.

### Other available commands

#### gulp build

This command will build the file and place the output in the `dist` folder for you.

#### gulp clean

This command will clear the `dist` folder.

### Project structure:

```
src/
  assets/
    sass/
      styles.scss
    fonts/
    images/
    js/
      main.js
  pages/
    about.md
    contact.html
    thanks.html
  partials/
    _header.html
    _layout.html
    _page.html
    _post.html
  posts/
    2016-01-01-first-post.md
  404.html
  index.html
```

#### assets/

The assets folder contains all non html assets including Sass styles, scripts, images and fonts.

##### Sass styles/
The location for Sass files (*.scss) are under `src/assets/sass` directory. These files are run through the Sass compiler, auto prefixed for browser compatability and minified before output to `dist/style.css`.

##### Javascript/
All custom scripts are under `src/assets/js` directory. These fils are ugilified, compressed and combined before out put to `dist/js/main.js`.

##### Bower components/
All components defined in bower list are automatically compiled into `dist/js/vendor.js` or `dist/css/vendor.css`. The gulp tasks refers to main file definition of each bower component to extract necessary files. If a component doesn't have main files defined then consult [this link](https://github.com/ck86/main-bower-files) to define them manually.

##### Images/
All images under `src/images` are optimised and copied to `dist/images`. Supported image types are PNG, JPG, SVG, GIF.

##### Fonts/
Two types of fonts are supported:

1. Custom fonts: All custom fonts under `src/assets/fonts` are copied to `dist/fonts` directory.
2. Google fonts: Define all google fonts in `fonts.list`. These fonts plus an auto generated `fonts.css` are copied to `dist/fonts`;

#### pages/

The pages folder contains the files which are to be converted into static pages. Pages can be written using Markdown or completely customized using HTML. These files will be run through the gulp and output to `dist/pages/`.

#### partials/
The partials folder contains the templates and partial templates to design the layout of the static site. These templates make use of the [nunjucks](https://mozilla.github.io/nunjucks/) templating engine.

`_layout.html` contains the outermost wrapper of the site. This includes most of the boilerplate HTML content.
`_header.html` contains the content for generating the site header, nav.
`_post.html` is the default template for generating a blog post's page.
`_page.html` is the default template for generating a static html page.

#### posts/

The posts folder contains blog posts as markdown files. 

The file name should follow the naming convention `YYYY-MM-DD-page-title` where the final output file from this will be `dist/posts/YYYY/MM/DD/page-title.html`.

You can use YAML front matter to provide values to the templates used for generating the blog post. For example all posts should start include a title in the front matter. E.g.:

```
---
title: Hello, world.
---

...Markdown content here...
```

