package com.sw.core.user.controller;

import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;

/**
 * @项目：sw
 * @包：com.sw.core.user.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 16:19 2017/12/20.
 * @ModifyDate: Modify on 16:19 2017/12/20.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("/back")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    @Resource
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String indexUi(Model model, @ModelAttribute("loginMsg") String loginMsg) {
        model.addAttribute("loginMsg", loginMsg);
        return "back/index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(User user, RedirectAttributes redirectAttributes) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(user.getAccountName(), user.getPassword());
        try {
            subject.login(token);
        } catch (UnknownAccountException|IncorrectCredentialsException e ) {
            logger.error(e.toString());
            redirectAttributes.addFlashAttribute("loginMsg", "用户名或密码错误！");
            return "redirect:/back/login";
        } catch (Exception e) {
            logger.error(e.toString());
            redirectAttributes.addFlashAttribute("loginMsg", "登录异常！");
            return "redirect:/back/login";
        }
        redirectAttributes.addFlashAttribute("accountName", user.getAccountName());
        return "redirect:/back/index";
    }

    @RequestMapping(value = "/index")
    public String index(@ModelAttribute("accountName") String accountName, Model model) {
        User user = userService.getUserBuAccountName(accountName);
        model.addAttribute("user", user);
        return "/back/main";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        // 如果已经登录，则跳转到管理首页
        if(SecurityUtils.getSubject() != null){
            SecurityUtils.getSubject().logout();
        }
        return "redirect:/back/index";
    }
}
