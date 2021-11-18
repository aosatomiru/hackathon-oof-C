'use strict';

// データベースから過去のコメントを取得する
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./ogiri.db");

db.serialize(() => {
	db.all("select * from comments", (error, comments) => {
		if(error) {
			console.error('Error!', error);
			return;
		}
		console.log(comments);
		return comments;
        // コメント全件を配列で返す
        // comments.nameなどで値を取り出せる
	});
});

db.close();

const socket = io.connect();

// 投稿メッセージをサーバに送信する
function publish() {

    // 投稿日時を取得する
    let nowDate = getNow();
    // ユーザ名を取得
    const userName = $('#userName').text();
    // 入力されたメッセージを取得
    const message = $('.chat-message #message').val();
    if (message.trim()){
        const date = nowDate;
        // 投稿内容を送信
        socket.emit('sendMessageEvent', message + date);
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('.chat-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
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
