'use strict';
const socket = io.connect();
const count = 0;
// 投稿メッセージをサーバに送信する
function publish(field) {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 隠しinputタグのvalueに一意な文字列を設定
    document.getElementById( "uniqueID" ).value = getUniqueStr();
    // 投稿日時を取得する
    let nowDate = getNow();
    // 入力されたメッセージを取得
    console.log(field);
    let message = $('.' + field + '-message #message').val();
    console.log(message);

    if (message.trim()){
        const date = nowDate;
        if (field === "comment2chat"){
            let answer = document.getElementById("comment_answer_content").value;
            let answer_name = document.getElementById("comment_answer_name").value;
            let theme = document.getElementById("comment_answer_theme").value;
            message +='<br>'+ date + '</div><br><div>' + theme + '</div><div>' + answer_name + 'さんより' + '</div><div>' + answer;
            //投稿内容を送信
            socket.emit('sendMessageEvent', message, field,userName);
        }else if (field === "theme"){
            const uniqueID = $('#uniqueID').val();
            socket.emit('sendMessageEvent', message, field, userName,uniqueID);
        }else if (field === "answer"){
            const answer_key = $('#foreignKey').val();
            socket.emit('sendMessageEvent', message, field, userName, answer_key);
        }else{
            socket.emit('sendMessageEvent', message + '<br>'+ date, field, userName);
        }
    }
    // データベースに保存
    const $form = $('#' + field + 'Form');
    $form.submit();
    $form[0].reset();
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data, field, userName, uniqueID) {
    if (field == 'comment2chat'){
        $('.chat-thread #thread').prepend('<div class="border-top"><br>' + userName + 'さん：' + data.replace('\n', '<br>') + '</div><br>');
        $('.js-modal').fadeOut();
    }else if (field == 'chat'){
        $('.chat-thread #thread').prepend('<div class="border-top"><br>' + userName + 'さん：' + data.replace('\n', '<br>') + '</div><br>');
    }else if (field == 'theme'){
        // 吹き出しを表示する
        console.log(field);
        $('.theme-threads').append('<div class="my-1 balloon1 float-left theme-thread" name="re-theme"></div>');
        $('.theme-thread').last().append('<div class="text-center"><input type="submit" id=' + uniqueID + ' value="回答を見る" class="btn btn-secondary" onclick="openAnswer(this.id);"></input></div>');
        $('.theme-thread').last().prepend('<div class="small text-secondary" style="margin-left: auto;">' + userName + 'さんより</div><div id=' + uniqueID + '-content>' + data.replace('\n', '<br>') + '</div>');

    }else if (field == 'answer'){
        $('.answer-threads').append('<div class="' + uniqueID +'"></div>');
        $('.answer-threads div:last').append('<div class="answer_box balloon3 my-1 float-right answer-thread"></div>');
        $('.' + uniqueID + ':last div:last').append('<div class="text-center"><input type="button" value="コメント" class="answer_button btn btn-light js-modal-open" onclick="giveNumber(); comment(this.id);"></input></div>');
        $('.' + uniqueID +':last div:first()').prepend('<div class="small text-secondary answer_name" style="margin-left: auto;">' + userName + 'さんより</div><div class="answer_content">' + data.replace('\n', '<br>') + '</div>');

        console.log($('#foreignKey').val());
        console.log(uniqueID);
        if(uniqueID !== $('#foreignKey').val()){
            $('.' + uniqueID).css('display', 'none');
        }
    }

    $('.' + field + '-message #message').val("");
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

function comment(commentID){
    $('.js-modal').fadeIn();
    console.log($('#answer_box' + commentID).children('.answer_name').text().slice(0, -4));
    $('#comment_answer_name').val($('#answer_box' + commentID).children('.answer_name').text().slice(0, -4));
    $('#comment_answer_content').val($('#answer_box' + commentID).children('.answer_content').text());
    console.log($('#re-theme').text());
    $('#comment_answer_theme').val($('#re-theme').text());
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