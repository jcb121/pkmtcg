var rootApp;
(function(){
  rootApp = angular.module('app', [
    //  'ngSanitize',
    //  'autocomplete',
    //  'afkl.lazyImage',
    //  'ngTouch'
  ]);
})();

rootApp.service("facebookLogin", function ($http) {

    var self = this;

    // This is called with the results from from FB.getLoginStatus().
    this.statusChangeCallback = function (response) {
        console.log('statusChangeCallback', response, this);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().

        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        }
        else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            this.status = 'Please log ' + 'into this app.';
        }
        else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            this.status = 'Please log ' + 'into Facebook.';
        }
    };

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    this.checkLoginState = function () {
        FB.getLoginStatus(function (response) {
            self.statusChangeCallback(response);
        });
    };

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.

    this.testAPI = function () {

        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name, response);
            self.status = 'Thanks for logging in, ' + response.name + '!';
        });

        console.log("testing web server");
        $http.post("http://pkm.52webdesigns.com/rest/login.php", { data: "jesse" }).then(function (response) {
            console.log("web server says", response);
        });
    };

    window.fbAsyncInit = function () {

        FB.init({
            appId: '1666001243641037',
            cookie: true,  // enable cookies to allow the server to access the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.2' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into your app or not.
        //
        // These three cases are handled in the callback function.

        //Automatically called.
        FB.getLoginStatus(function (response) {
            self.statusChangeCallback(response);
        });

    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});


rootApp.controller("masterController", function ($scope, facebookLogin) {
    $scope.facebook = facebookLogin;
});
