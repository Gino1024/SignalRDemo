
# SignalR Demo
-----
<a href='https://ginoweng.com:8080/'>demo</a>
``` C#
    <PackageReference Include="Microsoft.AspNetCore.SignalR.Core" Version="1.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.SignalR.StackExchangeRedis" Version="6.0.5" />
 
```

--- 

###  學習 Real Time Web  , 利用SignalR功能實作聊天室
<img src="./SignalRDemo.gif" >

--- 

###  應對分散式架構使用Redis 作爲交換訊息的資料中樞
<img src="./SignalRDemoWithRedis.gif" >

---

# Localhost
## 1. 先使用docker建立redis server
```docker
docker pull redis
docker run --name redis-lab -p 6379:6379 -d redis
```
``` bash
redis-cli 
monitor //查看即時紀錄訊息
```
## 2. 移除部分程式碼
Program.cs

<span style='background:black; padding:10px;'>
builder.Services.AddSignalR()<span style='color:#fe512a'>~~.AddStackExchangeRedis("127.0.0.1:6379");~~</span>
</span>

--- 
# Docker

筆者是Docker新手,這些順序都是可以做調整或用更短的步驟去做
```C#
1. docker pull redis
2. 進到專案根目錄
3. 將根目錄下的redis.conf移到 /user/redis/ 之下 // 可以自己改compose對應的本地路徑 
4. docker build . -t singnalrdemo // 建立image
5. docker network create LabBrige02 // 建立web,redis 網路
6. docker-compose up -d

完成! 請連上 127.0.0.1:5051 ~~~ 
```
備註: 程式的program.cs 有設定Redis 的 連線字串, 若使用者的server ip不同, 需要做調整