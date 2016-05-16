rootApp.service('users', function($http, $q, $cookies){
	var self = this;
	var session = $cookies.get('serverSession');

	this.login = function(user){
		var url = "http://pkm.52webdesigns.com/rest/user/login.php?";
		var deffered = $q.defer();
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				self.setSession(response.data.session);
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

	this.logout = function(){
		var url = "http://pkm.52webdesigns.com/rest/user/logout.php?";
		var deffered = $q.defer();
		var user = {
			session:this.getSession()
		};
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				self.session(false);
				deffered.resolve(response.data);
			}
			else{
				deffered.reject(response.data);
			}
		});
		return deffered.promise;
	};

	this.checkSession = function(){
		var url = "http://pkm.52webdesigns.com/rest/user/check.php?";
		var deffered = $q.defer();
		var user = {
			session:this.getSession()
		};
		$http.post(url, user).then(function (response) {
			if(!response.data.success){
				self.setSession(false);
			}
			deffered.resolve(response.data);
		});
		return deffered.promise;
	};

	this.setSession = function(key){
		session = key;
		$cookies.put('serverSession', key);
	};

	this.getSession = function(){
		return session;
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
