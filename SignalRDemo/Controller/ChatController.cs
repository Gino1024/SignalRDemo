using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Service.SignalRService;

namespace CoreWeb.Controllers
{
    [Route("[controller]")]
    public class ChatController : Controller
    {
        public ChatController()
        {

        }

        [HttpGet]
        public string Get()
        {
            return "helloworld";
        }
    }
}