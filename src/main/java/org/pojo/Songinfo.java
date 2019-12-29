package org.pojo;

import java.math.BigDecimal;

public class Songinfo {
    private Integer id;

    private String songname;

    private String songer;

    private String songword;

    private BigDecimal playnum;

    private Integer gqti;

    private Integer xgsf;

    private Integer jctj;

    private Integer xdsf;

    private Songsytype songsytype;

    public Songinfo() {
    }

    public Songinfo(Integer id, String songname, String songer, String songword, BigDecimal playnum, Integer gqti, Integer xgsf, Integer jctj, Integer xdsf) {
        this.id = id;
        this.songname = songname;
        this.songer = songer;
        this.songword = songword;
        this.playnum = playnum;
        this.gqti = gqti;
        this.xgsf = xgsf;
        this.jctj = jctj;
        this.xdsf = xdsf;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSongname() {
        return songname;
    }

    public void setSongname(String songname) {
        this.songname = songname == null ? null : songname.trim();
    }

    public String getSonger() {
        return songer;
    }

    public void setSonger(String songer) {
        this.songer = songer == null ? null : songer.trim();
    }

    public String getSongword() {
        return songword;
    }

    public void setSongword(String songword) {
        this.songword = songword == null ? null : songword.trim();
    }

    public BigDecimal getPlaynum() {
        return playnum;
    }

    public void setPlaynum(BigDecimal playnum) {
        this.playnum = playnum;
    }

    public Integer getGqti() {
        return gqti;
    }

    public void setGqti(Integer gqti) {
        this.gqti = gqti;
    }

    public Integer getXgsf() {
        return xgsf;
    }

    public void setXgsf(Integer xgsf) {
        this.xgsf = xgsf;
    }

    public Integer getJctj() {
        return jctj;
    }

    public void setJctj(Integer jctj) {
        this.jctj = jctj;
    }

    public Integer getXdsf() {
        return xdsf;
    }

    public void setXdsf(Integer xdsf) {
        this.xdsf = xdsf;
    }

    public Songsytype getSongsytype() {
        return songsytype;
    }

    public void setSongsytype(Songsytype songsytype) {
        this.songsytype = songsytype;
    }
}