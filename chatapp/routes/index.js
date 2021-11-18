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
    console.log('ユーザ名：' + request.body.userName);
    let databaseData = new Object();
    databaseData.userName = request.body.userName;
    const db = new sqlite3.Database("./ogiri.db");
    db.serialize(() => {
        //お題テーブルの作成
            db.run("create table if not exists themes (\
            id integer primary key autoincrement, \
            name text, \
            content text, \
            created_at text default current_timestamp)");

        //回答テーブルの作成
            db.run("create table if not exists answers(\
            id integer primary key autoincrement, \
            name text, \
            content text, \
            theme_id integer, \
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
            databaseData.themes = themes;
        });

        // データベースから過去のコメントを取得
        db.all("select * from comments order by created_at", (error, comments) => {
            if(error) {
                console.error('Error!', error);
                return;
            }
            databaseData.comments = comments;
        });

        // データベースから過去の回答を取得
        db.all("select * from answers order by created_at", (error, answers) => {
            if(error) {
                console.error('Error!', error);
                return;
            }
            databaseData.answers = answers;
            console.log(databaseData);
            response.render('room', databaseData);
        });
    });
});

module.exports = router;