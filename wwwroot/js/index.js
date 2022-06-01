import { Guest } from './model.js';

//data
let guest = new Guest();
let tmpGuest = new Guest();
let isLogin = false;
//methods
$('#login').click(()=>{
    let msg = CheckForm();

    if(msg.length > 0){
        console.log(msg);
        alert(msg);
        return;
    }

    tmpGuest.name = $('#name').val();
    guest = JSON.parse(JSON.stringify(tmpGuest));

    isLogin = true;
    ChangeLoginDisplay();
})

function CheckForm(){
    let name = $('#name').val();
    if(name.length == 0){
        return "加入失敗: 請輸入姓名!";
    }
    return "";   
}

function ChangeLoginDisplay(){
    let pannel = $('.login-background');
    console.log(pannel);
    if(isLogin){
        pannel.addClass('noDisplay');
    }else{
        pannel.removeClass('noDisplay');
    }
}