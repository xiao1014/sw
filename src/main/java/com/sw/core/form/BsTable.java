package com.sw.core.form;

import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.form
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 16:19 2018/1/8.
 * @ModifyDate: Modify on 16:19 2018/1/8.
 * @ModifyDescritpion：null
 */
public class BsTable {
    private Long total;
    private List rows;

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }
}
