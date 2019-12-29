package org.controller;

import org.server.impl.indexServerimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Controller
public class indexContorll {
        @Autowired
    indexServerimpl indexServerimpl;
        @RequestMapping("/sourch")
    public String SourchType(@RequestParam("type") int type, @RequestParam("style") String Style, @RequestParam("page") int page,Model model)
        {
          indexServerimpl.SongType(type,Style,model,page);
          String addrs="";
          switch (type){
              case 1:addrs= "index::Gqtj_div";break;
              case 2:addrs=  "index::Xgsf_div";break;
              case 3:addrs=  "index::Jctj_div";break;
              case 4:addrs=  "index::Xdsf_div";break;
              default:break;
          }
          return addrs;
        }

}
