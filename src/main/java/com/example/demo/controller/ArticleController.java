package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.service.ArticleService;

@Controller
public class ArticleController {
	@Autowired
	private ArticleService articleService;

	@RequestMapping("article/list")
	public String showList(Model model, @RequestParam Map<String, Object> param) {
		if (param.get("cPage") == null) {
			param.put("cPage", 1);
		}
		
		Map<String, Object> rs = articleService.getArticleList(param);

		model.addAttribute("list", rs.get("list"));
		model.addAttribute("page", rs.get("page"));

		return "article/list";
	}
}
