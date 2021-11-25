'use strict';

// メモを画面上に表示する
function memo(field) {
    // 投稿日時を取得する
    let nowDate = getNow();
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    console.log(field);
    let message = $('.' + field + '-message #message').val();
    console.log(message);

    if (message.trim()){
        const date = nowDate;
        // メモの内容を表示
        if (field === "comment2chat"){
            let answer = document.getElementById("comment_answer_content").value;
            let answer_name = document.getElementById("comment_answer_name").value;
            let theme = document.getElementById("comment_answer_theme").value;
            message += date + '<br>' + theme + '<br>' + answer_name + 'さんより' + '<br>' + answer;
        }
        $('.chat-thread #thread').prepend('<p>' + userName + 'さんのメモ：' + message + date + '</p>');
        $('.js-modal').fadeOut();
        $('.' + field + '-message #message').val() = "";
    }

    return false;
}

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
