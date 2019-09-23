<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="title" value="게시물작성 페이지" />
<%@ include file="../part/head.jspf"%>
<h1>${title}</h1>

<a href="/article/list${url}&cPage=${param.cPage}">목록으로</a>


<form action="./doAdd" onsubmit="Article__addFormSubmited(this); return false;" method="POST" enctype="multipart/form-data">
	<input type="hidden" name="boardId" value="${param.boardId }">
	<div>
		제목 : <input type="text" autocomplete="off" name="title" placeholder="제목">
	</div>
	<div>
		내용 : <textarea name="body" placeholder="내용"></textarea>
	</div>
	<div>
		<input type="submit" value="작성">
		<a href="javascript:history.back();">취소</a>
	</div>
	<button type="button" onclick="ArticleAdd__addFile('body')">파일 추가하기</button>
	<div class="ArticleAdd__fileList">
	
	</div>	
</form>
<%@ include file="../part/foot.jspf"%>