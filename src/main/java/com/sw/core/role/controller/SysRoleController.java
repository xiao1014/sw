package com.sw.core.role.controller;

import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;
import com.sw.core.menu.domain.SysBackMenu;
import com.sw.core.menu.service.SysBackMenuService;
import com.sw.core.role.domain.SysRole;
import com.sw.core.role.service.SysRoleService;
import com.sw.core.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @项目：sw
 * @包：com.sw.core.role.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 8:33 2018/1/17.
 * @ModifyDate: Modify on 8:33 2018/1/17.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("/back/role")
public class SysRoleController {
    @Resource
    private SysRoleService sysRoleService;
    @Resource
    private SysBackMenuService sysBackMenuService;

    @RequestMapping(value = "/roleListUi", method = RequestMethod.GET)
    public String roleListUi() {
        return "/back/role/roleList";
    }

    @ResponseBody
    @RequestMapping(value = "/roleList", method = RequestMethod.POST)
    public BsTable roleList(String searchName, PageHelper pageHelper) {
        return sysRoleService.findBsTableBySearchName(pageHelper, searchName);
    }


    @RequestMapping(value = "/addRoleUi", method = RequestMethod.GET)
    public String addRoleUi() {
        return "/back/role/addRole";
    }

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(SysRole role) {
        role.setId(CommonUtil.getUUID());
        role.setCreateTime(new Date());
        sysRoleService.insert(role);
        return "success";
    }

    @RequestMapping(value = "/editRoleUi", method = RequestMethod.GET)
    public String editRoleUi(String id, Model model) {
        SysRole role = sysRoleService.selectByPrimaryKey(id);
        model.addAttribute("role", role);
        return "/back/role/editRole";
    }

    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(SysRole role) {
        sysRoleService.updateByPrimaryKeyWithBLOBs(role);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete(String id) {
        sysRoleService.deleteByPrimaryKey(id);
        return "success";
    }

    @RequestMapping(value = "/roleRefMenuUi", method = RequestMethod.GET)
    public String roleRefMenuUi(String id, Model model) {
        SysRole role = sysRoleService.selectByPrimaryKey(id);
        model.addAttribute("role", role);
        List<SysBackMenu> menuList = sysBackMenuService.findMenuList(null);
        Map<String, List<SysBackMenu>> menuMap = new HashMap<>();
        if (menuList!=null && !menuList.isEmpty()) {
            for (SysBackMenu sysBackMenu : menuList) {
                if (StringUtils.isBlank(sysBackMenu.getPid())) {
                    // 第一级菜单
                    String menuId = sysBackMenu.getId();
                    menuMap.put(menuId, sysBackMenuService.findMenuList(menuId));
                }
            }
        }
        model.addAttribute("menuList", menuList);
        model.addAttribute("menuMap", menuMap);
        model.addAttribute("roleId", id);
        return "/back/role/roleRefMenu";
    }
}
