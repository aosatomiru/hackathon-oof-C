'use strict';

const socket = io.connect();

// 投稿メッセージをサーバに送信する
function publish(field) {

    // 投稿日時を取得する
    let nowDate = getNow();
    // 入力されたメッセージを取得
    const message = $('.' + field + '-message #message').val();
    console.log(message, field)
    if (message.trim()){
        const date = nowDate;
        // 投稿内容を送信
        socket.emit('sendMessageEvent', message + date, field);
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data, field) {
    // ユーザ名を取得
    const userName = $('#userName').val();
    console.log(field);
    $('.' + field + '-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
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
    return "　(" + Year + "/" + Month + "/" + Day + "/" + Hour + ":" + Min + ":" + Sec + ")";
}
