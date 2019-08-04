import  * as SSOController from "./sso-client-controller.js";
// userManager.signinSilentCallback().then(function (user) {
//     console.log('Refresh token successfully' + user)
// }).catch(function (e) {
//     console.log('An error when refresh token')
// });
SSOController.initial()
SSOController.refreshTokenSilentCallback();