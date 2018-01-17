package com.sw.core.role.service.impl;

import com.sw.core.base.BaseMapper;
import com.sw.core.base.BaseServiceImpl;
import com.sw.core.role.dao.SysRoleMapper;
import com.sw.core.role.domain.SysRole;
import com.sw.core.role.service.SysRoleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @项目：sw
 * @包：com.sw.core.role.service.impl
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 8:32 2018/1/17.
 * @ModifyDate: Modify on 8:32 2018/1/17.
 * @ModifyDescritpion：null
 */
@Service
public class SysRoleServiceImpl extends BaseServiceImpl<SysRole, String> implements SysRoleService {
    @Resource
    private SysRoleMapper sysRoleMapper;
    @Override
    public BaseMapper getMapper() {
        return sysRoleMapper;
    }
}
