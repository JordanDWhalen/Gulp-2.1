![Gulp!](https://lh3.googleusercontent.com/AkzvBqgkM0U2OCC0uIrlE96MKA3M1FSvTKyerFy8fllGtC81amn7eQYo7nqVGlOzw51Va3TSWgh5ga_w4IVIW1cv4vj5MqN-HWUl6ptEMLZeBxWT6FEjONDDX52JfyX3pRiYTTtlHEpxHAn3y_3a3Loh32VMK_FCdUmukFx9pNCLFMrGlhq6DW_AD_Z5e5Rj1HPCh_AuvQOnXCHl8ykCOcN1zEqWkz40CFnzd8tyKq0ebN8dVxcvFViR-Iqm8VNHTYs9xQs1a1w7pWVc5SkbCsNf9KJh_lE3X5DEZ82Y8V3LguIXYkTrNATooXUzOB6idB8FOoPcmJQqJbtdrbw3LbRz9mNQ1ZxoJ3vWpazM7z_hzaxRFJqjts_8C47EN9D2WPj8IYrAND8GJeuGJ_H3q3xaJJO_e1WOBO9DhoH0tjk3Ottj6LLjEcNCa1ysGgFr6SaKCw18PHd1PlblY4PyWZ1PZWxiMfxGRttgb4UGw5IYmuOVeEFVNrHIW_3P1kuurPUxwc8Rq96uvSS8zCsRsAKhLgkiSwNnWs4FwmjedlW8bZif6DVLhAGxV0EejzaquSZb=w1600-h400-no)
# UG Gulp Starter
The standard starter template for UG development projects.

## To use this package:
- Go to the "Downloads" tab on the left
- Click "Download Repository"
- Move the .zip version of the repository to wherever you'd like to use it.
- Uncompress the repo.

### If you're setting up a fresh version of the repo for development, otherwise skip to "Building":
- Rename the folder to match your project name.
- Open up package.json and update the name, as well as the version number so that they match your project.

### Building
- Open Terminal.
- Find the folder you just uncompressed, and drag it on to the Terminal icon in the dock.
- In Terminal, type: sudo npm install
- You're most likely going to be prompted to enter the password you use to log into your computer. All this does is give the terminal the permission to install the appropriate files for compression.
- Once that process finishes, type "gulp" in the terminal window, and you're all set up!


## Includes
- [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer): Automatically adds vendor prefixing for CSS components when needed.
- [SASS](https://www.npmjs.com/package/gulp-sass): Compiles all your SCSS files into usable CSS.
- [Concat](https://www.npmjs.com/package/gulp-concat): Combines small files into one larger file for deployment.
- [Flatten](https://www.npmjs.com/package/gulp-flatten): Makes messing with file directorys and paths a little simpler.
- [Imagemin](https://www.npmjs.com/package/gulp-imagemin): Compresses image files so they load faster, and dont take up so much space on the server.
- [CSS Globbing](https://www.npmjs.com/package/gulp-css-globbing): Allows you to reference directories in your Application.scss file, preventing you from having to include every new scss file.
- [CMQ](https://www.npmjs.com/package/gulp-combine-media-queries): Combine matching media queries into one media query definition.
- [Gulp Newer](https://www.npmjs.com/package/gulp-newer): Speeds up processing by only reprocessing source files that are newer than their compiled counterparts.
- [Gulp Uglify](https://www.npmjs.com/package/gulp-uglify) - Compresses your JS files for smaller file size, and faster loading.
- [Connect Livereload](https://www.npmjs.com/package/connect-livereload):An implementation of the LiveReload server in Node.js. It's an alternative to the graphical http://livereload.com/ application, which monitors files for changes and reloads your web browser.
- [Gulp Connect](https://www.npmjs.com/package/gulp-connect): Sets up a server compatible with LiveReload, allowing you to view your compiled files as you work on them without the need to mash CMD+R.
- [Gulp Newer](https://www.npmjs.com/package/gulp-newer): Speeds up livereload by only having it process new files.
- [Gulp Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps): Allows you to see where a line of CSS or JS originated when viewing things in the inspector.
- [Gulp Open](https://www.npmjs.com/package/gulp-open): Opens up the default dev view of "localhost:8080"

## Structure
- dev: Folder containing all JavaScript and SCSS
  - img: Folder for all uncompressed images.
  - js: Folder for all JavaScript
    - base.js: Your default JS file for the project. Use this for any custom scripting.
    - vendor: Folder containing all default project js libraries. If you'd like to add a new JS library, place it in this folder.
  - sass: Folder for all SASS
    - application.scss: This is the file where you can add new folders containing scss files that you'd like to be compiled.
    - vendor: Folder containing all default project css libraries, or reset files. If you'd like to add a new CSS library, place it in this folder.
    - base: Folder for project defaults. Variables, mixins, and the like. Anything your SASS is going to be dependent upon that isnt a library.
    - components: Folder for all simple and small repeating modules that you use to create more complext objects. E.G. Dropdowns, Products, etc. Anything that fits into a larger containing component/object.
    - objects: Folder for combinations of components, and the neccessary SCSS to layout those components.
    - pages: Folder for all page specific styling.
- public: Folder for your HTML, and the folder within which your compiled JS and CSS will be output to.
  - css: Compiled SASS.
  - js: Compiled JS and libraries.
  - img: Compiled images.
  - index.html: The default landing page for the project.

## Options
- Locally running WebServer
  - If you'd like to perform any testing on a device other than the one you're running gulp on:
    1. Navigate to gulpfile.js.
    2. Go to line 76.
    3. Uncomment, and set the host field to "0.0.0.0".
    4. Open up on your mobile device, or any other device connected to the same wifi network the computer you're running gulp is being on.
    5. Enter your IP Address, along with the port number you see in the terminal as the address.
    6. Have fun!
