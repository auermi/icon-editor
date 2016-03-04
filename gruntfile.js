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
                    'app/master.css': 'scss/master.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'app/master.css': 'app/master.css'
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
    grunt.registerTask('watch', 'watch')
    grunt.registerTask('default', ['sass', 'cssmin'])
}
