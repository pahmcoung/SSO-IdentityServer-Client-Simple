/**
 * This class is simple wrapper class of oidc-client-js library based on my required.
 * This class help to quick config some properties usually use to connect to SSO system 
 * You can view more detail oidc-client-js library at https://github.com/IdentityModel/oidc-client-js
 * author pahmcougn 
 */

let defaultConfiguration = {
    /**
     * REQUIRED authority (string): The URL of the OIDC/OAuth2 provider.
     */
    authority: "http://aitask.net:5002",
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
    silentRequestTimeout : 10000
    
}
var userManager = undefined

/**
 * initial client info with basic configuration to identity server 
 * View more configuration properties at https://github.com/IdentityModel/oidc-client-js/wiki
 * @param clientConfiguration
 */

export function initial(clientConfiguration) {
    let config = {...defaultConfiguration,...clientConfiguration}
    userManager = new Oidc.UserManager(config);
}

/**
 * get current user's manager obkect.
 * See more oidc-client-js third party 
 * https://github.com/IdentityModel/oidc-client-js
 * @returns {undefined}
 */
export function getUserManager() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    return userManager
}

/**
 * Returns promise to trigger a silent request (via an iframe) to the authorization endpoint. The result of the promise is the authenticated User
 * @returns {Promise<T | never>}
 */
export function refreshTokenSilent() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    return userManager.signinSilent().then(function (user) {
        console.log('[refreshTokenSilent] Successfully '+user)
        return user
    }).catch(function (e) {
        console.log('[refreshTokenSilent] Failed')
        throw e
    });
}

/**
 * Returns promise to notify the parent window of response from the authorization endpoint.
 */
export function refreshTokenSilentCallback() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.signinSilentCallback().then(function () {
        console.log('[refreshTokenSilentCallback] Successfully ' + user)
    }).catch(function (e) {
        console.log('[refreshTokenSilentCallback] Failed')
    });
}

/**
 * get current user's info
 * @returns {*}
 */
export function getUser() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    return userManager.getUser()
}

/**
 * run sign in base on your configuration, if user has been login return user info
 * if user not login redirect to authorization page base on your configuration 
 * @returns {Promise<T | never>}
 */
export function signin() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    return getUser().then(function (user) {
        console.log('[signin] Successfully ' + user)
        if (!user){
            signinRedirect()
        }
        return user
    }).catch(function (ex) {
        console.log('[signin] Failed')
        throw ex
    });
}

/**
 * Returns promise to trigger a silent request (via an iframe) to the authorization endpoint. The result of the promise is the authenticated User
 */
export function signinRedirect() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.signinRedirect()
}

/**
 * Returns promise to process response from the authorization endpoint. The result of the promise is the authenticated User.
 * @returns {Promise<T | never>}
 */
export function signinRedirectCallback() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    return userManager.signinRedirectCallback().then(function (user) {
        console.log('[signinRedirectCallback] Successfully ' + user)
        return user
    }).catch(function (e) {
        console.log('[signinRedirectCallback] Failed')
        throw e
    });
}

/**
 * remove user info from storage
 */
export function removeUserInfo() {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.removeUser();
}

/**
 * remove user info from storage and redirect to sign in page
 */
export function logout() {
    removeUserInfo()
    signinRedirect()
}

/**
 * add callback to notify access token expiring
 * @param cb
 */
export function addAccessTokenExpiringCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.addAccessTokenExpiring(cb)
}

/**
 * remove callback to notify access token expiring
 * @param cb
 */
export function removeAccessTokenExpiringCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.removeAccessTokenExpiring(cb)
}

/**
 * add callback to notify access token expired
 * @param cb
 */
export function addAccessTokenExpiredCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.addAccessTokenExpired(cb)
}

/**
 * remove callback to notify access token expired
 * @param cb
 */

export function removeAccessTokenExpiredCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.removeAccessTokenExpired(cb)
}

/**
 * add an call that has detect refresh token error
 * @param cb
 */
export function addRefreshTokenErrorCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.addSilentRenewError(cb)
}

/**
 * remove an call that has detect refresh token error
 * @param cb
 */
export function removeRefreshTokenErrorCallback(cb) {
    if (!userManager){
        throw "You must call initial() method with a configuration first"
    }
    userManager.removeSilentRenewError(cb)
}