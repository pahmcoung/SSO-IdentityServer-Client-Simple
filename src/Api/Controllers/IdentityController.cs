// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("identity")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        public async Task<IActionResult> Get()
        {
            var client = new HttpClient();
            String token = "";
//            var response = await client.IntrospectTokenAsync(new TokenIntrospectionRequest
//            {
//                Address = "http://localhost:1602/connect/introspect",
//                ClientId = "client_test_api_resource",
//                ClientSecret = "test",
//
//                Token = token
//            });
//            Console.WriteLine(response);
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
    }
}