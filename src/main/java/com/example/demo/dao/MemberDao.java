package com.example.demo.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.dto.Member;

@Mapper
public interface MemberDao {

	public void addMember(Map<String, Object> param);

	public int checkEmail(Map<String, Object> param);

	public int checkLoginId(Map<String, Object> param);

	public int getOneMemberByAuthKeyEmail(Map<String, Object> param);

	public void memberEmailAuth(Map<String, Object> param);

	public Member getOneMemberByIdAndPw(Map<String, Object> param);

	public Member getOneMemberById(int loginedMemberId);

}
