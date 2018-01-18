package com.sw.core.role.controller;

import com.sw.core.role.service.SysRoleRefMenuService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @项目：sw
 * @包：com.sw.core.role.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 17:16 2018/1/18.
 * @ModifyDate: Modify on 17:16 2018/1/18.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("/back/roleRefMenu")
public class SysRoleRefMenuController {
    @Resource
    private SysRoleRefMenuService sysRoleRefMenuService;

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(String menuIds, String roleId) {
        sysRoleRefMenuService.insertRoleRefMenu(menuIds, roleId);
        return "success";
    }
}
