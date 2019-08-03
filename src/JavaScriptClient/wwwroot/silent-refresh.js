import userManager from "./configuration.js";
console.log('silent refresh token')
userManager.signinSilentCallback().then(function (user) {
    console.log('Refresh token successfully' + user)
}).catch(function (e) {
    console.log('An error when refresh token')
});