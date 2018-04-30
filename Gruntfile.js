module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    var password = grunt.option('password');
    var branch = grunt.option('branch');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'littlesnorrboy@gmail.com',
                password: password,
                branch: branch || 'default',
                ptr: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        dist: 'main.js',
                        flatten: true
                    }
                ]
            }
        }
    });
}
