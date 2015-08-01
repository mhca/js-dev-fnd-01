/**
 * Created by Heimy on 7/29/2015.
 */
// agileFantApp.js
var authorization = '';
var authorized = false;

var agileFant = {
    authorize: function(){
        authorization = 'Basic aGVpbXkuY3J1ekBnbWFpbC5jb206TWFyaWVsYTEyMyQ=';
        authorized = true;
    },

    isAuthorized: function(){
        return authorized;
    },
    getAuthorization: function(){
        return authorization;
    },
    revokeAuthorization: function(){
        authorized = false;
    }
};
