package com.sw.core.menu.service.impl;

import com.sw.core.base.BaseMapper;
import com.sw.core.base.BaseServiceImpl;
import com.sw.core.form.BsTable;
import com.sw.core.menu.dao.SysBackMenuMapper;
import com.sw.core.menu.domain.SysBackMenu;
import com.sw.core.menu.service.SysBackMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.menu.service.impl
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 11:09 2018/1/12.
 * @ModifyDate: Modify on 11:09 2018/1/12.
 * @ModifyDescritpion：null
 */
@Service
public class SysBackMenuServiceImpl extends BaseServiceImpl<SysBackMenu, String> implements SysBackMenuService {
    @Resource
    private SysBackMenuMapper sysBackMenuMapper;
    @Override
    public BaseMapper getMapper() {
        return sysBackMenuMapper;
    }

    @Override
    public BsTable findMenuTable(String parentId) {
        BsTable bsTable = new BsTable();
        List row = sysBackMenuMapper.findMenuList(parentId);
        Long total = sysBackMenuMapper.countByParentId(parentId);
        bsTable.setRows(row);
        bsTable.setTotal(total);
        return bsTable;
    }

    @Override
    public List<SysBackMenu> findMenuList(String parentId) {
        List row = sysBackMenuMapper.findMenuList(parentId);
        return row;
    }

    @Override
    public void deleteAllById(String id) {
        sysBackMenuMapper.deleteByPid(id);
        deleteByPrimaryKey(id);
    }

    @Override
    public List<SysBackMenu> findMenuListByRoleId(String roleId) {
        return sysBackMenuMapper.findMenuListByRoleId(roleId);
    }
}
