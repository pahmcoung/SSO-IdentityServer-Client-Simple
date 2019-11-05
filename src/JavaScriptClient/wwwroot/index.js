/// <reference path="oidc-client.js" />

var ssoClient = new SSOClient()
function log() {
    document.getElementById('results').innerText = '';
    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        } else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("api").addEventListener("click", api, false);
document.getElementById("logout").addEventListener("click", logout, false);

function login() {
    ssoClient.signin().then(function (user) {
        if (user) {
            log("User logged in", user.profile);
        } else {
            log("User not logged in");
        }
    })
    ssoClient.addUserSignedOut(function() {
        ssoClient.removeUserInfo()
        console.log('User is logouted')
        log('User is logouted')
        //
        ssoClient.signin().then(function (user) {
            if (user) {
                log("User logged in", user.profile);
            } else {
                log("User not logged in");
            }
        })
    })
}

function getUserInfo() {
    ssoClient.getUser().then(function (user) {
    }).catch(function (reason) {
        console.log('test')
    })
}

function api() {
    ssoClient.getUser().then(function (user) {
        var url = "http://localhost:5001/identity";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            // log(xhr.status, JSON.parse(xhr.responseText));
            if (xhr.status === 401) {
                refreshTokenSilent()
            } else {
                log(xhr.status, JSON.parse(xhr.responseText));
            }

        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function refreshTokenSilent() {
    // userManager.signinSilent().then(function (user) {
    //         console.log('Refresh token successfully'+user)
    //     }).catch(function (e) {
    //         console.log('An error when refresh token')
    //         removeUserInfo()
    //         login()
    //     });
    ssoClient.refreshTokenSilent().then().catch(function(error) {
        removeUserInfo()
        login()
    });
}

/**
 * remove user info from
 */
function removeUserInfo() {
    ssoClient.removeUserInfo();
}

function logout() {
    ssoClient.refreshTokenSilent().then(function (user) {
        ssoClient.logout();
    }).catch(function(error) {
        removeUserInfo()
        login()
    });
}