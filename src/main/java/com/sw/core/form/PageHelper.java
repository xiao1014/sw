package com.sw.core.form;

/**
 * @项目：sw
 * @包：com.sw.core.form
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 16:16 2018/1/8.
 * @ModifyDate: Modify on 16:16 2018/1/8.
 * @ModifyDescritpion：null
 */
public class PageHelper {
    private int offset;// 当前记录
    private int limit;// 显示几条
    private String sort;// 排序字段
    private String order;// asc/desc

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
