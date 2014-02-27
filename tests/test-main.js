var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\//.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    baseUrl: '/base/js',
    paths: {
        jquery: '../tests/libraries/jquery-min',
        underscore: '../tests/libraries/underscore-min',
        backbone: '../tests/libraries/backbone-min',
        /*
        modernizr: 'core/js/libraries/modernizr',
        handlebars: 'core/js/libraries/handlebars',
        imageReady: 'core/js/libraries/imageReady',
        inview: 'core/js/libraries/inview',
        scrollTo: 'core/js/libraries/scrollTo',
        coreJS: 'core/js',
        coreViews: 'core/js/views',
        coreModels: 'core/js/models',
        coreCollections: 'core/js/collections',
        coreHelpers: 'core/js/helpers',
        templates: 'templates/templates',
        */
        plugin: '..',
        spec: '../tests/spec',
        sinon: '../tests/libraries/sinon',
        contextFactory: '../tests/libraries/contextFactory'
    },
    shim: {
        jquery: [],
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});
