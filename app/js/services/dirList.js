'use strict';

directoryApp.factory('dirList', function ($http,$q) {
    return {
        getDir: function (responseCall) {
            $http.get("app/data/directory/directory.json").success(
                function(data) {
                    responseCall(data);
                }
            )
        }
    }
});