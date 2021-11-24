'use strict';

// 「回答を見る」ボタンを押すと、#theme-area,#answer-areaに.open-answerを追加
function openAnswer(idNumber){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.add("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.add("open-answer");

	// 回答ルームにお題を表示
	document.getElementById("re-theme").textContent = document.getElementById(idNumber + '-content').textContent;


}
// アイコンを押すと、#theme-area,#answer-areaから.open-answerを削除
function closeAnswer(){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.remove("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.remove("open-answer");
}
