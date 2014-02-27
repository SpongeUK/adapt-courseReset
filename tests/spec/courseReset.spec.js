define(['../libraries/AdaptMock.js', 'jquery', 'contextFactory'], function(AdaptMock, $, contextFactory) {

    var component = AdaptMock.createModel({ parent: '1', _component:'mcq', _isComplete: true }),
        createContext = function () {
            return contextFactory({
                'coreJS/adapt': AdaptMock.addCourse({ id: '1', _isComplete: true }, { findDescendants: [component] })
                                         .addConfig({ _courseReset: { onFail: true } })
                                         .addComponent(component)
                                         .create(),
                'jquery': $
            });
        };

    describe('A course reset extension with a failed assessment', function() {

        it('should make the course not completed', function(done) {
            var context = createContext();
            context(['coreJS/adapt', 'adapt-courseReset'], function (Adapt, plugin) {
                Adapt.trigger('assessment:complete', { isPass: false });
                expect(Adapt.course.get('_isComplete')).to.be(false);
                done();
            });
        });

        it('should make the component not completed', function(done) {
            var context = createContext();
            context(['coreJS/adapt', 'adapt-courseReset'], function (Adapt, plugin) {
                Adapt.trigger('assessment:complete', { isPass: false });
                expect(Adapt.course.setOnChildren.calledWith('_isComplete', false)).to.be(true);
                done();
            });
        });

    });

});