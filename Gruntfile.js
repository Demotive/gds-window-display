module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    globalConfig: {
      scssFile: 'public/assets/sass/application.scss',
      cssFile: 'public/assets/stylesheets/application.css',
      jsFile: 'public/assets/javascripts/application.js',
      htmlFile: 'public/index.html'
    },

    // Copies assets from external modules and dirs
    copy: {
      govuk_frontend_toolkit: {
        expand: true,
        src: '**',
        cwd: 'node_modules/govuk_frontend_toolkit/govuk_frontend_toolkit/stylesheets/',
        dest: 'public/assets/sass/'
      }
    },

    // CSS
    sass: {
      dev : {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= globalConfig.cssFile %>': '<%= globalConfig.scssFile %>'
        }
      },
      dist : {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= globalConfig.cssFile %>': '<%= globalConfig.scssFile %>'
        }
      } 
    },

    watch: {
        /*scripts: {
            files: ['assets/js/*.js'],
            tasks: ['concat'],
            options: {
                spawn: false,
            },
        },*/
        css: {
            files: ['<%= globalConfig.scssFile %>'],
            tasks: ['sass:dev'],
            options: {
                spawn: false,
            }
        }
    },


////////////////////////////////
/*
    // JS
    concat: {
        dist: {
            // the files to concatenate
            src: [
                'assets/js/vendor/jquery-2.0.3.js',
                'assets/js/items/*.js',
                'assets/js/main.js'
            ],
            // the location of the resulting JS file
            dest: '<%= globalConfig.jsFile %>'
        }
    },
    uglify: {
        dist: {
            files: {
                '<%= globalConfig.jsFile %>': ['<%= globalConfig.jsFile %>']
            }
        }
    },
  
   */
  
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  
  grunt.registerTask('default', ['watch']);
  
  grunt.registerTask('init', ['copy']);
  
  grunt.registerTask('test', ['sass:dev', 'concat']);
  grunt.registerTask('build', ['sass:dist', 'concat', 'uglify']);

};