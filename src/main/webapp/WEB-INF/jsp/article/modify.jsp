<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="title" value="게시물수정 페이지" />
<%@ include file="../part/head.jspf"%>
<h1>${title}</h1>

<a href="/article/list${url}&cPage=${param.cPage}">목록으로</a>


<form action="./doModifyArticle" onsubmit="Article__ModifyFormSubmited(this); return false;" method="POST">
	<input type="hidden" name="id" value="${param.id }">
	<input type="hidden" name="boardId" value="${param.boardId }">
	<div>
		제목 : <input type="text" autocomplete="off" name="title" value="${article.title}">
	</div>
	<div>
		내용 : <textarea name="body" >${article.body}</textarea>
	</div>
	<div>
		<input type="submit" value="수정완료">
	</div>
</form>
<%@ include file="../part/foot.jspf"%>