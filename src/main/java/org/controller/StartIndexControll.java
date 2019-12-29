package org.controller;

import org.pojo.Songinfo;
import org.server.impl.StartIndeximpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
public class StartIndexControll {
    @Autowired
    StartIndeximpl startIndeximpl;

    @RequestMapping("/index")
    public String indexHtml(Model model)
    {
        //查询歌曲推荐/为你推荐
        List<Songinfo> GqtjWntj=startIndeximpl.QureyReMen(1,"1%");
        List<Songinfo> XgsfZx=startIndeximpl.QureyReMen(2,"1%");
        List<Songinfo> JctjDqxs=startIndeximpl.QureyReMen(3,"1");
        List<Songinfo> XdsfNd=startIndeximpl.QureyReMen(4,"1%");
        model.addAttribute("Gqtj",GqtjWntj);
        model.addAttribute("Xgsf",XgsfZx);
        model.addAttribute("Jctj",JctjDqxs);
        model.addAttribute("Xdsf",XdsfNd);
        return "index";
    }

}
