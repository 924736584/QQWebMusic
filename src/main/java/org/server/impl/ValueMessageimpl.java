package org.server.impl;

import com.sun.corba.se.impl.orbutil.concurrent.Sync;
import org.mapper.SonginfoMapper;
import org.mapper.SongsytypeMapper;
import org.pojo.Songinfo;
import org.pojo.Songsytype;
import org.server.ValueMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.util.TreamferValue;

import java.math.BigDecimal;
import java.nio.channels.AsynchronousSocketChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ValueMessageimpl implements ValueMessage {
    @Autowired
    SonginfoMapper songinfoMapper;
    @Autowired
    SongsytypeMapper songsytypeMapper;

    @Override
    public List<Songinfo> QueryAllSonginfo(boolean bool) {
        return songinfoMapper.QueryAllSonginfoVale(bool);
    }

    @Override
    public List<Songinfo> QuerySongTypeValue(String type) {
        return songinfoMapper.QuerySongType(type);
    }

    @Override
    public synchronized String UpdataValue(int index, List<String> data) {
        int iv = 0;
        switch (index) {
            case 0: {
                for (String strdata : data) {
                    Songinfo songinfo = new Songinfo();
                    String[] split = strdata.split("&");
                    char[] chars = split[4].toCharArray();
                    if (split.length > 0) {
                        songinfo.setId(Integer.parseInt(split[0]));
                        songinfo.setSongname(split[1]);
                        songinfo.setSonger(split[2]);
                        songinfo.setPlaynum(BigDecimal.valueOf(Double.parseDouble(split[3])));
                        if (chars.length > 0) {
                            songinfo.setGqti(Integer.parseInt(chars[0] + ""));
                            songinfo.setXgsf(Integer.parseInt(chars[1] + ""));
                            songinfo.setJctj(Integer.parseInt(chars[2] + ""));
                            songinfo.setXdsf(Integer.parseInt(chars[3] + ""));
                        }
                    }
                    iv += songinfoMapper.UpdateSonginfoValue(songinfo);
                    if (chars.length > 0) {
                        new Thread(new Runnable() {
                            @Override
                            public void run() {
                                insertAndUpdateStype(index, strdata);
                            }
                        }).start();
                    }
                }
            };break;
            default:
            {
                for (String strdata : data) {
                    Songsytype songsytype = new Songsytype();
                    String[] split = strdata.split("&");
                    String type="";
                    for(String s:split)
                        type=s;
                    songsytype.setId(Integer.parseInt(split[0]));
                    songsytype.setType(index);
                    songsytype.setStyle(type);
                    iv+=songsytypeMapper.updateValue(songsytype);
                }
            }
                break;
        }
        return "ok+一共修改" + iv + "条语句";
    }

    @Override
    public synchronized int insertAndUpdateStype(int index, String strdata) {
        //判断此id是否存在存在修改，不存在添加
        String[] strddata = strdata.split("&");
        int id = Integer.parseInt(strddata[0]);
        String types="";
        for(String s:strddata)
            types=s;
        if (index == 0) {
            //判断是否
            char[] charsv = types.toCharArray();
            int ix=1;
            for(char typev:charsv) {
                if ( (typev+"").equals("1")) {
                    if ((songsytypeMapper.IsCheckSelect(id,ix)) == null) {
                        String defa=ix==3?"0":"000000";
                        Songsytype songsytype = new Songsytype(id, ix, defa);
                        songsytypeMapper.InsertValue(songsytype);
                    }
                }
                else
                {
                    if ((songsytypeMapper.IsCheckSelect(id,ix)) != null) {
                        String defa=ix==3?"0":"000000";
                        songsytypeMapper.DeleteLineBytypeAndId(id,ix);
                    }
                }
                ix++;
            }
        }
        else {

            }
            return 0;
    }
    @Override
    public synchronized TreamferValue GetMydataBytype(Songinfo songinfo,String type) {
        Songinfo songinfoVa=null;
        switch (type)
        {
            case "Gqti":{
                songinfoVa=songinfoMapper.QueryInfoByType(songinfo.getId(),1);
            };break;
            case "Xgsf":{
                songinfoVa=songinfoMapper.QueryInfoByType(songinfo.getId(),2);
            };break;
            case "Jctj":{
                songinfoVa=songinfoMapper.QueryInfoByType(songinfo.getId(),3);
            };break;
            case "Xdsf":{
                songinfoVa=songinfoMapper.QueryInfoByType(songinfo.getId(),4);
            };break;
            default:break;
        }
        if(songinfoVa!=null) {
            TreamferValue treamferValue = new TreamferValue(songinfoVa.getId(), songinfoVa.getSongname(),
                    songinfoVa.getSonger(), songinfoVa.getPlaynum().intValue(), songinfoVa.getSongsytype().getStyle());
            return treamferValue;
        }
       return null;
    }
}
