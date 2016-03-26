rootApp.service("cardProperties", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = $http.get("http://pkm.52webdesigns.com/rest/properties.php").then(function (response) {
        self.data = response.data;
        self.info = response.data;
    });
});
