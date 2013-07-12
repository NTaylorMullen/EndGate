module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        typescript: {
            base: {
                src: ['EndGate.Core.JS/**/*.ts'],
                dest: 'EndGate.Core.JS/scripts/endgate.js',
                options: {
                    target: 'ES5',
                    module: 'amd',
                    comments: false,
                    declaration: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true ,cwd: 'EndGate.Core.JS/scripts/', src: ['endgate.js','endgate.d.ts'], dest: 'tests/EndGate.Core.JS.Tests/Scripts/', filter: 'isFile' }
                ]
            }
        },
        qunit: {
            all: ['tests/EndGate.Core.JS.Tests/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('compile', ['typescript', 'copy']);
    grunt.registerTask('test', ['typescript', 'copy','qunit']);
};