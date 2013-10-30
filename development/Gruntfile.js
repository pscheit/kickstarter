module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //  Define our source and build folders
    meta:{
      src_path: 'files/berner-stiftung.de/theme/assets/src',
      build_path: 'files/berner-stiftung.de/theme/assets/build'
    },

    //  Grunt Tasks
    jshint: {
      options: {
        jshintrc: '<%= meta.src_path %>/js/.jshintrc',
        ignores: [
          // '<%= meta.src_path %>/js/miw-audio-player.js'
        ]
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['<%= meta.src_path %>/js/*.js']
      }
    },

    concat: {
      dist: {
        src: ['<%= meta.src_path %>/js/**/*.js'],
        dest: '<%= meta.src_path %>/cache/app.js'
      }
    },

    uglify:{
      js: {
        files: {
          '<%= meta.build_path %>/js/app.min.js': '<%= meta.src_path %>/js/app.js',
        }
      }
    },

    prettysass: {
      options: {
        // Task-specific options go here.
      },
      sass: {
        src: ['<%= meta.src_path %>/scss/**/*.scss']
      },
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= meta.src_path %>/scss',
          cssDir: '<%= meta.src_path %>/cache'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 8']
      },
      dist: {
        files: {
          '<%= compass.dist.options.cssDir %>/styles.css': '<%= compass.dist.options.cssDir %>/styles.css'
        }
      }
    },

    cssmin:{
      compress: {
        files: {
          '<%= meta.build_path %>/css/styles.min.css': [ '<%= compass.dist.options.cssDir %>/styles.css' ]
        }
      }
    },

    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= meta.src_path %>/images',
          src: ['**/*.{png,jpg,jpeg}'],
          dest: '<%= meta.build_path %>/images'
        }]
      }
    },

    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.src_path %>/images',
            src: ['**/*.{gif,svg,ico}'],
            dest: '<%= meta.build_path %>/images'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: 'isFile',
            src: '<%= meta.src_path %>/libs/**',
            dest: '<%= meta.build_path %>/js/'
          }
        ]
      }
    },

    watch: {
      scripts: {
        options: {
          livereload: true
        },
        files: [
          '<%= meta.src_path %>/**/*'
        ],
        tasks: ['jshint', 'concat', 'uglify']
      },
      styles: {
        options: {
          livereload: true
        },
        files: [
          '<%= meta.src_path %>/**/*'
        ],
        tasks: ['prettysass', 'compass', 'autoprefixer', 'cssmin']
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'prettysass', 'compass', 'autoprefixer', 'cssmin', 'imagemin', 'copy']);

};
