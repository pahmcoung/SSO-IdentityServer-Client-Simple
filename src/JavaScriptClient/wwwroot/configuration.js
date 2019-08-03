/// <reference path="oidc-client.js" />
// import { WebStorageStateStore } from './oidc-client.js'
var configuration = {
    authority: "http://localhost.net:5002",
    client_id: "client_tester",
    redirect_uri: "http://localhost:3000/signin_callback.html",
    response_type: "id_token token",
    scope:"openid profile email offline_access client_test_api_scope",
    silent_redirect_uri: 'http://localhost:3000/silent-refresh.html',
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
}
var userManager = new Oidc.UserManager(configuration);

export function getUserManager() {
    return userManager
}

export function refreshTokenSilent() {
    return userManager.signinSilent().then(function (user) {
        console.log('[refreshTokenSilent] Successfully '+user)
        return user
    }).catch(function (e) {
        console.log('[refreshTokenSilent] Failed')
        throw e
    });
}

export function refreshTokenSilentCallback() {
    userManager.signinSilentCallback().then(function () {
        console.log('[refreshTokenSilentCallback] Successfully ' + user)
    }).catch(function (e) {
        console.log('[refreshTokenSilentCallback] Failed')
    });
}

export function getUser() {
    return userManager.getUser()
}

export function signin() {
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

export function signinRedirect() {
    userManager.signinRedirect()
}

export function signinRedirectCallback() {
    return userManager.signinRedirectCallback().then(function (user) {
        console.log('[signinRedirectCallback] Successfully ' + user)
        return user
    }).catch(function (e) {
        console.log('[signinRedirectCallback] Failed')
        throw e
    });
}

/**
 * remove user info from
 */
export function removeUserInfo() {
    userManager.removeUser();
}

export function logout() {
    removeUserInfo()
    signinRedirect()
}