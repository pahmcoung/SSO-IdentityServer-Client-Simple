
// userManager.signinSilentCallback().then(function (user) {
//     console.log('Refresh token successfully' + user)
// }).catch(function (e) {
//     console.log('An error when refresh token')
// });

new SSOClient().refreshTokenSilentCallback();