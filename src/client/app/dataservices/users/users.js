rootApp.service('users', function($http, $q, $cookies){
	var self = this;
	var session = $cookies.get('serverSession');
	this.user_id = $cookies.get('user_id');

	this.login = function(user){
		var url = "http://celtco.net/pkmtcg/rest/user/login.php?";
		var deffered = $q.defer();
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				self.setSession(response.data.session, response.data.user_id );
				deffered.resolve(response.data);
			}
			else{
				deffered.reject(response.data);
			}
		});
		return deffered.promise;
	};

	this.register = function(user){
		var url = "http://celtco.net/pkmtcg/rest/user/create.php?";
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
		var url = "http://celtco.net/pkmtcg/rest/user/logout.php?";
		var deffered = $q.defer();
		var user = {
			session:session
		};
		$http.post(url, user).then(function (response) {
			if(response.data.success){
				self.setSession(false);
				deffered.resolve(response.data);
			}
			else{
				deffered.reject(response.data);
			}
		});
		return deffered.promise;
	};

	this.checkSession = function(){
		var url = "http://celtco.net/pkmtcg/rest/user/check.php?";
		var deffered = $q.defer();
		var user = {
			session:getSession
		};
		$http.post(url, user).then(function (response) {
			if(!response.data.success){
				self.setSession(false);
			}
			deffered.resolve(response.data);
		});
		return deffered.promise;
	};

	this.setSession = function(_session, id){
		if(!_session){
			session = undefined;
			this.id = undefined;
			$cookies.remove('serverSession');
			$cookies.remove('user_id');

		}else{
			session = _session;
			this.id = id;
			$cookies.put('serverSession', _session);
			$cookies.put('user_id', id);
		}
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
