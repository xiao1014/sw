package com.sw.core.base;

import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;

import java.io.Serializable;

/**
 * @项目：sw
 * @包：com.sw.core.base
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 9:17 2018/1/10.
 */
public interface BaseService<T, ID extends Serializable> {
    int deleteByPrimaryKey(ID id);
    void deleteByIds(String ids);
    int insert(T entity);
    int insertSelective(T entity);
    T selectByPrimaryKey(ID id);
    int updateByPrimaryKeySelective(T entity);
    int updateByPrimaryKeyWithBLOBs(T entity);
    int updateByPrimaryKey(T entity);
    T findById(ID id);
    BsTable findBsTableBySearchName(PageHelper pageHelper, String searchName);
}
