rootApp.service("cardTriggers", function ($http, $q) {
    var self = this,
		url = "http://pkm.52webdesigns.com/rest/triggers.php?";

	this.get = function(){
		var deffered = $q.defer();
		$http.get(url).then(function (response) {
			deffered.resolve(response.data);
		});
		return deffered.promise;
	};

	/*this.create = function(){

	};*/

	/*this.delete = function(){

	};*/

	/*this.edit = function(){

	};*/
});
