package com.sw.core.menu.service;

import com.sw.core.base.BaseService;
import com.sw.core.form.BsTable;
import com.sw.core.menu.domain.SysBackMenu;

import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.menu.service
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 11:08 2018/1/12.
 */
public interface SysBackMenuService extends BaseService<SysBackMenu, String> {
    BsTable findMenuTable(String parentId);

    List<SysBackMenu> findMenuList(String parentId);

    void deleteAllById(String ids);

    List<SysBackMenu> findMenuListByRoleId(String roleId);
}
