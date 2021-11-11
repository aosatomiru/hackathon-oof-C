'use strict';

// メモを画面上に表示する
function memo() {
     // 投稿日時を取得する
     let nowDate = getNow();
    // ユーザ名を取得
    const userName = $('#userName').text();
    // 入力されたメッセージを取得
    const message = $('#message').val() + nowDate;
    // メモの内容を表示
    $('#thread').prepend('<p>' + userName + 'さんのメモ：' + message + '</p>');

    return false;
}
