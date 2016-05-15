rootApp.service('users', function($http, $q, serverSession, $cookies){
	var self = this;


	this.login = function(user){
		var url = "http://pkm.52webdesigns.com/rest/user/login.php?";
		var deffered = $q.defer();
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				serverSession(response.data.session);
				$cookies.put('serverSession', response.data.session);
				deffered.resolve(response.data);
			}
			else{
				deffered.reject(response.data);
			}
		});
		return deffered.promise;
	};

	this.register = function(user){
		var url = "http://pkm.52webdesigns.com/rest/user/create.php?";
		var deffered = $q.defer();
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				deffered.resolve(response.data);
			}
			else{
				deffered.reject(response.data);
			}
		});
		return deffered.promise;
	};

	/*this.get = function(){
		var deffered = $q.defer();
		$http.get(url).then(function (response) {
			deffered.resolve(response.data);
		});
		return deffered.promise;
	};*/

	/*this.create = function(){

	};*/

	/*this.delete = function(){

	};*/

	/*this.edit = function(){

	};*/
});
