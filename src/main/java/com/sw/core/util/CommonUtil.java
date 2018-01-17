package com.sw.core.util;

import java.util.UUID;

public class CommonUtil {

    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }


    /**
     * OS:得到系统类型
     * <ul>
     * <li>W:windows
     * <li>L:linux
     * <li>O:other
     * @return
     */
    public static String OS(){

        final String OS=System.getProperties().getProperty("os.name");

        if( -1 != OS.toLowerCase().indexOf("windows") ){

            return "W";

        }else if(-1 != OS.toLowerCase().indexOf("linux")){

            return "L";

        }else{

            return "O";
        }
    }

    /**
     * 补齐不足长度
     * @param length 长度
     * @param number 数字
     * @return
     */
    public static String lpad(int length, int number) {
        String f = "%0" + length + "d";
        return String.format(f, number);
    }

}
