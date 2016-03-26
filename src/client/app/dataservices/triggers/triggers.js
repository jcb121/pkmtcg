rootApp.service("cardTriggers", function ($http) {
    var self = this;
    this.data = false;
    this.info = [];

    this.get = $http.get("http://pkm.52webdesigns.com/rest/triggers.php").then(function (response) {
        self.data = response.data;
        self.data.forEach(function (row) {
            self.info.push(row.name);
        });
    });
});
