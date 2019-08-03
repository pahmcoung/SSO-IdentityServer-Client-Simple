import * as SSOController from "./configuration.js";
// userManager.signinRedirectCallback().then(function () {
//     window.location = "index.html";
// }).catch(function (e) {
//     console.error(e);
// });

SSOController.signinRedirectCallback().then(function () {
    window.location = "index.html";
}).catch(function (e) {
    console.error("error");
});