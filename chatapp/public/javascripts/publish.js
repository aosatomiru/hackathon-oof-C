'use strict';
const socket = io.connect();
// 投稿メッセージをサーバに送信する
function publish(field) {

    // 投稿日時を取得する
    let nowDate = getNow();
    // 入力されたメッセージを取得
    let message = $('.' + field + '-message #message').val();

    if (message.trim()){
        const date = nowDate;
        if (field === "comment2chat"){
            let answer = document.getElementById("answer");
            let answer_name = document.getElementById("answer_name");
            let theme = document.getElementById("re-theme");

            message += date + '<br>' + theme.innerHTML + '<br>' + answer.innerHTML + '<br>' + answer_name.innerHTML;
            // 投稿内容を送信
            socket.emit('sendMessageEvent', message, field);
        }else{
            socket.emit('sendMessageEvent', message + date, field);
            saveData();
        }
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data, field) {
    // ユーザ名を取得
    const userName = $('#userName').val();
    if (field == 'comment2chat'){
        $('.chat-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
    }else{
        $('.' + field + '-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
    }
});

function getNow(){
    // 投稿日時を取得する
    let now = new Date();
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Day = now.getDate();
    let Hour = now.getHours();
    let Min = now.getMinutes();
    let Sec = now.getSeconds();
    return  Year + "-" + Month + "-" + Day + " " + Hour + ":" + Min + ":" + Sec;
}

function comment(){
    // console.log(msg);
    $('.js-modal').fadeIn();
    return false;
}

function close(){
    $('.js-modal').fadeOut();
    return false;
}
