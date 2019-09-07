package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.demo.service.ArticleService;


@Controller
public class ArticleController {
	@Autowired
	private ArticleService articleService;
}
