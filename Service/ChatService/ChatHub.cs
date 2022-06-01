using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo.Service.SignalRService
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ChatHub(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
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
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}