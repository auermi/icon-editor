module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    noCache: true
                },
                files: {
                    'assets/master.css': 'assets/stylesheets/master.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'assets/master.css': 'assets/master.css'
                }
            }
        },
        watch: {
            files: '**/*.scss',
            tasks: ['sass', 'cssmin']
        }
    })
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['watch'])
}
