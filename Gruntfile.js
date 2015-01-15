module.exports = function (grunt) {
    
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 3000,
                    keepalive: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/* Liam Howell <%= grunt.template.today("mm-dd-yyyy") %> */\n'
            },
            my_target: {
                files: {
                    'easyCanvas.min.js': ['easyCanvas.js']
                }
            }
        }
    });

    grunt.registerTask('default', 'Run the server on port 3000.', function () {
        grunt.task.run('connect');
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
