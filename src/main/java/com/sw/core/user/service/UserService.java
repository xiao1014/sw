package com.sw.core.user.service;

import com.sw.core.base.BaseService;
import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;
import com.sw.core.user.domain.User;
import org.springframework.stereotype.Service;

/**
 * @项目：sw
 * @包：com.sw.core.user.service
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 15:04 2017/12/20.
 */
@Service
public interface UserService extends BaseService<User, String> {
    User getUserById(String id);

    User getUserBuAccountName(String accountName);

    void save(User user);

    /**
     * 根据用户名称查询salt并根据输入的密码生成对应密码
     * @param accountName accountName
     * @param password password
     */
    String makePasswordByAccount(String accountName, String password);

    /**
     * 查询用户列表
     * @param pageHelper
     * @param searchUser
     * @return
     */
    BsTable findUserList(PageHelper pageHelper, String searchUser);

    /**
     * 更新用户信息
     * @param user
     */
    void updateUserInfo(User user);
}
