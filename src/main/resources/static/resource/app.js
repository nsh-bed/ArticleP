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

	$(".ArticleAdd__fileList").append(container);
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
}