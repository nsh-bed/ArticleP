function addFormSubmited(form) {
	form.title.value = form.title.value.trim();
	form.body.value = form.body.value.trim();
	
	if (form.title.value.length == 0 ) {
		alert('제목이 입력되지 않았습니다.');
		form.title.focus();
		
		return false;
	}
	
	if (form.body.value.length == 0 ) {
		alert('내용이 입력되지 않았습니다.');
		form.body.focus();
		
		return false;
	}
	
	form.submit();
}

function deleteArticleCheck(id, boardId) {
	if(!confirm("현재 게시물을 삭제하시겠습니까?")) {
		return;
	}
	
	location.href="/article/deleteOneArticle?id="+id+"&boardId="+boardId;
}