package org.server.impl;

import org.mapper.SonginfoMapper;
import org.pojo.Songinfo;
import org.server.PlayerServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerServerimpl implements PlayerServer {
    @Autowired
    SonginfoMapper songinfoMapper;

    private  static volatile List<Songinfo> songinfoList=new ArrayList<>();

    public  List<Songinfo> getSonginfoList() {
        return songinfoList;
    }
    public  void setSonginfoList(Songinfo songinfo)
    {
        if(!songinfoList.isEmpty()) {
            boolean fl=false;
            for (Songinfo info : songinfoList)
                if (songinfo.getId().equals(info.getId()))
                    fl=true;
                if(!fl)
                    songinfoList.add(songinfo);
        }
        else{
            songinfoList.add(songinfo);
        }
    }
    @Override
    public void Serchidinfo(int id, Model model) {
        Songinfo songinfo= songinfoMapper.QueryByIdInfo(id);
        setSonginfoList(songinfo);
        model.addAttribute("playlist",getSonginfoList());
        model.addAttribute("thisplay",songinfo);
    }

}
