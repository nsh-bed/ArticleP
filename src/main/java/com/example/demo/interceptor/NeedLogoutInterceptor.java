package com.example.demo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component("needLogoutInterceptor")
public class NeedLogoutInterceptor implements HandlerInterceptor {
	
	public boolean prehandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception{
		
		boolean logined = (boolean) request.getAttribute("isLogined");
		
		if(logined) {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			response.getWriter().write("<script>");
			response.getWriter().write("alert('로그아웃이 필요한 서비스입니다.');");
			response.getWriter().write("history.back();");
			response.getWriter().write("</script>");
			
			return false;
		}
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
}
