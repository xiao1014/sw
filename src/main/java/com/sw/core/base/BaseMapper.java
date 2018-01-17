package com.sw.core.base;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.base
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 9:16 2018/1/10.
 */
public interface BaseMapper<T, ID extends Serializable> {
    int deleteByPrimaryKey(ID id);
    int insert(T entity);
    int insertSelective(T entity);
    T selectByPrimaryKey(ID id);
    int updateByPrimaryKeySelective(T entity);
    int updateByPrimaryKeyWithBLOBs(T entity);
    int updateByPrimaryKey(T entity);
    void deleteByIds(@RequestParam List<String> idList);
    T findById(ID id);

    List<T> findBsTableBySearchName(@Param("searchName") String searchName, @Param("offset") int offset,
                                    @Param("limit") int limit, @Param("sort") String sort, @Param("order") String order);

    Long countBySearchName(@Param("searchName") String searchName);
}
