package com.sw.core.base;

import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.base
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 9:19 2018/1/10.
 * @ModifyDate: Modify on 9:19 2018/1/10.
 * @ModifyDescritpion：null
 */
public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {
    public abstract BaseMapper getMapper();

    @Override
    public int deleteByPrimaryKey(ID id) {
        return getMapper().deleteByPrimaryKey(id);
    }

    @Override
    public void deleteByIds(String ids) {
        String[] idArr = ids.split(",");
        List<String> idList = new ArrayList<>();
        for (String id : idArr) {
            idList.add(id);
        }
        getMapper().deleteByIds(idList);
    }

    @Override
    public int insert(T entity) {
        return getMapper().insert(entity);
    }

    @Override
    public int insertSelective(T entity) {
        return getMapper().insertSelective(entity);
    }

    @Override
    public T selectByPrimaryKey(ID id) {
        return (T) getMapper().selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(T entity) {
        return getMapper().updateByPrimaryKeySelective(entity);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(T entity) {
        return getMapper().updateByPrimaryKeyWithBLOBs(entity);
    }

    @Override
    public int updateByPrimaryKey(T entity) {
        return getMapper().updateByPrimaryKey(entity);
    }

    @Override
    public T findById(ID id) {
        return (T) getMapper().findById(id);
    }

    @Override
    public BsTable findBsTableBySearchName(PageHelper pageHelper, String searchName) {
        BsTable bsTable = new BsTable();
        List rows = getMapper().findBsTableBySearchName(searchName == null ? "" : searchName.trim(),
                pageHelper.getOffset(), pageHelper.getLimit(), pageHelper.getSort(), pageHelper.getOrder());
        Long total = getMapper().countBySearchName(searchName);
        bsTable.setTotal(total);
        bsTable.setRows(rows);
        return bsTable;
    }
}
