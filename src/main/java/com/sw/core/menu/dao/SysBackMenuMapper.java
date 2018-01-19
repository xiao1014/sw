package com.sw.core.menu.dao;

import com.sw.core.base.BaseMapper;
import com.sw.core.menu.domain.SysBackMenu;
import com.sw.core.user.domain.User;

import java.util.List;

public interface SysBackMenuMapper extends BaseMapper<SysBackMenu, String> {
    int deleteByPrimaryKey(String id);

    int insert(SysBackMenu record);

    int insertSelective(SysBackMenu record);

    SysBackMenu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysBackMenu record);

    int updateByPrimaryKeyWithBLOBs(SysBackMenu record);

    int updateByPrimaryKey(SysBackMenu record);


    List<User> findUserList(String s, int offset, int limit, String sort, String order);

    Long count(String searchMenu);

    List<SysBackMenu> findMenuList(String parentId);

    Long countByParentId(String parentId);

    void deleteByPid(String id);

    List<SysBackMenu> findMenuListByRoleId(String roleId);
}