package com.sw.core.role.dao;

import com.sw.core.base.BaseMapper;
import com.sw.core.role.domain.SysRoleRefMenu;

import java.util.List;

public interface SysRoleRefMenuMapper extends BaseMapper<SysRoleRefMenu, String> {
    int deleteByPrimaryKey(String id);

    int insert(SysRoleRefMenu record);

    int insertSelective(SysRoleRefMenu record);

    SysRoleRefMenu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysRoleRefMenu record);

    int updateByPrimaryKey(SysRoleRefMenu record);

    List<SysRoleRefMenu> findByRoleId(String roleId);

    void deleteByRoleId(String roleId);
}