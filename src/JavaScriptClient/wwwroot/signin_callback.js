import userManager from "./configuration.js";
userManager.signinRedirectCallback().then(function () {
    window.location = "index.html";
}).catch(function (e) {
    console.error(e);
});