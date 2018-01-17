package com.sw.core.user.controller;

import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;
import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @项目：sw
 * @包：com.sw.core.user.controller
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 15:03 2017/12/20.
 * @ModifyDate: Modify on 15:03 2017/12/20.
 * @ModifyDescritpion：null
 */
@Controller
@RequestMapping("/back/user")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/addUserUi", method = RequestMethod.GET)
    public String addUserUi() {
        return "/back/user/addUser";
    }

    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(User user) {
        userService.save(user);
        return "success";
    }

    @RequestMapping(value = "/userListUi", method = RequestMethod.GET)
    public String userListUi() {
        return "/back/user/userList";
    }

    @ResponseBody
    @RequestMapping(value = "/userList", method = RequestMethod.POST)
    public BsTable userList(PageHelper pageHelper, String searchUser) {
        BsTable table = userService.findUserList(pageHelper, searchUser);
        return table;
    }

    @RequestMapping(value = "/editUserUi", method = RequestMethod.GET)
    public String editUserUi(String id, Model model) {
        User user = userService.selectByPrimaryKey(id);
        model.addAttribute("user", user);
        return "/back/user/editUser";
    }

    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(User user) {
        userService.updateUserInfo(user);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String delete(String id) {
        userService.deleteByPrimaryKey(id);
        return "success";
    }

    @ResponseBody
    @RequestMapping(value = "/deletes", method = RequestMethod.POST)
    public String deletes(String ids) {
        userService.deleteByIds(ids);
        return "success";
    }
}
