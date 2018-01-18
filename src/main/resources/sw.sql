/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50637
Source Host           : localhost:3306
Source Database       : sw

Target Server Type    : MYSQL
Target Server Version : 50637
File Encoding         : 65001

Date: 2018-01-18 17:34:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_back_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_back_menu`;
CREATE TABLE `sys_back_menu` (
  `id` varchar(32) NOT NULL,
  `pid` varchar(32) DEFAULT NULL COMMENT '父节点名称',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `type` varchar(20) DEFAULT NULL COMMENT '类型:菜单or功能',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `url` varchar(255) DEFAULT NULL,
  `perm_code` varchar(50) DEFAULT NULL COMMENT '菜单编码',
  `icon` varchar(255) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `description` text,
  `default_open` int(11) DEFAULT NULL,
  `menu_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_back_menu
-- ----------------------------
INSERT INTO `sys_back_menu` VALUES ('09e8240252fa489d8872d3718734d814', '4c6e9c7bf43048ca9a87cf166c71705b', '大', null, '5', '#', null, 'glyphicon glyphicon-adjust', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('129abdf36e7a4daba68c463ec8ae6674', '', '消息管理', null, '4', '#', null, 'glyphicon glyphicon-headphones', null, null, '0', '1');
INSERT INTO `sys_back_menu` VALUES ('2a9a2cc2da6840bf9ee668949349ce35', '7f0c6a8f26fb4f7f923e16a290558c82', 'aaa-aaa', null, '1', '#', null, 'glyphicon glyphicon-ban-circle', null, null, '0', '3');
INSERT INTO `sys_back_menu` VALUES ('433a2a851aef4c099f8b3dab492635cf', '', '测试', null, '2', 'cs', null, 'glyphicon glyphicon-align-justify', null, null, '1', '1');
INSERT INTO `sys_back_menu` VALUES ('43da12c033e247529ac876b4eba2b243', '7f0c6a8f26fb4f7f923e16a290558c82', 'aaa-bbb', null, '2', '#', null, 'glyphicon glyphicon-arrow-right', null, null, '0', '3');
INSERT INTO `sys_back_menu` VALUES ('4c6e9c7bf43048ca9a87cf166c71705b', '', '系统管理', null, '1', '#', null, 'glyphicon glyphicon-asterisk', null, null, '1', '1');
INSERT INTO `sys_back_menu` VALUES ('5f5d36651ba742d2b5bdcca5746d4caa', '129abdf36e7a4daba68c463ec8ae6674', '测试1', null, null, '#', null, '', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('64d5d8782b87476a9c86275bfe02cc16', '4c6e9c7bf43048ca9a87cf166c71705b', '权限管理', null, '3', '#/back/resource/resourceListUi', null, 'glyphicon glyphicon-fire', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('678ad8f791a74e6ea06c5b66b745dedb', '433a2a851aef4c099f8b3dab492635cf', 'bbb', null, '2', '#', null, 'glyphicon glyphicon-bed', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('7f0c6a8f26fb4f7f923e16a290558c82', '433a2a851aef4c099f8b3dab492635cf', 'aaa', null, '1', '#aa', null, 'glyphicon glyphicon-link', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('81a85d1e342543b792d96b13883071c3', '4c6e9c7bf43048ca9a87cf166c71705b', '用户管理', null, '1', '/back/user/userListUi', null, 'glyphicon glyphicon-user', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('8da07e8a86554713a32006054c9e5720', '4c6e9c7bf43048ca9a87cf166c71705b', '角色管理', null, '2', '/back/role/roleListUi', null, 'glyphicon glyphicon-education', null, null, '0', '2');
INSERT INTO `sys_back_menu` VALUES ('8e6edca9d1fe431a8d40837e2acae03a', '', '日志管理', null, '3', '#', null, 'glyphicon glyphicon-list-alt', null, null, '0', '1');
INSERT INTO `sys_back_menu` VALUES ('a03bd8ed34db4d0d8e2285b0dd92e608', '', '测试环境', null, '5', '#', null, 'glyphicon glyphicon-compressed', null, null, '0', '1');
INSERT INTO `sys_back_menu` VALUES ('d008f14144ed4620a42deab9f1d99c6c', '678ad8f791a74e6ea06c5b66b745dedb', 'bbb-bbb', null, '1', '#', null, 'glyphicon glyphicon-btc', null, null, '0', '3');
INSERT INTO `sys_back_menu` VALUES ('dc5eb52e0ada46208a610c5e6a6195cd', '4c6e9c7bf43048ca9a87cf166c71705b', '菜单管理', null, '4', '/back/menu/menuListUi', null, 'glyphicon glyphicon-align-justify', null, null, '0', '2');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(32) NOT NULL,
  `name` varchar(20) NOT NULL,
  `role_code` varchar(20) NOT NULL,
  `description` text,
  `sort` smallint(6) DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('12725a7281354771b8a2222f790faede', '发多少', 'adminTest', 'description发多少', '3', null, '2018-01-17 10:04:42');
INSERT INTO `sys_role` VALUES ('58a907131fdb430985b5cfafd9c5ef64', '管理员', 'admin', '', '2', null, '2018-01-17 09:48:12');
INSERT INTO `sys_role` VALUES ('d6f3a991d02343e1b08260b42328f114', '暗室逢灯', 'adminTest111', '暗室逢灯暗室逢灯暗室逢灯', '1', null, '2018-01-17 08:02:02');

-- ----------------------------
-- Table structure for sys_role_ref_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_ref_menu`;
CREATE TABLE `sys_role_ref_menu` (
  `id` varchar(32) NOT NULL,
  `role_id` varchar(32) DEFAULT NULL,
  `menu_id` varchar(32) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_ref_menu
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `role_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3eaad63af4594881827ad4b687f0abcb', '发送到姓名爱的方式', 'b2ac7e9db34b7b07bd8051ca602843ed83276006', 'adminTest', 'c63a86d8417a023c', null);
INSERT INTO `user` VALUES ('5573a25aa244443ab28da9121d660775', '率阿斯蒂芬', 'd4b87e9f9abab8db35806ce443f6094813f47eca', 'adminTest', 'f4fe1d2cb487fca3', null);
INSERT INTO `user` VALUES ('74f2f9e29228409d849401b9e11b2391', '超级管理员大', '551a33c578d1895d8ac1d529a00cff0e2b5089f7', 'superadmin', '4e59013c23032e00', null);
INSERT INTO `user` VALUES ('bcca40482b46496e883a99bfc117694d', '校俊杰', '2017bd55ef8cc7cc01ce51f145a7259728b5dd59', 'admin', '844524e29a2b97c9', null);
INSERT INTO `user` VALUES ('c3846c7e500f4263b03f7254b1d174cd', 'superadmin', '8f840bc318a775040ff57cd2d4aac562445fa808', 'superadmin', '526419f793b197d1', null);
INSERT INTO `user` VALUES ('d4de57c3342a4s26a0535e50363b9af8', '管理员11', '4e7fb449deedbe88c151654d28873b44b606f6e2', 'admin2', '5983b1702cf4e52a', null);
INSERT INTO `user` VALUES ('da10b1420ca94166b62d7e2b354826af', '发送到', 'fe5a72610d2e6c2a66f678c5927b3711240d89de', 'admin123', '4473dabd2743aee3', null);
INSERT INTO `user` VALUES ('dcf2b3bbc01d4055a0422614676a01fb', '发多少', '3a7e6be86b789e10f6e9c56e7bb7676aad7fdc3e', 'asdffasd', '7da9380e0479b509', null);
INSERT INTO `user` VALUES ('ddf5a2b62a834240997a6f8c2a926659', '阿斯顿发出', '691c2fe725989d4605eb586297c0a4e52216500d', 'adminTest', 'fab02378d85527a9', null);
INSERT INTO `user` VALUES ('de10e989556b4c669d05a9cf86d0fcbe', '发多少', '424bb7fd6ef1cf13df59a81d9db95cce89447a7a', 'asdffasd', 'b5f1b8a2b8398949', null);
INSERT INTO `user` VALUES ('f132b76f183c42c5aea73fac204be300', '姓名cs', '1f85e52d23c043ae8800985cc118ca3347fedb44', 'adminTest', '6eb91031c0c364ce', null);
