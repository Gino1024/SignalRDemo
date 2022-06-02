using Microsoft.AspNetCore.SignalR;
namespace SignalRDemo.Service.SignalRService
{
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);
        Task ReceiveSystemMessage(string user, string message);
    }
}