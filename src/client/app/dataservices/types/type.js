rootApp.service('types', function($http){

  this.load = function(callback){
    this.get = $http.get("http://pkm.52webdesigns.com/rest/types.php").then(function (response) {
      callback(response.data);
    });
  };
  /*
   * INIT SCRIPT
   */
  this.load(false, function (response) {
      this.data = response;
      response.forEach(function (type) {
          this.info.push(type.name);
      });
  });
});

//
rootApp.service("cardTypes", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = $http.get("http://pkm.52webdesigns.com/rest/types.php").then(function (response) {
        self.data = response.data;
        response.data.forEach(function (row) {
            self.info.push(row.name);
        });
    });
});
