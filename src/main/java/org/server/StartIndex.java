package org.server;

import org.pojo.Songinfo;

import java.util.List;

public interface StartIndex {
    //获取文件信息初始文件信息
    //歌曲推荐，热门推荐
    List<Songinfo>  QureyReMen(int type,String style);
}
