module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    var password = grunt.option('password');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'littlesnorrboy@gmail.com',
                password: password,
                branch: 'default',
                ptr: false
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
            }
        }
    });
}
