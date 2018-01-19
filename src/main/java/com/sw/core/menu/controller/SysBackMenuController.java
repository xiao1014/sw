package com.sw.core.menu.controller;

import com.sw.core.menu.domain.SysBackMenu;
import com.sw.core.menu.service.SysBackMenuService;
import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import com.sw.core.util.CommonUtil;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.menu.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 11:12 2018/1/12.
 * @ModifyDate: Modify on 11:12 2018/1/12.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("/back/menu")
public class SysBackMenuController {
    @Resource
    private SysBackMenuService sysBackMenuService;
    @Resource
    private UserService userService;

    @RequestMapping(value = "/menuListUi", method = RequestMethod.GET)
    public String menuListUi() {
        return "/back/menu/menuList";
    }

    @ResponseBody
    @RequestMapping(value = "/menuList", method = RequestMethod.POST)
    public List<SysBackMenu> menuList(String parentId) {
        return sysBackMenuService.findMenuList(parentId);
    }


    @RequestMapping(value = "/addMenuUi", method = RequestMethod.GET)
    public String addMenuUi() {
        return "/back/menu/addMenu";
    }

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(SysBackMenu menu) {
        menu.setId(CommonUtil.getUUID());
        sysBackMenuService.insert(menu);
        return "success";
    }

    @RequestMapping(value = "/editMenuUi", method = RequestMethod.GET)
    public String editMenuUi(String id, Model model) {
        SysBackMenu menu = sysBackMenuService.selectByPrimaryKey(id);
        model.addAttribute("menu", menu);
        return "/back/menu/editMenu";
    }

    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(SysBackMenu menu) {
        sysBackMenuService.updateByPrimaryKey(menu);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete(String id) {
        sysBackMenuService.deleteAllById(id);
        return "success";
    }

    @RequestMapping(value = "/mainMenu", method = RequestMethod.GET)
    public String mainMenu(Model model) {
        Object principal = SecurityUtils.getSubject().getPrincipal();
        User user = userService.getUserBuAccountName(principal.toString());
        List<SysBackMenu> menuList = sysBackMenuService.findMenuListByRoleId(user.getRoleId());
        model.addAttribute("menuList", menuList);
        return "/back/menu";
    }
}
