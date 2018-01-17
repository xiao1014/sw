package com.sw.core.shiro;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @项目：sw
 * @包：com.sw.core.util
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 8:39 2017/12/21.
 * @ModifyDate: Modify on 8:39 2017/12/21.
 * @ModifyDescritpion：null
 */
public class MyFormAuthenticationFilter extends FormAuthenticationFilter {
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpSession session = httpServletRequest.getSession();
        // validateCode
        String validateCode = (String) session.getAttribute("validateCode");
        String randomCode = httpServletRequest.getParameter("randomCode");
        if (randomCode != null && validateCode != null && !randomCode.equals(validateCode)) {
            // 如果校验失败，将验证码错误失败信息，通过shiroLoginFailure设置到request中
            httpServletRequest.setAttribute("shiroLoginFailure", "randomCodeError");
            // 拒绝访问，不再校验账号和密码
            return true;
        }
        return super.onAccessDenied(request, response);
    }

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        // 登录成功处理
        return super.onLoginSuccess(token, subject, request, response);
    }
}
