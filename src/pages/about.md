---
title: About
template: _page.html
---

# Chug

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
- Built in quick deployment using Surge


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
assets/
src/
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
  scss/
    styles.scss
  index.html
```

#### assets/

The assets folder contains any static assets that need no processing, such as images or 3rd party js libs. These will be copied over, as-is, to `dist/assets/`.

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

#### scss/

The scss folder contains \*.scss files that are run through the Sass compiler and output to `dist/*.css`.