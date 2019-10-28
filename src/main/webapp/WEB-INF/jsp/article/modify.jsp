<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="title" value="게시물수정 페이지" />
<%@ include file="../part/head.jspf"%>
<h1>${title}</h1>

<a href="/article/list${url}&cPage=${param.cPage}">목록으로</a>


<form action="./doModifyArticle" onsubmit="Article__ModifyFormSubmited(this); return false;" method="POST" enctype="multipart/form-data">
	<input type="hidden" name="id" value="${param.id }"> <input
		type="hidden" name="boardId" value="${param.boardId }">
	<div>
		제목 : <input type="text" autocomplete="off" name="title"
			value="${article.title}">
	</div>
	<div>
		내용 :
		<textarea name="body">${article.body}</textarea>
	</div>
	<div>
		<button>수정완료</button>
		<a href="javascript:history.back();">취소</a>
		
	</div>
	<button type="button" onclick="ArticleAdd__addFile('body')">파일 추가하기</button>
	<c:forEach items="${files}" var="file">
		<div>
			<img src="/article/showImg?id=${file.id}"><br>
			
				삭제하기 : <input class="delete" type="checkbox" name="delete"
					value="${file.id}" onclick="ArticleModify__check(this);" />
			
				수정하기 : <input class="modify" type="checkbox" name="modify"
					onclick="ArticleModify__check(this);"><br>
			
			<div class="modifyFile" style="display:none;">
				<input type="hidden" name="modifyFileId" value="${file.id}" /> <input
					type="file" name="modifyFile" onchange="checkFileTypeImg(this);" />
				<input class="type2" type="hidden" name="modifyType2" value="" />
			</div>
		</div>
	</c:forEach>
	
	<div class="fileList">
	
	</div>
</form>

<%@ include file="../part/foot.jspf"%>