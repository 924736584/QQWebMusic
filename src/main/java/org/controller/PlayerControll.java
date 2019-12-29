package org.controller;

import org.pojo.Songinfo;
import org.server.impl.PlayerServerimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Controller
public class PlayerControll {
    @Autowired
    PlayerServerimpl playerServerimpl;

    @RequestMapping("/play/{id}")
    public String palyIn(@PathVariable("id") int id, Model model)
    {
        ExecutorService service= Executors.newCachedThreadPool();
       Thread thread= new Thread(new Runnable() {
            @Override
            public void run() {
                playerServerimpl.Serchidinfo(id,model);
            }
        });
       service.submit(thread);
       service.shutdown();
       while (true) {
           if (service.isTerminated()) {
               break;
           }
       }
        return "Player";
    }
    @RequestMapping("/musicList")
    public String musicList(Model model)
    {
        model.addAttribute("playlist",playerServerimpl.getSonginfoList());
        return "musicList";
    }
    @RequestMapping("/wordsmusic")
    public String wordsmusic()
    {
        return "wordsmusic";
    }
    @RequestMapping("/play/flush/{id}")
    public String flushpage(@PathVariable("id") int id, Model model)
    {
        ExecutorService service= Executors.newCachedThreadPool();
        Thread thread= new Thread(new Runnable() {
            @Override
            public void run() {
                playerServerimpl.Serchidinfo(id,model);
            }
        });
        service.submit(thread);
        service.shutdown();
        while (true) {
            if (service.isTerminated()) {
                break;
            }
        }
        return "musicList::songitems";
    }
}
