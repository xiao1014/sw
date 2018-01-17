package com.sw.core.user.service.impl;

import com.sw.core.base.BaseMapper;
import com.sw.core.base.BaseServiceImpl;
import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;
import com.sw.core.user.dao.UserMapper;
import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import com.sw.core.util.CommonUtil;
import com.sw.core.util.security.Digests;
import com.sw.core.util.security.Encodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @项目：sw
 * @包：com.sw.core.user.service.impl
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 15:05 2017/12/20.
 * @ModifyDate: Modify on 15:05 2017/12/20.
 * @ModifyDescritpion：null
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User, String> implements UserService {
    /**加密方法*/
    public static final String HASH_ALGORITHM = "SHA-1";
    public static final int HASH_INTERATIONS = 1024;
    private static final int SALT_SIZE = 8;	//盐长度

    @Resource
    private UserMapper userMapper;

    @Override
    public BaseMapper getMapper() {
        return userMapper;
    }

    @Override
    public User getUserById(String id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public User getUserBuAccountName(String accountName) {
        User userDb = userMapper.selectByAccountName(accountName);
        return userDb;
    }

    @Override
    public void save(User user) {
        user.setId(CommonUtil.getUUID());
        entryptPassword(user);
        userMapper.insert(user);
    }

    /**
     * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
     */
    private void entryptPassword(User user) {
        byte[] salt = Digests.generateSalt(SALT_SIZE);
        user.setSalt(Encodes.encodeHex(salt));

        byte[] hashPassword = Digests.sha1(user.getPassword().getBytes(),salt, HASH_INTERATIONS);
        user.setPassword(Encodes.encodeHex(hashPassword));
    }

    /**
     * 验证原密码是否正确
     * @param user
     * @param oldPassword
     * @return
     */
    public boolean checkPassword(User user,String oldPassword){
        byte[] salt =Encodes.decodeHex(user.getSalt()) ;
        byte[] hashPassword = Digests.sha1(oldPassword.getBytes(),salt, HASH_INTERATIONS);
        if(user.getPassword().equals(Encodes.encodeHex(hashPassword))){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public String makePasswordByAccount(String accountName, String password) {
        User user = getUserBuAccountName(accountName);
        byte[] salt = Encodes.decodeHex(user.getSalt());
        byte[] hashPassword = Digests.sha1(password.getBytes(), salt, HASH_INTERATIONS);
        return Encodes.encodeHex(hashPassword);
    }

    @Override
    public BsTable findUserList(PageHelper pageHelper, String searchUser) {
        BsTable bsTable = new BsTable();
        List<User> userList = userMapper.findUserList(searchUser==null?"":searchUser.trim(), pageHelper.getOffset(), pageHelper.getLimit(),
                pageHelper.getSort(), pageHelper.getOrder());
        Long total = userMapper.count(searchUser);
        bsTable.setRows(userList);
        bsTable.setTotal(total);
        return bsTable;
    }

    @Override
    public void updateUserInfo(User user) {
        if (StringUtils.isNotBlank(user.getPassword())) {
            entryptPassword(user);
        }
        updateByPrimaryKeySelective(user);
    }
}
