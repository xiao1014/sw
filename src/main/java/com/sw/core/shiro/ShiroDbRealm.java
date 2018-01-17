package com.sw.core.shiro;

import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import com.sw.core.user.service.impl.UserServiceImpl;
import com.sw.core.util.security.Encodes;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @项目：sw
 * @包：com.sw.core.shiro
 * @Descritpion:
 * @Author: xiaojj
 * @Date: Created on 16:39 2017/12/20.
 * @ModifyDate: Modify on 16:39 2017/12/20.
 * @ModifyDescritpion：null
 */
@Component
public class ShiroDbRealm extends AuthorizingRealm {
    @Resource
    private UserService userService;
    public static final String SESSION_USER_KEY = "gray";

    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用,负责在应用程序中决定用户的访问控制的方法
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        User user = (User) SecurityUtils.getSubject().getSession().getAttribute(ShiroDbRealm.SESSION_USER_KEY);
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
//        info.addRole(user.getRole().trim());
        return info;
    }

    /**
     * 认证回调函数，登录信息和用户验证信息验证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authcToken) throws AuthenticationException {
        // 把token转换成User对象
        User userLogin = tokenToUser((UsernamePasswordToken) authcToken);
        // 验证用户是否可以登录
        String username = userLogin.getUsername();
        User userDb = userService.getUserBuAccountName(username);
        if(userDb == null)
            return null; // 异常处理，找不到数据
        // 设置session
        Session session = SecurityUtils.getSubject().getSession();
        session.setAttribute(ShiroDbRealm.SESSION_USER_KEY, userDb);

        //登陆的主要信息: 可以是一个实体类的对象, 但该实体类的对象一定是根据 token 的 username 查询得到的.
        Object principal = authcToken.getPrincipal();

        byte[] salt = Encodes.decodeHex(userDb.getSalt());
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
                principal, userDb.getPassword(), ByteSource.Util.bytes(salt), getName());
        return simpleAuthenticationInfo;
    }

    private User tokenToUser(UsernamePasswordToken authcToken) {
        User user = new User();
        user.setUsername(authcToken.getUsername());
        user.setPassword(String.valueOf(authcToken.getPassword()));
        return user;
    }

    /*//一定要写getset方法
    public UserServiceImpl getUserService() {
        return userService;
    }

    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }*/

    //init-method 配置.
    public void setCredentialMatcher(){
        HashedCredentialsMatcher  credentialsMatcher = new HashedCredentialsMatcher();
        credentialsMatcher.setHashAlgorithmName(UserServiceImpl.HASH_ALGORITHM);//MD5算法加密
        credentialsMatcher.setHashIterations(UserServiceImpl.HASH_INTERATIONS);//1024次循环加密
        setCredentialsMatcher(credentialsMatcher);
    }
}
