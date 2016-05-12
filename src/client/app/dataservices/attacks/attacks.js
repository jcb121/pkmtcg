rootApp.service("cardAttacks", function ($http, $q) {
    var self = this,
		url = "http://pkm.52webdesigns.com/rest/attacks.php";

	this.get = function(){
		var deffered = $q.defer();
		this.get = $http.get(url).then(function (response) {
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
