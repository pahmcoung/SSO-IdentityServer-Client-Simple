'use strict';
function SSOClient() {
    var defaultConfig = {
        /**
         * REQUIRED authority (string): The URL of the OIDC/OAuth2 provider.
         */
        authority: "http://localhost.net:5002",
        /**
         * REQUIRED client_id (string): Your client application's identifier as registered with the OIDC/OAuth2 provider.
         */
        client_id: "client_tester",
        /**
         * REQUIRED redirect_uri (string): The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
         */
        redirect_uri: "http://localhost:3000/signin_callback.html",
        /**
         * REQUIRED
         * response_type (string, default: 'id_token'): The type of response desired from the OIDC/OAuth2 provider.
         * id_token is identity token
         * token is access token
         *
         */
        response_type: "id_token token",
        /**
         * REQUIRED
         * scope (string, default: 'openid'): The scope being requested from the OIDC/OAuth2 provider.
         */
        scope:"openid profile email offline_access client_test_api_scope",
        /**
         * silent_redirect_uri (string): The URL for the page containing the code handling the refresh an new access token
         */
        silent_redirect_uri: 'http://localhost:3000/silent-refresh.html',
        /**
         * Storage object used to persist User for currently authenticated user
         */
        userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),

        /**
         * boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
         * The attempt is made as a result of the accessTokenExpiring event being raised.
         */
        automaticSilentRenew: false,
        /**
         * silentRequestTimeout (number, default: 10000): Number of milliseconds to wait for the silent renew to return before assuming it has failed or timed out.
         */
        silentRequestTimeout : 10000,
        client_secret : 'K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols='
        // post_logout_redirect_uri : "http://localhost:3000/index.html"
    }
    this.userManager = new Oidc.UserManager(defaultConfig);
}

SSOClient.prototype.getUserManager = function () {
    return this.userManager
}

SSOClient.prototype.refreshTokenSilent = function () {
    return this.userManager.signinSilent().then(function (user) {
        console.log('[refreshTokenSilent] Successfully '+user)
        return user
    }).catch(function (e) {
        console.log('[refreshTokenSilent] Failed')
        throw e
    });
}

SSOClient.prototype.refreshTokenSilentCallback = function () {
    this.userManager.signinSilentCallback().then(function () {
        console.log('[refreshTokenSilentCallback] Successfully ' + user)
    }).catch(function (e) {
        console.log('[refreshTokenSilentCallback] Failed')
    });
}

SSOClient.prototype.getUser = function () {
    return this.userManager.getUser()
}

SSOClient.prototype.signin = function () {
    var _self = this
    return this.getUser().then(function (user) {
        console.log('[signin] Successfully ' + user)
        if (!user){
            _self.signinRedirect()
        }
        return user
    }).catch(function (ex) {
        console.log('[signin] Failed')
        throw ex
    });
}

SSOClient.prototype.signinRedirect = function () {
    return this.userManager.signinRedirect()
}

SSOClient.prototype.logout = function () {
    return this.userManager.signoutRedirect();
}

SSOClient.prototype.signinRedirectCallback = function () {
    return this.userManager.signinRedirectCallback().then(function (user) {
        console.log('[signinRedirectCallback] Successfully ' + user)
        return user
    }).catch(function (e) {
        console.log('[signinRedirectCallback] Failed')
        throw e
    });
}

SSOClient.prototype.removeUserInfo = function () {
    this.userManager.removeUser();
}

SSOClient.prototype.addAccessTokenExpiringCallback = function (cb) {
    this.userManager.addAccessTokenExpiring(cb)
}

SSOClient.prototype.removeAccessTokenExpiringCallback = function (cb) {
    this.userManager.removeAccessTokenExpiring(cb)
}

SSOClient.prototype.addAccessTokenExpiredCallback = function (cb) {
    this.userManager.addAccessTokenExpired(cb)
}

SSOClient.prototype.removeAccessTokenExpiredCallback = function (cb) {
    this.userManager.removeAccessTokenExpired(cb)
}

SSOClient.prototype.addRefreshTokenErrorCallback = function (cb) {
    this.userManager.addSilentRenewError(cb)
}

SSOClient.prototype.removeRefreshTokenErrorCallback = function (cb) {
    this.userManager.removeSilentRenewError(cb)
}


