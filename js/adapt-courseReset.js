/*
* adapt-component
* License - http://github.com/SpongeUK/adapt_framework/LICENSE
* Maintainers - Chris Jones <chris.jones@spongeuk.com>
*/

define(["coreJS/adapt", "jquery"], function (Adapt, $) {
    Adapt.on('course:reset', function () {
        Adapt.course.setOnChildren('_isComplete', false);
        Adapt.course.set('_isComplete', false);
    });
    
    Adapt.on('assessment:complete', function (event) {
        if(Adapt.config.get('_courseReset') && Adapt.config.get('_courseReset').onFail && !event.isPass) {
            Adapt.trigger('course:reset');    
        }
    });
});