import { Guest } from './model.js';
import '../lib/signalr/signalr.min.js';



//data
let guest = new Guest();
let tmpGuest = new Guest();
let isLogin = false;
let connection = {};

//methods
$('#login').click(() => {
    let msg = CheckForm();
    if (msg.length > 0) {
        console.log(msg);
        alert(msg);
        return;
    }

    tmpGuest.name = $('#name').val();
    guest = JSON.parse(JSON.stringify(tmpGuest));

    isLogin = true;
    ChangeLoginDisplay();
    init();
})

function CheckForm() {
    let name = $('#name').val();
    if (name.length == 0) {
        return "加入失敗: 請輸入姓名!";
    }
    return "";
}

function ChangeLoginDisplay() {
    let loginWrapper = $('.login-wrapper');
    let chatroomWrapper = $('.chatroom-wrapper');

    if (isLogin) {
        loginWrapper.addClass('noDisplay');
        chatroomWrapper.removeClass('noDisplay');
    } else {
        loginWrapper.removeClass('noDisplay');
        chatroomWrapper.addClass('noDisplay');
    }
}

async function init() {
    SignalRCreate();
    await start();
    ConenctionStateBuild();
}
/* SignalR */

// 建立SignalR連接

function SignalRCreate() {

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`/chatHub?name=${guest.name}`)
        .build();
}

async function start() {
    try {
        await connection.start()
            .then(function () {
                // 連接成功後要做的事情
                console.log("connected");
            })
            .catch(function (err) {
                // 錯誤處理
                console.log("connect fail: " + err);
            });
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

function ConenctionStateBuild() {
    // 傳送訊息事件
    console.log(connection);
    connection.on("ReceiveMessage", function (user, message) {
        if (user === guest.name) {
            return;
        }
        var msg = message;
        var template = `<div class='row'>
                            <div class="chat">               
                                <div class="content flex-start">
                                    <div class="profile-photo">
                                    <img src="./assert/img/pika.jpg"> 
                                    </div>
                                    <div class="other-word">
                                        ${msg}
                                    </div>
                                    <div class="send-time left">
                                    <span>${new Date().toLocaleString()}</span><span>${user}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        $('.chatroom-canvas').append(template);
    });

    connection.on("ReceiveSystemMessage", function (user, message) {
        var template = `<div class='row'>
                            <div class="chat">               
                                <div class="content flex-center">
                                    <div class="system-word">
                                    ${new Date().toLocaleString()} ${message}
                                    </div>
                                </div>
                            </div>
                        </div>`;
        $('.chatroom-canvas').append(template);
    });

    connection.onclose(error => {
        console.log(error);
    });

}

function SendMessage() {
    var user = guest.name;
    var message = document.getElementById("msg").value;
    connection
        .invoke("SendMessage", user, message)
        .catch(function (err) {
            return console.error(err.toString());
        });

    var template = `<div class='row'>
                            <div class="chat"> 
                                <div class="content margin-top-40 flex-end">
                                    <div class="self-word ">
                                        ${message}
                                    </div>
                                    <div class="send-time right">
                                        <span>${new Date().toLocaleString()}</span><span>${user}</span>
                                    </div> 
                                </div>
                            </div>
                        <div> `;

    $('.chatroom-canvas').append(template);
    $('#msg').val('');
}

// Button事件
document
    .getElementById("send")
    .addEventListener("click", function (event) {
        SendMessage();
        event.preventDefault();

    });

$("#msg").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        SendMessage();
    }
});


