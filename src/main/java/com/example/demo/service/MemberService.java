package com.example.demo.service;

import java.util.Map;

import com.example.demo.dto.Member;

public interface MemberService {

	public Map<String, Object> addMember(Map<String, Object> param);

	public Map<String, Object> checkEmail(Map<String, Object> param);

	public Map<String, Object> checkLoginId(Map<String, Object> param);

	public Map<String, Object> memberEmailAuth(Map<String, Object> param);

	public Map<String, Object> checkMember(Map<String, Object> param);

	public Member getOneMemberById(int loginedMemberId);

	public Map<String, Object> memberWithdrawal(int loginedMemberId);

	public Map<String, Object> findLoginId(Map<String, Object> param);

	public Map<String, Object> findLoginPw(Map<String, Object> param);

	public Map<String, Object> changeLoginPw(Map<String, Object> param);
}
