# SSO-IdentityServer-Client
This is simple project to show how an js client work with an SSO system.This project include 3 function
- User sign in to Identity Server
- User connect to an API server, this api server verify request with Identity Server
- logout from Identity Server

This project run by .NET Core framework used [oidc-client-js](https://github.com/IdentityModel/oidc-client-js) to connect Identity Server

# Project Member
1. Api: Simple Api project to verify each client's request with Identity Server
2. JavaScriptClient: A Javascript client allow user 
    - Sign in to Identity Server
    - Request to get authorize server api
    - logout from Identity Server

# Install
Go each project's folder and run command
`dotnet run`

# Configuration for you

If you want config to run in your site, you can edit some point to run 

**Api**

Edit file `Startup.js` with your configuration to Identity Server
```
services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    /*
                     * the authorization host url (Identity Server host) that verify each client's request
                     */
                    options.Authority = "";
                    options.RequireHttpsMetadata = false;
                    
                    /**
                     * api resource name check permission scope is allow or not
                     */
                    options.Audience = "";
                });
```

**JavaScriptClient**

I have created file `sso-client-controller.js` in `wwwroot folder` to controll some basic action as sign in, logout , refresh token silent.You should call `initial` method with your configuration to Identity Server before call action login, logout,refresh token.

Example:
```
SSOController.initial({
    authority: "http://local.net:5002",
    client_id: "client_tester",
    redirect_uri: "http://localhost:3000/signin_callback.html",
    response_type: "id_token token",
    scope:"openid profile email offline_access client_test_api_scope",
    silent_redirect_uri: 'http://localhost:3000/silent-refresh.html',
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
})
```
Some params that you should have 
- authority (string): The URL of the OIDC/OAuth2 provider.
- client_id (string): Your client application's identifier as registered with the OIDC/OAuth2 provider.
- redirect_uri (string): The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
- response_type (string, default: 'id_token'): The type of response desired from the OIDC/OAuth2 provider.
- scope (string, default: 'openid'): The scope being requested from the OIDC/OAuth2 provider.

Because I used [oidc-client-js](https://github.com/IdentityModel/oidc-client-js) so you can access it to see more properties can do.
