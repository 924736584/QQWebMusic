package org.server.impl;

import org.mapper.SonginfoMapper;
import org.pojo.Songinfo;
import org.pojo.Songsytype;
import org.server.StartIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StartIndeximpl implements StartIndex {

    @Autowired
    SonginfoMapper songinfoMapper;
    @Override
    public List<Songinfo> QureyReMen(int type,String style) {
        return songinfoMapper.QueryTypeAndStyle(type,style);
    }
}
