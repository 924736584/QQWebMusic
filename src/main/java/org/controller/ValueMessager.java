package org.controller;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.pojo.Songinfo;
import org.server.impl.ValueMessageimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.util.TableJsonDeal;
import org.util.TreamferValue;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

@Controller
@RequestMapping("/admin")
public class ValueMessager {
    private static List<Songinfo> AllmapInfo=null;
    @Autowired
    ValueMessageimpl valueMessageimpl;
public synchronized void Allvalues()
{
        List<Songinfo> MydataList=valueMessageimpl.QueryAllSonginfo(false);
        AllmapInfo=MydataList;
}
    @RequestMapping("/index")
    public String MainHtmnl()
    {
        return "ValueMessage";
    }
    @ResponseBody
    @RequestMapping("/valueall")
    /**
     * 全部歌曲
     */
    public String QueryValue(@RequestParam("page") int i,@RequestParam("size") int size)
    {
        Map<String, List<TreamferValue>> mapdata=new HashMap<>();
        if(AllmapInfo==null)
            Allvalues();
        List<TreamferValue> MydataList=new ArrayList<>();
        for(int k=i*size;k<i*size+size;k++)
        {
            if(k<AllmapInfo.size()) {
                Songinfo songinfo=AllmapInfo.get(k);
                TreamferValue treamferValue=new TreamferValue();
                treamferValue.setId(songinfo.getId());
                treamferValue.setSongname(songinfo.getSongname());
                treamferValue.setSonger(songinfo.getSonger());
                StringBuilder builder=new StringBuilder();
                builder.append(songinfo.getGqti());
                builder.append(songinfo.getXgsf());
                builder.append(songinfo.getJctj());
                builder.append(songinfo.getXdsf());
                treamferValue.setPlaynum(songinfo.getPlaynum().intValue());
                treamferValue.setType(builder.toString());
                MydataList.add(treamferValue);
            }
        }
        mapdata.put("data",MydataList);
        JSON array= JSONObject.fromObject(mapdata);
        String Jsonvalue=array.toString();
        return Jsonvalue;
    }
    //获取歌曲类型歌单
    @ResponseBody
    @RequestMapping("/songtype")
    public String SongTuijian(@RequestParam("type") String type) throws Exception{
        ExecutorService service = Executors.newCachedThreadPool();
        if(AllmapInfo==null)
            Allvalues();
        Map<String, List<TreamferValue>> mapdata=new HashMap<>();
        List<TreamferValue> MydataList=new ArrayList<>();
        for(Songinfo songinfo:AllmapInfo)
        {
            Method getGqti = songinfo.getClass().getMethod("get"+type);
            Integer Leix=(Integer)getGqti.invoke(songinfo);
            if(Leix==1)
            {
             Thread thread= new Thread(new Runnable() {
                @Override
                public void run() {
                    TreamferValue treamferValue= valueMessageimpl.GetMydataBytype(songinfo,type);
                    if(treamferValue!=null)
                    MydataList.add(treamferValue);
                }
            });
             service.submit(thread);
            }
        }
        service.shutdown();
        while (true) {
            //等待所有任务都执行结束
            if (service.isTerminated()) {
                break;
            }
        }
            mapdata.put("data", MydataList);
            JSON array = JSONObject.fromObject(mapdata);
            String Jsonvalue = array.toString();
        return Jsonvalue;
    }
    @ResponseBody
    @RequestMapping("/updateData")
    public String upDataValue(@RequestBody TableJsonDeal tableJsonDeal)
    {
        ExecutorService service = Executors.newCachedThreadPool();
        int index=tableJsonDeal.getIndex();
        List<String> data=tableJsonDeal.getData();
        final String[] strvalue = {""};
        if(data.size()>0) {
           Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    strvalue[0] = valueMessageimpl.UpdataValue(index, data);
                    Allvalues();
                }
            });
           service.submit(thread);
        }
        service.shutdown();
        while (true) {
            //等待所有任务都执行结束
            if (service.isTerminated()) {
                break;
            }
        }
       return strvalue[0];
    }
}

