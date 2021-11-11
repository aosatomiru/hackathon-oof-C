'use strict';

// 投稿メッセージをサーバに送信する
function publish() {

    // 投稿日時を取得する
    let nowDate = getNow();
    // ユーザ名を取得
    const userName = $('#userName').text();
    // 入力されたメッセージを取得
    const message = $('#message').val() + nowDate;
    // 投稿内容を送信
    if (message.trim()){
        socket.emit('sendMessageEvent', message);
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + userName + 'さん：' + data + '</p>');
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
