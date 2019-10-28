<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="title" value="로그인 페이지"/>
<%@ include file="../part/head.jspf" %>
<h1>${title}</h1>

<form onsubmit="MemberLogin__checkForm(this); return false;" action="./doLogin" method="Post">
	<div>
		<label>아이디 : <input type="text" name="loginId" placeholder="아이디를 입력해주세요."></label>
	</div>
	
	<div>
		<label>비밀번호 : <input type="password" name="temp_loginPw" placeholder="비밀번호를 입력해주세요."></label>
		<input type="hidden" name="loginPw"><br>
	</div>
	
	
	
	<button>로그인</button>
</form>

<%@ include file="../part/foot.jspf" %>