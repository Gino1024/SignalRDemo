using SignalRDemo.Service.SignalRService;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(
//         builder =>
//         {
//             builder.WithOrigins("*")
//                 .AllowAnyHeader()
//                 .WithMethods("GET", "POST")
//                 .AllowCredentials();
//         });
// });

builder.Services.AddRazorPages();
builder.Services.AddSignalR().AddStackExchangeRedis("172.19.0.2:6379");
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapHub<ChatHub>("/chatHub");

app.MapControllers();


app.Run();