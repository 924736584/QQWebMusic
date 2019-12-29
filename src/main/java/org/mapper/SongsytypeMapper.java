package org.mapper;

import org.apache.ibatis.annotations.Param;
import org.pojo.Songsytype;

public interface SongsytypeMapper {
    int InsertValue(Songsytype songsytype);
Songsytype IsCheckSelect(@Param("id") int id,@Param("type")int type);
int DeleteLineBytypeAndId(@Param("id") int id,@Param("type")int type);
  int updateValue(Songsytype songsytype);
}