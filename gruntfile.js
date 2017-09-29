// Gruntfile.js

var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var gifsicle = require('imagemin-gifsicle');

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),


    // all of our configuration will go here

    //    minify html
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'src/index.html' // 'destination': 'source'
        }
      },
    },

    //compile sass with compass
    compass: {
      dist: {
        options: {
          sassDir: 'src/css/sass',
          cssDir: 'css/'
        }
      }
    },

    //automatically add prefixes to css
    postcss: {
      options: {
        map: false, // no inline sourcemaps
        processors: [
          require("autorem")({
            legacy: true
          }), //convert px to rem
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
            browsers: 'last 2 versions'
          }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]

      },
      dist: {
        src: 'css/main.css',
        dest: 'css/main.min.css'
      }
    },



    //lint js files
    jshint: {
      all: ['gruntfile.js']
      /*jshint maxerr:1000 */
    },


    //concatenate js files
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%=grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: ["src/js/vendor/jquery-1.12.0.min.js", "src/js/vendor/particles.js-master/particles.min.js", "src/js/plugins.js", "src/js/vendor/zenscroll-latest/zenscroll-min.js", "src/js/main.js"],
        dest: "js/concat.js"
      }
    },

    //minify js
    uglify: {
      build: {
        src: ["js/concat.js"],
        dest: "js/main.min.js"
      }

    },

    //optimize images --needs help
    imagemin: {
      target: {
        options: {
          optimizationLevel: 5,
          progressive: true,
          use: [pngquant(), mozjpeg(), gifsicle()]
        }, // options
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'img/'
      }]
      }
    },
    //watch for changes
    watch: {
      options: {
        livereload: true
      },
      grunt: { //what does this do?
        files: ['gruntfile.js']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['htmlmin'],
      },
      css: {
        files: ['src/css/sass/*.scss', 'src/css/sass/**/*.scss'],
        tasks: ['compass', 'postcss'],
      },
      js: {
        files: ['src/js/*.js', 'src/js/**/*.js'],
        tasks: ['concat', 'jshint', 'uglify'],
      }

    }



  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  //load custom tasks -doesn't work yet
  grunt.registerTask('golive', ['htmlmin', 'compass', 'postcss', 'concat', 'uglify', 'imagemin']);

  //load default task -doesn't work yet
  grunt.registerTask('default', ['watch']);

};
