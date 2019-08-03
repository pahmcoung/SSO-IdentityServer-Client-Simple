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

export default userManager;