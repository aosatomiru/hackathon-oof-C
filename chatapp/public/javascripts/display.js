'use strict';

// 「回答を見る」ボタンを押すと、#theme-area,#answer-areaに.open-answerを追加
function openAnswer(idNumber){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.add("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.add("open-answer");

	// 回答ルームにお題を表示
	document.getElementById("re-theme").textContent = document.getElementById(idNumber + '-content').textContent;

	// 該当する回答のみを表示(データベースから表示する部分) ★
	let answer_children = document.getElementById("answer-thread").children;
	for (let i = 0; i < answer_children.length; i++) {
		answer_children[i].style.display ="none";
		if(answer_children[i].className == idNumber){
			answer_children[i].style.display ="block";
		}
	}
	// 該当する回答のみを表示(socketから表示する部分) ★
	let answer_new_children = document.getElementById("answer-new-thread").children;
	for (let i = 0; i < answer_new_children.length; i++) {
		answer_new_children[i].style.display ="none";
		if(answer_new_children[i].className == idNumber){
			answer_new_children[i].style.display ="block";
		}
	}

	// 回答フォームのhiddenにvalue入れる foreignKey保存するため
	document.getElementById("foreignKey").value = idNumber;



}
// アイコンを押すと、#theme-area,#answer-areaから.open-answerを削除
function closeAnswer(){
	let themeArea = document.getElementById("theme-area");
	themeArea.classList.remove("open-answer");
	let answerArea = document.getElementById("answer-area");
	answerArea.classList.remove("open-answer");
}

// 回答に番号を振る
function giveNumber(){
	$('.answer_box').each(function(j){
		$(this).attr('id','answer_box'+ (j+1));
		$(this).children('.answer_button').attr('id',(j+1))
	});
}
