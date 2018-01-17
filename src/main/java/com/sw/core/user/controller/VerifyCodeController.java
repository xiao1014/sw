package com.sw.core.user.controller;

import com.sw.core.util.VerifyCodeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

/**
 * @项目：sw
 * @包：com.sw.core.user.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 9:11 2017/12/21.
 * @ModifyDate: Modify on 9:11 2017/12/21.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("")
public class VerifyCodeController {
    /**
     * 返回登录界面验证码
     * @param response res
     */
    @RequestMapping("/verifyCode")
    public void verifyCode(HttpServletResponse response, HttpServletRequest request) {
        BufferedImage imageCode = VerifyCodeUtil.createImageCode(4, 4, null, 88, 30, 3, true, Color.white, null, null, request);
        OutputStream out = null;
        try {
            out = response.getOutputStream();
            response.setContentType("image/jpeg");
            response.setHeader("Pragma","no-cache");
            response.setHeader("Cache-Control","no-cache");
            response.setIntHeader("Expires",-1);
            ImageIO.write(imageCode,"JPEG",out);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
