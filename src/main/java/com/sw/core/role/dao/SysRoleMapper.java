package com.sw.core.role.dao;

import com.sw.core.base.BaseMapper;
import com.sw.core.role.domain.SysRole;

public interface SysRoleMapper extends BaseMapper<SysRole, String> {
    int deleteByPrimaryKey(String id);

    int insert(SysRole record);

    int insertSelective(SysRole record);

    SysRole selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysRole record);

    int updateByPrimaryKeyWithBLOBs(SysRole record);

    int updateByPrimaryKey(SysRole record);
}