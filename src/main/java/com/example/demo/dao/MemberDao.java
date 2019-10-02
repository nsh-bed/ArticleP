package com.example.demo.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDao {

	public void addMember(Map<String, Object> param);

	public int checkEmail(Map<String, Object> param);

	public int checkLoginId(Map<String, Object> param);

}
