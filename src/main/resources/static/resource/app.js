function checkEmpty(input) {
	input.value = input.value.trim();
	if (input.value.length == 0) {
		return false;
	}

	return true;
}

function encodeSHA1(value) {
	var hash = CryptoJS.SHA1(value.trim());
	var result = CryptoJS.enc.Hex.stringify(hash);

	return result;
}

function checkEmailPattern(input) {
	var pattern = /\w+@\w+\.\w+\.?\w*/;
	return pattern.test(input.value);
}

function Article__addFormSubmited(form) {
	form.title.value = form.title.value.trim();
	form.body.value = form.body.value.trim();

	if (form.title.value.length == 0) {
		alert('제목이 입력되지 않았습니다.');
		form.title.focus();

		return false;
	}

	if (form.body.value.length == 0) {
		alert('내용이 입력되지 않았습니다.');
		form.body.focus();

		return false;
	}

	$("input[type='file']").each(function(index, item) {
		if ($(item).val() == '') {
			$(item).parent().remove();
		}
	});

	form.submit();
}

function deleteArticleCheck(id, boardId) {
	if (!confirm("현재 게시물을 삭제하시겠습니까?")) {
		return;
	}

	location.href = "/article/deleteOneArticle?id=" + id + "&boardId="
			+ boardId;
}

function modifyArticleCheck(id, boardId) {
	if (!confirm("현재 게시물을 수정하시겠습니까?")) {
		return;
	}

	location.href = "/article/modifyArticle?id=" + id + "&boardId=" + boardId;
}

function Article__ModifyFormSubmited(form) {
	Article__addFormSubmited(form);
}

function checkFileTypeImg(input) {
	var type = [ "image/jpeg", "image/gif", "image/png" ];

	if (!type.includes(input.files[0].type)) {
		alert("이미지 파일이 아닙니다.");

		input.value = "";
	} else {
		$(input).siblings(".type2").attr("value", input.files[0].type);
	}

}

function ArticleAdd__addFile(locationType) {
	var container = document.createElement("div");
	var file = document.createElement("input");

	file.setAttribute("type", "file");
	file.setAttribute("name", "addFiles");
	file.addEventListener("change", function() {

		checkFileTypeImg(this);
	});

	var button = document.createElement("button");
	button.innerHTML = "삭제하기";
	button.addEventListener("click", function() {
		$(this).parent().remove();
	});

	var type = document.createElement("input");
	type.setAttribute("type", "hidden");
	type.setAttribute("name", "type");
	type.setAttribute("value", locationType);

	var type2 = document.createElement("input");
	type2.setAttribute("type", "hidden");
	type2.setAttribute("name", "type2");
	type2.setAttribute("class", "type2");

	container.append(file, button, type, type2);

	$(".fileList").append(container);
}

function ArticleModify__check(btn) {
	$(btn).attr("disabled", false);

	if (btn.checked) {
		if ($(btn).attr("name") == "modify") {
			$(btn).siblings(".modifyFile").show();
		}
		$(btn).siblings("input[type='checkbox']").attr("disabled", true);

	} else {

		if ($(btn).attr("name") == "modify") {
			$(btn).siblings(".modifyFile").find("input[type='file']").val("");
			$(btn).siblings(".modifyFile").hide();
		}

		$(btn).siblings("input[type='checkbox']").attr("disabled", false);
	}

	function ArticleModify__addFile(locationType) {
		ArticleAdd__addFile(locationType);
	}
}

var checkId = false;
var checkEmail = false;
function MemberJoin__checkForm(form) {

	if (!checkEmpty(form.loginId) || !checkEmpty(form.temp_loginPw)
			|| !checkEmpty(form.name) || !checkEmpty(form.email)) {
		alert('필수항목들을 입력해주세요.');

		return false;
	}

	if (!checkEmailPattern(form.email)) {
		alert('이메일 형식에 맞지 않습니다.');

		return false;
	}

	if (!checkId || !checkEmail) {
		alert('중복체크를 완료해주세요.');

		return false;
	}

	form.loginPw.value = encodeSHA1(form.temp_loginPw.value);
	$(form).find("button").attr("disabled", true);
	$(form).hide();
	$(".statusMsg").html("회원가입 중......");

	form.submit();
}

