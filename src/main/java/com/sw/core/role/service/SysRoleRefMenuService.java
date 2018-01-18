package com.sw.core.role.service;

import com.sw.core.base.BaseService;
import com.sw.core.role.domain.SysRoleRefMenu;

/**
 * @项目：sw
 * @包：com.sw.core.role.service
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 17:12 2018/1/18.
 */
public interface SysRoleRefMenuService extends BaseService<SysRoleRefMenu, String> {
    void insertRoleRefMenu(String menuIds, String roleId);
}
