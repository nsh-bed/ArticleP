function checkEmpty(input) {
	input.value = input.value.trim();
	if(input.value.length == 0) {
		return false;
	}
	
	return true;
}

function encodeSHA1(value){
	var hash = CryptoJS.SHA1(value);
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

function ArticleModify__check(btn){
	$(btn).attr("disabled", false);

	if(btn.checked){
		if($(btn).attr("name") == "modify"){
			$(btn).siblings(".modifyFile").show();
		}
		$(btn).siblings("input[type='checkbox']").attr("disabled" ,true);
		
	} else {
		
		if($(btn).attr("name") == "modify"){
			$(btn).siblings(".modifyFile").find("input[type='file']").val("");
			$(btn).siblings(".modifyFile").hide();
		}
		
		$(btn).siblings("input[type='checkbox']").attr("disabled" ,false);
	}
	
	function ArticleModify__addFile(locationType){
		ArticleAdd__addFile(locationType);
	}
}

var checkId = false;
var checkEmail = false;
function MemberJoin__checkForm(form) {
	
	if( !checkEmpty(form.loginId) || !checkEmpty(form.temp_loginPw) || !checkEmpty(form.name) || !checkEmpty(form.email) ) {
		alert('필수항목들을 입력해주세요.');
		
		return false;
	}
	
	if(!checkEmailPattern(form.email)){
		alert('이메일 형식에 맞지 않습니다.');
		
		return false;
	}
	
	if(!checkId || !checkEmail){
		alert('중복체크를 완료해주세요.');
		
		return false;
	}

	form.loginPw.value = encodeSHA1(form.temp_loginPw);
	$(form).find("button").attr("disabled", true);
	$(form).hide();
	$(".statusMsg").html("회원가입 중......");

	
	form.submit();
}

function MemberJoin__loginIdCheck(btn) {
	$(btn).prev().find("input").val($(btn).prev().find("input").val().trim());
	var loginId = $(btn).prev().find("input").val();
	if(loginId.length == 0){
		alert("아이디를 입력해주세요");
		
		return false;
	}
	
	$.get("/member/loginIdCheck",
			{
				loginId : loginId
			},
			function(data){
				$(btn).next().html(data.msg);
				if(data.success){
					checkId = true;
				}
			},
			"json"
		);
}
	
function MemberJoin__emailCheck(btn){
	$(btn).prev().find("input").val($(btn).prev().find("input").val().trim());
	var email = $(btn).prev().find("input").val();
	
	var pattern = /\w+@\w+\.\w+\.?\w*/;
	
	if(!pattern.test(email)) {
		
		alert("이메일 형식에 맞지 않습니다.");
		
		
		return ;
	}

	$.get("/member/emailCheck",
		{
			email : email
		},
		function(data){
			$(btn).next().html(data.msg);
			if(data.success){
				checkEmail = true;
			}
		},
		"json"
	);
}




function MemberJoin__resetEmail(){	
	checkEmail = false;
}

function MemberJoin__resetLoginId(){	
	checkId = false;
}

function MemberLogin__checkForm(form) {
	if(!checkEmpty(form.loginId) || !checkEmpty(form.temp_loginPw)) {
		alert("빈칸없이 채워주세요.");
		return ;
	}
	
	form.loginPw.value = encodeSHA1(form.temp_loginPw);
	
	form.submit();
	
}