rootApp.service("cardAttacks", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = function(callback){
      this.get = $http.get("http://pkm.52webdesigns.com/rest/attacks.php").then(function (response) {

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
