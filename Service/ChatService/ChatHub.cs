using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Models;

namespace SignalRDemo.Service.SignalRService
{
    public class ChatHub : Hub<IChatClient>
    {
        private static Dictionary<string, string> _connections =
            new Dictionary<string, string>();
        public ChatHub(IHttpContextAccessor httpContextAccessor)
        {

        }
        //改變methodName方式
        [HubMethodName("SendMessageToUser")]
        public async Task DirectMessage(string user, string message)
            => await Clients.All.ReceiveMessage(user, message);
        public async Task SendMessage(string user, string message)
            => await Clients.All.ReceiveMessage(user, message);
        public async Task SendMessageToCaller(string user, string message)
            => await Clients.Caller.ReceiveMessage(user, message);

        public async Task SendMessageToGroup(string user, string message)
            => await Clients.Group("SignalR Users").ReceiveMessage(user, message);

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
            var httpCtx = Context.GetHttpContext();
            var user = httpCtx.Request.Query["name"];
            await Clients.All.ReceiveSystemMessage("system", $"{user}已加入");
            _connections.Add(Context.ConnectionId, user);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
            if (_connections[Context.ConnectionId] != null)
            {
                await Clients.All.ReceiveSystemMessage("system", $"{_connections[Context.ConnectionId]}已離開");
                _connections.Remove(Context.ConnectionId);
            }
        }
    }
}