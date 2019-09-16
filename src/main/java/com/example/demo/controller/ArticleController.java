package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.Article;
import com.example.demo.service.ArticleService;

@Controller
public class ArticleController {
	@Autowired
	private ArticleService articleService;

	@RequestMapping("article/list")
	public String showList(Model model, @RequestParam Map<String, Object> param) {
		if (param.get("cPage") == null || param.get("cPage").equals("")) {
			param.put("cPage", 1);
		}
		
		Map<String, Object> rs = articleService.getArticleList(param);

		model.addAttribute("list", rs.get("list"));
		model.addAttribute("page", rs.get("page"));

		return "article/list";
	}
	
	@RequestMapping("article/detail")
	public String showDetail(Model model, @RequestParam Map<String, Object> param) {
		Article article = articleService.getOneArticleById(param);
		model.addAttribute("article", article);
		
		return "article/detail";
	}
	
	@RequestMapping("article/add")
	public String showAdd() {
		return "article/add";
	}
	
	@RequestMapping("article/doAdd")
	public String addOneArticle(Model model, @RequestParam Map<String, Object> param) {
		Map<String, Object> rs = articleService.addOneArticle(param);
		model.addAttribute("msg", rs.get("msg"));
		String resultCode = (String) rs.get("resultCode");
		
		if(resultCode.startsWith("S-")) {
			String redirectUrl = "/article/detail?id="+param.get("id")+"&boardId="+param.get("boardId");
			model.addAttribute("redirectUrl", redirectUrl);
			
		} else {
			model.addAttribute("historyBack", true);
		}
		
		return "common/redirect";
	}
	
	@RequestMapping("article/deleteOneArticle")
	public String deleteOneArticle(Model model, @RequestParam Map<String, Object> param) {
		Map<String, Object> rs = articleService.deleteOneArticle(param);
		
		model.addAttribute("msg", rs.get("msg"));
		String resultCode = (String) rs.get("resultCode");
		
		if(resultCode.startsWith("S-")) {
			StringBuffer redirectUrl = new StringBuffer();
			redirectUrl.append("/article/list?");
			for(String key : param.keySet()) {
				redirectUrl.append(key + "=" + param.get(key) + "&");
			}
			model.addAttribute("redirectUrl", redirectUrl);
		} else {
			model.addAttribute("historyBack", true);
		}
		
		return "common/redirect";
	}
}
