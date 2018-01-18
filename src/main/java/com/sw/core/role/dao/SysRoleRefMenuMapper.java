package com.sw.core.role.dao;

import com.sw.core.role.domain.SysRoleRefMenu;

public interface SysRoleRefMenuMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysRoleRefMenu record);

    int insertSelective(SysRoleRefMenu record);

    SysRoleRefMenu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysRoleRefMenu record);

    int updateByPrimaryKey(SysRoleRefMenu record);
}