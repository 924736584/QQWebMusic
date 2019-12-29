package org.server;

import org.pojo.Songinfo;
import org.util.TreamferValue;

import java.util.List;

public interface ValueMessage {
    List<Songinfo> QueryAllSonginfo(boolean bool);
    List<Songinfo> QuerySongTypeValue(String type);
    String UpdataValue(int index,List<String> data);
    int insertAndUpdateStype(int index,String songinfo);

    TreamferValue GetMydataBytype(Songinfo songinfo,String type);
}
