package com.sw.core.user.dao;

import com.sw.core.base.BaseMapper;
import com.sw.core.user.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper extends BaseMapper<User, String> {
    User selectByAccountName(String accountName);

    List<User> findUserList(@Param("searchUser") String searchUser, @Param("offset") int offset,
                            @Param("limit") int limit, @Param("sort") String sort, @Param("order") String order);

    Long count(@Param("searchUser") String searchUser);
}