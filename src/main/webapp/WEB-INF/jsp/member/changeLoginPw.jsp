<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="title" value="비밀번호변경 페이지"/>
<%@ include file="../part/head.jspf" %>
<h1>${title}</h1>


<form onsubmit="MemberChangeLoginPw__checkForm(this); return false;" action="./doChangeLoginPw" method="Post">
	<label>기존 비밀번호 : <input type="text" name="temp_origin_loginPw"></label>
	<input type="hidden" name="origin_loginPw">
	<label>새 비밀번호 : <input type="text" name="temp_loginPw"></label>
	<input type="hidden" name="loginPw">
	
	<button>수정</button>
</form>


<%@ include file="../part/foot.jspf" %>