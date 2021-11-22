'use strict';
const socket = io.connect();
const count = 0;
// 投稿メッセージをサーバに送信する
function publish(field) {
    // 隠しinputタグのvalueに一意な文字列を設定
    document.getElementById( "uniqueID" ).value = getUniqueStr();
    // 投稿日時を取得する
    let nowDate = getNow();
    // 入力されたメッセージを取得
    let message = $('.' + field + '-message #message').val();

    if (message.trim()){
        const date = nowDate;
        if (field === "comment2chat"){
            let answer = document.getElementById("answer");
            let answer_name = document.getElementById("answer_name");
            let theme = document.getElementByName("re-theme");
            console.log(message);
            message += date + '<br>' + theme.innerHTML + '<br>' + answer.innerHTML + '<br>' + answer_name.innerHTML;
            console.log(message);
            // 投稿内容を送信
            socket.emit('sendMessageEvent', message, field);
        }else if (field === "theme"){
            socket.emit('sendMessageEvent', message, field);
        }else{
            socket.emit('sendMessageEvent', message + date, field);
        }
    }
    // データベースに保存
    const $form = $('#' + field + 'Form');
    $form.submit();
    $form[0].reset();
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data, field) {
    // ユーザ名を取得
    const userName = $('#userName').val();
    if (field == 'comment2chat'){
        $('.chat-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
    }else if (field == 'chat'){
        $('.chat-thread #thread').prepend('<p>' + userName + 'さん：' + data.replace('\n', '<br>') + '</p>');
    }else if (field == 'theme'){
        // ID用に一意な文字列を取得
        const uniqueID = $('#uniqueID').val();
        // 吹き出しを表示する
        console.log(field);
        $('.theme-threads').append('<div class="balloon1 float-left theme-thread" name="re-theme"></div>');
        $('.theme-thread').last().append('<input type="hidden" value="' + uniqueID +'" id="uniqueShowID"></input>');
        $('.theme-thread').last().append('<input type="submit" value="回答を見る" class="btn btn-secondary" onclick="openAnswer();"></input>');
        $('.theme-threads').append('<div style="margin-left: auto;">' + userName + 'さんより</div>');
        $('.theme-threads').append('<br>');
        $('.theme-thread').last().prepend('<p>' + data.replace('\n', '<br>') + '</p>');
    }
    else if (field == 'answer'){
        console.log(field);
        $('.answer-threads').append('<div class="balloon3 float-right answer-thread"></div>');
        $('.answer-thread').last().append('<input type="button" value="コメント" class="btn btn-light js-modal-open" onclick="comment();">');
        $('.answer-threads').append('<div style="margin-left: auto;">' + userName + 'さんより</div>');
        $('.answer-threads').append('<br>');
        $('.answer-thread').last().prepend('<p>' + data.replace('\n', '<br>') + '</p>');
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

$('#close').on('click',function(){
    $('.js-modal').fadeOut();
    return false;
});
// 一意な文字列を取得
function getUniqueStr(){
    return new Date().getTime().toString(16)  + Math.floor(1000*Math.random()).toString(16)
}