function MemberJoin__loginIdCheck(btn) {
	$(btn).prev().find("input").val($(btn).prev().find("input").val().trim());
	var loginId = $(btn).prev().find("input").val();
	if (loginId.length == 0) {
		alert("아이디를 입력해주세요");

		return false;
	}

	$.get("/member/loginIdCheck", {
		loginId : loginId
	}, function(data) {
		$(btn).next().html(data.msg);
		if (data.success) {
			checkId = true;
		}
	}, "json");
}

function MemberMyPage__withdrawal() {
	if (confirm("정말 탈퇴하시겠습니까?")) {
		alert('회원 탈퇴 되었습니다.')
		location.href = "/member/withdrawal";
	}
}

function MemberJoin__emailCheck(btn) {
	$(btn).prev().find("input").val($(btn).prev().find("input").val().trim());
	var email = $(btn).prev().find("input").val();

	var pattern = /\w+@\w+\.\w+\.?\w*/;

	if (!pattern.test(email)) {

		alert("이메일 형식에 맞지 않습니다.");

		return;
	}

	$.get("/member/emailCheck", {
		email : email
	}, function(data) {
		$(btn).next().html(data.msg);
		if (data.success) {
			checkEmail = true;
		}
	}, "json");
}

function MemberJoin__resetEmail() {
	checkEmail = false;
}

function MemberJoin__resetLoginId() {
	checkId = false;
}

function MemberLogin__checkForm(form) {
	if (!checkEmpty(form.loginId) || !checkEmpty(form.temp_loginPw)) {
		alert("빈칸없이 채워주세요.");
		return;
	}

	form.loginPw.value = encodeSHA1(form.temp_loginPw.value);

	form.submit();

}

function MemberFindLoginId__checkForm(form) {
	if (!checkEmpty(form.name) || !checkEmpty(form.email)) {
		alert("빈칸을 채워주세요");

		return;
	}

	$(form).find("button").attr("disabled", true);
	$("div").html("<h1>찾는중...</h1>");
	$.get("/member/doFindLoginId", {
		name : form.name.value.trim(),
		email : form.email.value.trim()
	}, function(data) {
		if (data.success) {
			$("div").html("<h2>아이디</h2>" + data.msg);
		} else {
			$("div").html("");
			alert(data.msg);
		}

		$(form).find("button").attr("disabled", false);
	})
}

function MemberFindLoginPw__checkForm(form) {
	if (!checkEmpty(form.loginId) || !checkEmpty(form.email)) {
		alert("빈칸을 채워주세요");

		return;
	}

	$(form).find("button").attr("disabled", true);
	$("div").html("<h1>찾는중...</h1>");
	$.get("/member/doFindLoginPw", {
		loginId : form.loginId.value.trim(),
		email : form.email.value.trim()
	}, function(data) {
		alert(data.msg);
		$("div").html("");
		$(form).find("button").attr("disabled", false);
	})
}

function MemberChangeLoginPw__checkForm(form) {
	if (!checkEmpty(form.temp_origin_loginPw) || !checkEmpty(form.temp_loginPw)) {
		alert("빈칸을 채워주세요.");
		return;
	}

	form.origin_loginPw.value = encodeSHA1(form.temp_origin_loginPw.value);
	form.loginPw.value = encodeSHA1(form.temp_loginPw.value);

	form.submit();
}

