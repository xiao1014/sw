package com.sw.core.user;

import com.alibaba.fastjson.JSON;
import com.sw.core.form.BsTable;
import com.sw.core.form.PageHelper;
import com.sw.core.user.domain.User;
import com.sw.core.user.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)		//表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class UserServiceTest {
    private static Logger logger = LoggerFactory.getLogger(UserServiceTest.class);
    private ApplicationContext ac = null;
    @Resource
    private UserService userService = null;

	@Before
	public void before() {
		ac = new ClassPathXmlApplicationContext("spring-mybatis.xml");
		userService = (UserService) ac.getBean("userServiceImpl");
	}

    @Test
    public void testSave() {
        User user = new User();
        user.setAccountName("admin2");
        user.setUsername("管理员2");
        user.setPassword("123123");
        userService.save(user);
        // System.out.println(user.getUserName());
        // logger.info("值："+user.getUserName());
        logger.info(JSON.toJSONString(user));
    }

    @Test
    public void testCheckUserLogin() {
	    User user = new User();
	    user.setAccountName("admin");
        logger.info(JSON.toJSONString(userService.getUserBuAccountName(user.getAccountName())));
    }

    @Test
    public void testFindUserList() {
        PageHelper pageHelper = new PageHelper();
        pageHelper.setLimit(10);
        pageHelper.setOffset(0);
        pageHelper.setSort("id");
        pageHelper.setOrder("desc");
        BsTable userList = userService.findUserList(pageHelper, "");
        logger.info(userList.toString());
    }
}
