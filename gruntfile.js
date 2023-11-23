module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['**/*.js', '!node_modules/**', '!Gruntfile.js'],
            options: {
                esversion: 8,
                unused: true
            }
        }
    });
  
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};