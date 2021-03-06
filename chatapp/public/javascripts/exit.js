'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    socket.emit('exitEvent',userName+'さんが退室しました。');
    // 退室
    window.location.href = '/';

}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exitEvent', function (data) {
    $('.chat-thread #thread').prepend('<div  class="border-top"><br>' + data + '</div><br>');
});
