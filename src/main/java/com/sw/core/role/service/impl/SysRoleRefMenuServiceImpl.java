package com.sw.core.role.service.impl;

import com.sw.core.base.BaseMapper;
import com.sw.core.base.BaseServiceImpl;
import com.sw.core.role.dao.SysRoleRefMenuMapper;
import com.sw.core.role.domain.SysRoleRefMenu;
import com.sw.core.role.service.SysRoleRefMenuService;
import com.sw.core.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @项目：sw
 * @包：com.sw.core.role.service.impl
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 17:13 2018/1/18.
 * @ModifyDate: Modify on 17:13 2018/1/18.
 * @ModifyDescritpion：null
 */
@Service
public class SysRoleRefMenuServiceImpl extends BaseServiceImpl<SysRoleRefMenu, String>
        implements SysRoleRefMenuService {
    @Resource
    private SysRoleRefMenuMapper sysRoleRefMenuMapper;
    @Override
    public BaseMapper getMapper() {
        return sysRoleRefMenuMapper;
    }

    @Override
    public void insertRoleRefMenu(String menuIds, String roleId) {
        if(StringUtils.isNotBlank(menuIds) && StringUtils.isNotBlank(roleId)) {
            sysRoleRefMenuMapper.deleteByRoleId(roleId);
            if (StringUtils.isNotBlank(menuIds)) {
                String[] menuIdArr = menuIds.split(",");
                for (String menuId : menuIdArr) {
                    SysRoleRefMenu sysRoleRefMenu = new SysRoleRefMenu();
                    sysRoleRefMenu.setId(CommonUtil.getUUID());
                    sysRoleRefMenu.setMenuId(menuId);
                    sysRoleRefMenu.setRoleId(roleId);
                    sysRoleRefMenu.setCreateTime(new Date());
                    insert(sysRoleRefMenu);
                }
            }
        }
    }
}
