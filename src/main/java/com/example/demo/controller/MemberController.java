package com.example.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.groovy.util.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.Member;
import com.example.demo.service.MemberService;

import groovy.util.logging.Slf4j;
import jline.internal.Log;

@Controller
@Slf4j
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

		if (resultCode.startsWith("S-")) {
			String redirectUrl = "/";

			model.addAttribute("redirectUrl", redirectUrl);
		} else {
			model.addAttribute("historyBack", true);
		}

		return "common/redirect";
	}

	@RequestMapping("member/emailCheck")
	@ResponseBody
	public Map<String, Object> emailCheck(@RequestParam Map<String, Object> param) {
		Map<String, Object> rs = memberService.checkEmail(param);

		String resultCode = (String) rs.get("resultCode");

		if (resultCode.startsWith("S-")) {
			return Maps.of("msg", rs.get("msg"), "success", true);
		} else {
			return Maps.of("msg", rs.get("msg"), "success", false);
		}

	}

	@RequestMapping("member/loginIdCheck")
	@ResponseBody
	public Map<String, Object> loginIdCheck(@RequestParam Map<String, Object> param) {
		Map<String, Object> rs = memberService.checkLoginId(param);

		String resultCode = (String) rs.get("resultCode");
		if (resultCode.startsWith("S-")) {
			return Maps.of("msg", rs.get("msg"), "success", true);
		} else {
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

	@RequestMapping("member/login")
	public String login() {

		return "member/login";
	}

	@RequestMapping("member/doLogin")
	public String doLogin(Model model, @RequestParam Map<String, Object> param, HttpSession session) {
		Map<String, Object> rs = memberService.checkMember(param);

		model.addAttribute("msg", rs.get("msg"));

		String resultCode = (String) rs.get("resultCode");
		
		if (resultCode.startsWith("S-")) {

			String redirectUrl = "/";

			model.addAttribute("redirectUrl", redirectUrl);
			session.setAttribute("loginedMemberId", (int) rs.get("loginedMemberId"));

		} else {
			model.addAttribute("historyBack", true);
		}

		return "common/redirect";
	}

	@RequestMapping("member/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("loginedMemberId");

		return "redirect:/";
	}
	
	@RequestMapping("member/myPage")
	public String myPage() {
	
		return "member/myPage";
	}
	
	@RequestMapping("member/withdrawal")
	public String withdrawal(HttpSession session, Model model) {
		Map<String, Object> rs = memberService.memberWithdrawal((int) session.getAttribute("loginedMemberId"));
		
		model.addAttribute("msg", rs.get("msg"));
		String resultCode = (String) rs.get("resultCode");
		
		if(resultCode.startsWith("S-")) {
			session.removeAttribute("loginedMemberId");
			String redirectUrl = "/";
			model.addAttribute("redirectUrl", redirectUrl);
		} else {
			model.addAttribute("historyBack", true);
		}
		
		return "common/redirect";
	}
	
	@RequestMapping("member/findLoginId")
	public String findLoginId() {
	
		return "member/findLoginId";
	}
	
	@RequestMapping("member/doFindLoginId")
	@ResponseBody
	public Map<String, Object> doFindLoginId(@RequestParam Map<String, Object> param) {
		Map<String, Object> rs = memberService.findLoginId(param);
		if(rs.get("msg") == null) {
			
			return Maps.of("msg", "일치하는 정보가 없습니다.", "success", false);
		} else {
			
			return Maps.of("msg", rs.get("msg"), "success", true);
		}
	}
 	
	@RequestMapping("member/findLoginPw")
	public String findLoginPw() {
	
		return "member/findLoginPw";
	}
	
	@RequestMapping("member/doFindLoginPw")
	@ResponseBody
	public Map<String, Object> doFindLoginPw(@RequestParam Map<String, Object> param, HttpSession session) {
		Map<String, Object> rs = memberService.findLoginPw(param);
		
		return Maps.of("msg", rs.get("msg"));
	}
	
	@RequestMapping("member/changeLoginPw")
	public String changeLoginPw() {
		
		return "member/changeLoginPw";
	}
	
	@RequestMapping("member/doChangeLoginPw")
	public String doCchangeLoginPw(Model model, @RequestParam Map<String, Object> param, HttpSession session) {
		param.put("loginedMemberId", session.getAttribute("loginedMemberId"));
		Map<String, Object> rs = memberService.changeLoginPw(param); 
		model.addAttribute("msg", rs.get("msg"));
		String resultCode = (String) rs.get("resultCode");
		
		if(resultCode.startsWith("S-")) {
			String redirectUrl = "/member/myPage";
			model.addAttribute("redirectUrl", redirectUrl);
		} else {
			model.addAttribute("historyBack", true);
		}
		
		return "common/redirect";
	}
}
