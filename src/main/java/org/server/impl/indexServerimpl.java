package org.server.impl;

import org.mapper.SonginfoMapper;
import org.pojo.Songinfo;
import org.server.indexServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ConcurrentModel;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
@Service
public class indexServerimpl implements indexServer {
    @Autowired
    SonginfoMapper songinfoMapper;
    @Override
    public void SongType(int type, String style ,Model model,int index) {
//        HttpServletRequest request;
        switch (type)
        {
            case 1:{
                int size=5;
                switch (style){
                    case "wntj":{
                      List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"1%");
                        model.addAttribute("Gqtjsize",songinfos.size());
                        model.addAttribute("Gqtj",fy(songinfos,index*size,(index+1)*size));
                    };break;
                    case "jdyy":{model.addAttribute("Gqtj",songinfoMapper.QueryTypeAndStyle(type,"_1%"));};break;
                    case "lx":{model.addAttribute("Gqtj",songinfoMapper.QueryTypeAndStyle(type,"__1%"));};break;
                    case "qg":{model.addAttribute("Gqtj",songinfoMapper.QueryTypeAndStyle(type,"___1%"));};break;
                    case "gfgd":{model.addAttribute("Gqtj",songinfoMapper.QueryTypeAndStyle(type,"____1%"));};break;
                    case "wlgq":{model.addAttribute("Gqtj",songinfoMapper.QueryTypeAndStyle(type,"_____1%"));};break;
                    default:break;
                }
            }
            case 2:{
                int size=12;
                    switch (style){
                        case "zx":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size));
                        };break;
                        case "ld":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"_1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size));
                        };break;
                        case "gt":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"__1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size));;};break;
                        case "om":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"___1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size)); };break;
                        case "hg":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"____1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size));};break;
                        case "rb":{
                            List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"_____1%");
                            model.addAttribute("Xgsfsize",songinfos.size());
                            model.addAttribute("Xgsf",fy(songinfos,index*size,(index+1)*size));};break;
                        default:break;
                    }
            }
            case 3:{
                int size=2;
                switch (style)
                {
                    case "jctj":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"1%");
                        model.addAttribute("Jctjsize",songinfos.size());
                        model.addAttribute("Jctj",fy(songinfos,index*size,(index+1)*size));};break;
                    default:break;
                }
            }
            case 4: {
                int size=10;
                switch (style){
                    case "ld":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size)); };break;
                    case "gt":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"_1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size));};break;
                    case "om":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"__1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size));};break;
                    case "hg":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"___1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size));};break;
                    case "rb":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"____1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size)); };break;
                    case "qt":{
                        List<Songinfo> songinfos= songinfoMapper.QueryTypeAndStyle(type,"_____1%");
                        model.addAttribute("Xdsfsize",songinfos.size());
                        model.addAttribute("Xdsf",fy(songinfos,index*size,(index+1)*size)); };break;
                    default:break;
                }
            }
            default:break;
        }
    }

    public List fy(List list,int start,int end)
    {
        List list1=new ArrayList();
        if(list.size()<end)
            end=list.size();
        for(int k=start;k<end;k++)
            list1.add(list.get(k));
        return list1;

    }
}
