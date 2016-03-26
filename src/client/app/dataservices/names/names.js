rootApp.service("cardNames", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = function(callback){
      this.get = $http.get("http://pkm.52webdesigns.com/rest/names.php").then(function (response) {
          self.data = response.data;
          response.data.forEach(function (row) {
              self.info.push(row.name);
          });
          if( angular.isFunction(callback) ){
            callback(response);
          }
      });
    };
    this.get();
});
