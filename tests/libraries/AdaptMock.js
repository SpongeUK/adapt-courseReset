define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        sinon = require('sinon') || window.sinon;

    function addCourse(course) {
        _.extend(this.stubbed.course, course);
        return this;
    }

    function addConfig(config) {
        _.extend(this.stubbed.config, config);
        return this;
    }

    function addComponent(component) {
        this.stubbed.components.push(component);
        return this;
    }

    function createModel(properties, results) {
        results = results || {};
        var AdaptModel = Backbone.Model.extend({
            initialize: sinon.stub(),
            init: sinon.stub(),
            checkReadyStatus: sinon.stub(),
            checkCompletionStatus: sinon.stub(),
            findAncestor: sinon.stub().returns(results.findAncestor || []),
            findDescendants: sinon.stub().returns(results.findDescendants  || []),
            getChildren: sinon.stub().returns(results.getChildren || []),
            getParent: sinon.stub().returns(results.getParent  || {}),
            getSiblings: sinon.stub().returns(results.getSiblings  || []),
            setOnChildren: sinon.stub()
        });

        return new AdaptModel(properties);
    }

    function createCollection(items) {
        var Collection = Backbone.Collection.extend({});
        return new Collection(items);
    }

    function create() {
        this.stubbed.course = createModel(this.stubbed.course);
        this.stubbed.components = createCollection(this.stubbed.components);
        this.stubbed.config = createModel(this.stubbed.config);
        return _.extend({}, Backbone.Events, this.stubbed);
    }

    return {
        stubbed: {
            config: {},
            course: {},
            articles: [],
            blocks: [],
            components: []
        },
        addCourse: addCourse,
        addConfig: addConfig,
        addComponent: addComponent,
        createModel: createModel,
        create: create
    };

});