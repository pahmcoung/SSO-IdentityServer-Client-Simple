
// userManager.signinRedirectCallback().then(function () {
//     window.location = "index.html";
// }).catch(function (e) {
//     console.error(e);
// });
new SSOClient().signinRedirectCallback().then(function () {
    window.location = "index.html";
}).catch(function (e) {
    console.error("error");
});