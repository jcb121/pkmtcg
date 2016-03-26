rootApp.service("cardAbilities", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = function( callback ){
      $http.get("http://pkm.52webdesigns.com/rest/abilities.php").then(function (response) {
          if( angular.isFunction(callback)){
            callback(response);
          }
          self.data = response.data;
          self.data.forEach(function (row) {
              self.info.push(row.name);
          });
      });
    };

    this.get();
});
