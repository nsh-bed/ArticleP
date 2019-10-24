package com.example.demo.controller;

import java.util.Map;

import org.apache.groovy.util.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.MemberService;

@Controller
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@RequestMapping("member/join")
	public String join() {
		return "member/join";
	}
	
	@RequestMapping("member/doJoin")
	public String doJoin(Model model, @RequestParam Map<String, Object> param) {
		Map<String, Object> rs = memberService.addMember(param);
		
		model.addAttribute("msg", rs.get("msg"));
		String resultCode = (String) rs.get("resultCode");
		
		
		if(resultCode.startsWith("S-")) {
			String redirectUrl = "/";
			
			model.addAttribute("redirectUrl", redirectUrl);
		} else {
			model.addAttribute("historyBack", true);
		}
		
		return "common/redirect";
	}
	
	@RequestMapping("member/emailCheck")
	@ResponseBody
	public Map<String, Object> emailCheck(@RequestParam Map<String, Object> param){
		Map<String, Object> rs = memberService.checkEmail(param);

		String resultCode = (String) rs.get("resultCode");

		if(resultCode.startsWith("S-")) {			
			return Maps.of("msg", rs.get("msg"), "success", true);
		}else {
			return Maps.of("msg", rs.get("msg"), "success", false);
		}

	}

	@RequestMapping("member/loginIdCheck")
	@ResponseBody
	public Map<String, Object> loginIdCheck(@RequestParam Map<String, Object> param){
		Map<String, Object> rs = memberService.checkLoginId(param);		

		String resultCode = (String) rs.get("resultCode");

		if(resultCode.startsWith("S-")) {			
			return Maps.of("msg", rs.get("msg"), "success", true);
		}else {
			return Maps.of("msg", rs.get("msg"), "success", false);
		}		

	}
	
	@RequestMapping("member/auth")
	public String auth(Model model, @RequestParam Map<String, Object> param) {
		Map<String, Object> rs = memberService.memberEmailAuth(param);
		model.addAttribute("msg", rs.get("msg"));
		model.addAttribute("redirectUrl", "/");
		
		return "common/redirect";
	}
}