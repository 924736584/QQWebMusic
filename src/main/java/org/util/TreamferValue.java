package org.util;

public class TreamferValue {
    private int id;
    private String songname;
    private String songer;
    private int playnum;
    private String type;

    public TreamferValue() {
    }

    public TreamferValue(int id, String songname, String songer, int playnum, String type) {
        this.id = id;
        this.songname = songname;
        this.songer = songer;
        this.playnum = playnum;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSongname() {
        return songname;
    }

    public void setSongname(String songname) {
        this.songname = songname;
    }

    public String getSonger() {
        return songer;
    }

    public void setSonger(String songer) {
        this.songer = songer;
    }

    public int getPlaynum() {
        return playnum;
    }

    public void setPlaynum(int playnum) {
        this.playnum = playnum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
