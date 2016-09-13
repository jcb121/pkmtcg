rootApp.service("cardNames", function ($http, $q) {
    var self = this,
		url = "http://celtco.net/pkmtcg/rest/names.php";

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
