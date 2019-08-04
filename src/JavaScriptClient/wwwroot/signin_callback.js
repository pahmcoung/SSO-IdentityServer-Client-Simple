import * as SSOController from "./sso-client-controller.js";
// userManager.signinRedirectCallback().then(function () {
//     window.location = "index.html";
// }).catch(function (e) {
//     console.error(e);
// });
SSOController.initial()
SSOController.signinRedirectCallback().then(function () {
    window.location = "index.html";
}).catch(function (e) {
    console.error("error");
});