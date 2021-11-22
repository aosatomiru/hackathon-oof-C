'use strict';

// 「回答を見る」ボタンを押すと、#theme-area,#answer-areaに.open-answerを追加
function openAnswer(){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.add("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.add("open-answer");
}
// アイコンを押すと、#theme-area,#answer-areaから.open-answerを削除
function closeAnswer(){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.remove("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.remove("open-answer");
}