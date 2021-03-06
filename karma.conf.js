// Karma configuration
// Generated on Tue Apr 26 2016 20:07:26 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
	config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'bower_components/angular/angular.min.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-aria/angular-aria.min.js',
		'bower_components/angular-material/angular-material.min.js',
		'bower_components/angular-messages/angular-messages.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-password/angular-password.min.js',
		'bower_components/angular-cookies/angular-cookies.min.js',
		'src/client/app/main.js',
		'src/client/app/**/*.js',
		'src/client/app/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],

	// test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'src/client/app/**/!(*spec).js': ['coverage'],
		'src/client/app/**/*.html': ["ng-html2js"]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], /* 'Chrome', 'Firefox', */


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

	// optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'dist/coverage/'
  	},

	ngHtml2JsPreprocessor: {
	    // If your build process changes the path to your templates,
	    // use stripPrefix and prependPrefix to adjust it.
	    stripPrefix: "src/client/app/",
	    //prependPrefix: "components/",

    	// the name of the Angular module to create
    	moduleName: "app.templates"
	}

	});
};
