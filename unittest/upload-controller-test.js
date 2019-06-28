describe('Testing UploadController', function() {
    var scope, uploadController, uploadService, uploadConstant, uploadFactory, Q;

    beforeEach(module('myApp.upload'));
    beforeEach(inject(function($rootScope, $controller, $q, $timeout) {
        scope = $rootScope.$new();

        Q = $q;

        //mock constant
        uploadConstant = {

        };
        //mock service
        uploadService = {
            upload: function() {}
        };

        uploadController = $controller('uploadController', {
            '$scope': scope,
            'uploadService': uploadService,
            'uploadFactory': uploadFactory,
            'uploadConstant': uploadConstant
        });

    }));

    it('Check UploadController is intialization', function() {
        expect(uploadController).toBeDefined();
    });

    it('Check vm.result is intialization', function() {
        expect(uploadController.result).toBeDefined();
    });

    it('Service upload method should not be called on passing empty array, controller should validate', function() {
        spyOn(uploadService, 'upload');
        uploadController.uploadFiles([]);
        expect(uploadService.upload).not.toHaveBeenCalled();
    });

    it('Service upload method should be called', function() {
        spyOn(uploadService, 'upload').and.callFake(function() { //replace with a fake function
            var deferred = Q.defer(); //assume that you already inject $q service in beforeEach and save it as a variable.
            return deferred.promise; //returns a fake promise
        });
        uploadController.uploadFiles(['file1']);
        expect(uploadService.upload).toHaveBeenCalled();
    });
});
