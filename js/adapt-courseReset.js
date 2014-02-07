/*
* adapt-component
* License - http://github.com/SpongeUK/adapt_framework/LICENSE
* Maintainers - Chris Jones <chris.jones@spongeuk.com>
*/

define(["coreJS/adapt", "jquery"], function (Adapt, $) {
    Adapt.on('course:reset', function () {
        Adapt.course.setOnChildren('_isComplete', false);
        Adapt.course.set('_isComplete', false);
        var components = Adapt.course.findDescendants('components'),
            configuration = _.extend({}, defaultConfiguration, (Adapt.course.get('_courseReset') || {}).defaults);

            _.each(configuration, function (properties, componentType) {
                var matches = components.filter(componentTypeIs(componentType));
                _.each(matches, resetAttributes(properties));
            });
    });
    
    Adapt.on('assessment:complete', function (event) {
        if(Adapt.config.get('_courseReset') && Adapt.config.get('_courseReset').onFail && !event.isPass) {
            Adapt.trigger('course:reset');    
        }
    });

    $(document).on('click', '.course-reset-trigger', function () {
        Adapt.trigger('course:reset');
    });

    function componentTypeIs (name) {
        return function (component) {
            if(!component) return false;
            return component.get('_component') === name;
        };
    }

    function resetAttributes(config) {
        return function (component) {
            if(!component) return;
            _.each(config, function (attributeValue, attributeName) {
                component = new Model(component);

                var target = component.get(attributeName);
                if(_.isArray(target)) {
                    _.each(target, function (element) { resetAttributes(attributeValue)(element); });
                } else {
                    component.set(attributeName, attributeValue);
                }
            });
        };
    }

    function Model (obj) {
        if(obj.get && obj.set) return obj;
        this.__object__ = obj;
    }
    Model.prototype.get = function (property) {
        return this.__object__[property];
    };
    Model.prototype.set = function (property, value) {
        this.__object__[property] = value;
    };

    var defaultConfiguration = {
        'narrative': {
            '_stage': 0
        },
        'accordion': {
            'items': {
                '_isVisited':false
            }
        }
    };
});