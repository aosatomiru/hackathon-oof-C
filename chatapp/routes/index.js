'use strict';
const express = require('express');
const router = express.Router();

const sqlite3 = require("sqlite3");

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    // データベースに接続
    const db = new sqlite3.Database("./ogiri.db");
    // ユーザーネームを取得
    let getUserName = request.body.userName;

    if(request.body.commentText){ // コメント投稿ボタンが押されたときの処理
        // 入力されたメッセージを取得
        const message = request.body.commentText;
        // 入力されたメッセージが空やスペースのみでないとき
        if (message.trim()){
            db.serialize(() => {
                // データベースに名前。投稿内容、日時を登録
                db.run("insert into comments(name, content) values(?,?)",getUserName, message);
                console.log("保存完了！");
            });
        }
        // room.hbsをデータとともに表示させる
    }else if(request.body.comment2chatText){ // 引用コメント投稿ボタンが押されたときの処理
        // 入力されたメッセージを取得
        const message = request.body.comment2chatText;
        // 入力されたメッセージが空やスペースのみでないとき
        if (message.trim()){
            db.serialize(() => {
                // データベースに名前。投稿内容、日時を登録
                db.run("insert into comments(name, content) values(?,?)", getUserName, message);
                console.log("保存完了！");
            });
        }

    }else if(request.body.themeText){ // お題投稿ボタンが押されたときの処理
        // 入力されたメッセージを取得
        const message = request.body.themeText;
        const uniqueID = request.body.uniqueID;
        console.log(uniqueID);
        // 入力されたメッセージが空やスペースのみでないとき
        if (message.trim()){
            db.serialize(() => {
                // データベースに名前。投稿内容、日時を登録
                db.run("insert into themes(id, name, content) values(?,?,?)",uniqueID,getUserName, message);
                console.log("保存完了！");
            });
        }

    }else if(request.body.answerText){ // 回答投稿ボタンが押されたときの処理
        const message = request.body.answerText;
        // 入力されたメッセージが空やスペースのみでないとき
        if (message.trim()){
            db.serialize(() => {
                // データベースに名前。投稿内容、日時を登録
                db.run("insert into answers(name, content) values(?,?)",getUserName, message);
                console.log("保存完了！");
            });
        }
    }else{ // ログインしたときの処理
        // room.hbsに渡すデータを入れる配列を作成
        let databaseData = new Object();
        // ログインで入手したユーザーネームを配列に入れる
        databaseData.userName = request.body.userName;
        db.serialize(() => {
            //お題テーブルの作成
                db.run("create table if not exists themes (\
                id text primary key, \
                name text, \
                content text, \
                created_at text default current_timestamp)");

            //回答テーブルの作成
                db.run("create table if not exists answers(\
                id integer primary key autoincrement, \
                name text, \
                content text, \
                theme_id text, \
                created_at text default current_timestamp, \
                foreign key (theme_id) references themes(id))");

            //コメントテーブルの作成
            db.run("create table if not exists comments(\
                id integer primary key autoincrement, \
                name text, \
                content text, \
                answer_name text, \
                answer_theme text, \
                answer_content text, \
                created_at text default current_timestamp)");

            // データベースから過去のお題を取得
            db.all("select * from themes order by created_at", (error, themes) => {
                if(error) {
                    console.error('Error!', error);
                    return;
                }
                // 取得したお題を配列に入れる
                databaseData.themes = themes;
            });

            // データベースから過去のコメントを取得
            db.all("select * from comments order by created_at", (error, comments) => {
                if(error) {
                    console.error('Error!', error);
                    return;
                }
                // 取得したコメントを配列に入れる
                databaseData.comments = comments;
            });

            // データベースから過去の回答を取得
            db.all("select * from answers order by created_at", (error, answers) => {
                if(error) {
                    console.error('Error!', error);
                    return;
                }
                // 取得した回答を配列に入れる
                databaseData.answers = answers;
                // room.hbsをデータとともに表示させる
                response.render('room', databaseData);
            });
        });
    }
    db.close();
});

module.exports = router;