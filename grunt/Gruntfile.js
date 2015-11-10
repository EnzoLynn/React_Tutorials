module.exports = function(grunt) { 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jssrc: '../src/',
        jsdest: '../build/',
        csssrc: '../css/',
        lesssrc: '../less/',
        less: {
            mylessdist: {
                files: [{
                    expand: true,
                    cwd: '<%=lesssrc %>',
                    src: ['*.less'],
                    dest: '<%=csssrc %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        } ,
        copy: {
            copyfile: {
                files: [{
                    expand: true,
                    cwd: '<%=jssrc %>',
                    src: ['WebSqlHelper.js'],
                    dest: '../../websqlHelper/src/'
                }]
            },
            copyfile1: {
                files: [{
                    expand: true,
                    cwd: '<%=jsdest %>',
                    src: ['WebSqlHelper.js'],
                    dest: '../../websqlHelper/build/'
                }]
            }
        },
        watch: {
            myless: {
                files: ['<%=lesssrc %>*.less'],
                tasks: ['less:mylessdist']
            },
            copy: {
                files: ['<%= jssrc %>WebSqlHelper.js'],
                tasks: ['copy:copyfile']
            },
            copy1: {
                files: ['<%=jsdest %>WebSqlHelper.js'],
                tasks: ['copy:copyfile1']
            }
        }
        // watch: {
        //     files: ['<%= src %>*.js'],
        //     task: ['uglify']
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-copy'); 
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['less:mylessdist', 'copy', 'copy1']);
    grunt.registerTask('mylessdist', ['less:mylessdist']);  
    grunt.registerTask('copyfile', ['copy:copyfile']); 
    grunt.registerTask('copyfile1', ['copy:copyfile1']);



};