function ArticleDetail__checkAddReplyForm(form){
	if(!checkEmpty(form.body)){
		alert("빈칸없이 채워주세요");
		return ;
	}
	$.post("/article/addReply",
		{
			articleId : form.articleId.value,
			boardId : form.boardId.value,
			body : form.body.value
		},
		function(data){
			alert(data.msg);
			if(data.success){
				form.body.value = "";
				ArticleDetail__drawReply(data.reply);
			}
		},
		"json"
	)
}

function ArticleDetail__drawReply(data){
	var html = `
	<div>	
		<table>
			<tr>
				<th>번호</th> <td class="replyId" data-id="${data.id}"> ${data.id}</td>
			</tr>
			<tr>
				<th>날짜</th> <td class="replyRegDate"> ${data.regDate}</td>
			</tr>
			<tr>
				<th>작성자</th> <td> ${data.extra.writer}</td>
			</tr>											
		</table>
		<pre class="replyBody">${data.body}</pre>`;
		if($("#memberId") && $("#memberId").val() == data.memberId){
			html += `<button type="button" onclick="ArticleDetail__deleteReply(this);">삭제</button>
			<button type="button" onclick="ArticleDetail__showReplyModifyForm(this);">수정</button>`
		}
		html += `	
		<hr>
	</div>`;
	$(".replyList").prepend(html);
}

function ArticleDetail__getAllReplies(){
	var id = $("#articleId").val();
	var boardId = $("#boardId").val();
	$.post("/article/getOneArticleAllReplies",
		{
			articleId : id,
			boardId : boardId
		},
		function(data){			
			if(data.success){
				for(var i=0; i<data.replies.length ;i++){
					ArticleDetail__drawReply(data.replies[i]);
				}
			}else{
				$(".replyList").html(data.msg);
			}
		}
	)
}

function ArticleDetail__deleteReply(btn){
	var articleId = $("#articleId").val();
	var boardId = $("#boardId").val();
	var id = $(btn).parent().find(".replyId").attr("data-id");		

	if(confirm("선택하신 댓글을 삭제하시겠습니까?")){
		$(btn).parent().hide();
		$.get("/article/deleteOneArticleOneReply",
			{
				articleId : articleId,
				boardId : boardId,
				id : id
			},
			function(data){
				alert(data.msg);
				if(data.success){
					$(btn).parent().remove();
				}else{
					$(btn).parent().show();	
				}
			},
			"json"
		);
	}
}

function ArticleDetail__modifyReply(form){
	if(!checkEmpty(form.body)){
		alert("빈칸없이 채워주세요.");
		return ;
	}
	var replyContainer = hide;
	$.post("/article/modifyReply",
		{
			id : form.id.value,
			articleId : form.articleId.value,
			boardId : form.boardId.value,
			body : form.body.value
		},
		function(data){
			alert(data.msg);
			if(data.success){
				$("#replyModifyForm").find("iput[name='id']").val("");
				$("#replyModifyForm").find("textarea[name='body']").val("");

				replyContainer.find(".replyRegDate").html(data.reply.regDate);
				replyContainer.find(".replyBody").html(data.reply.body);
				replyContainer.show();
			}
		},
		"json"
	);
}

var hide;
function ArticleDetail__showReplyModifyForm(btn){

	if(hide != null)
		hide.show();

	hide = $(btn).parent();
	hide.hide();

	$("#replyModifyForm").show();
	$("#replyAddForm").hide();

	$("#replyModifyForm").find("input[name='id']").val(hide.find(".replyId").attr("data-id"));
	$("#replyModifyForm").find("textarea[name='body']").val(hide.find(".replyBody").html());
	$("#replyModifyForm").find("textarea[name='body']").focus();	

}

function ArticleDetail__hideReplyModifyForm(btn){

	$("#replyModifyForm").find("iput[name='id']").val("");
	$("#replyModifyForm").find("textarea[name='body']").val("");

	$("#replyAddForm").show();
	$("#replyModifyForm").hide();

	hide.show();
}

$(function() {
	if($(".replyList") != null) {
		ArticleDetail__getAllReplies();
	}
})

