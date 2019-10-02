package com.example.demo.service;

import java.util.Map;

import org.apache.groovy.util.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDao memberDao;
	
	public Map<String, Object> addMember(Map<String, Object> param) {
		String msg = "";
		String resultCode = "";
		
		try {
			memberDao.addMember(param);
			msg = "회원가입이 완료되었습니다.";
			resultCode = "S-1";
		} catch(Exception e) {
			e.printStackTrace();
			msg = "예상치 못한 오류가 발생되었습니다.";
			resultCode = "F-1";
		}
		
		return Maps.of("msg", msg, "resultCode", resultCode);
 	}
	
	public Map<String, Object> checkEmail(Map<String, Object> param) {
		String msg = "";
		String resultCode = "";
		
		int num = memberDao.checkEmail(param);
		if(num > 0) {
			msg = "이메일이 중복됩니다.";
			resultCode = "F-1";
		} else {
			msg = "사용가능한 이메일 입니다.";
			resultCode = "S-1";
		}
		
		return Maps.of("msg", msg, "resultCode", resultCode);
	}
	
	public Map<String, Object> checkLoginId(Map<String, Object> param) {
		String msg = "";
		String resultCode = "";
		
		int num = memberDao.checkLoginId(param);
		if(num > 0) {
			msg = "아이디가 중복됩니다.";
			resultCode = "F-1";
		} else {
			msg = "사용가능한 아이디입니다.";
			resultCode = "S-1";
		}
		
		return Maps.of("msg", msg, "resultCode", resultCode);
		
	}
}
