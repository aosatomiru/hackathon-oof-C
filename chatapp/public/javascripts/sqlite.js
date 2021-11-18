const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db");

db.serialize(() => {
	//お題テーブルの作成
    db.run("drop table if exists themes");
    db.run("create table if not exists themes (\
		id integer themes, \
		name text, \
		content text, \
		created_at text default current_timestamp)");
});
db.serialize(() => {
	//回答テーブルの作成
    db.run("drop table if exists answers");
	db.run("create table if not exists answers(\
		id integer themes, \
		name text, \
		content text, \
		foreign key (theme_id) references themes(id), \
		created_at text default current_timestamp)");
});
db.serialize(() => {
	//コメントテーブルの作成
    db.run("drop table if exists comments");
	db.run("create table if not exists comments(\
		id, \
		name, \
		content, \
		answer_name, \
		answer_content, \
		created_at text default current_timestamp)");
});

db.close();