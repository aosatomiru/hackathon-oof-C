'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterEvent', function (data) {
       socket.broadcast.emit('enterEvent',data);
    });
};