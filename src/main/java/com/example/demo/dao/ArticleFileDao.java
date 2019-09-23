package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.dto.ArticleFile;

@Mapper
public interface ArticleFileDao {

	public void addArticleFiles(Map<String, Object> param, String type, String type2, String[] fileNames);

	public List<ArticleFile> getArticleFiles(Map<String, Object> param);

}
