package org.server;

import org.pojo.Songinfo;
import org.springframework.ui.Model;

import java.util.List;

public interface indexServer {
    void SongType(int type, String style,Model model,int index);
}
