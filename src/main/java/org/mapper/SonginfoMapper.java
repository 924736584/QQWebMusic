package org.mapper;

import org.apache.ibatis.annotations.Param;
import org.pojo.Songinfo;

import java.util.List;

public interface SonginfoMapper {

    /**
     *向数据库添加数据
     */
    void Songinfoinstall(Songinfo info);

    /**
     * flog? 查询全部数据:查询id,歌曲名,属于那个部分
     */
    List<Songinfo> QueryAllSonginfoVale(@Param("flog") boolean flog);
    /**
     * 根据id查询数据
     * flog?全部数剧:部分
     */
    List<Songinfo> QuerySonginfoValueById(@Param("id") int id, @Param("flog")boolean flog);
    /**
     * 修改数据
     */
    int UpdateSonginfoValue(Songinfo info);
    /**
     *删除数据根据Id
     */
    int DeleteSonginfovalue(Songinfo info);
    /**
     * 歌曲类型查询
     */
    List<Songinfo> QuerySongType(@Param("type") String type);

    /**
     * 通过id查询
     * @param id
     * @return
     */
    Songinfo QueryByIdInfo(@Param("id") int id);
    /**
     * 查询歌曲全部信息包括风格
     */
    Songinfo QueryInfoByType(@Param("id") int id,@Param("type") int  type);
    /**
     * 查询类型数据
     */
    List<Songinfo> QueryTypeAndStyle(@Param("type") int type,@Param("style") String style);
}