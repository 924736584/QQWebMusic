package org.pojo;

public class Songsytype {
    private Integer id;

    private Integer type=0;

    private String style="0";

    public Songsytype() {
    }

    public Songsytype(Integer id, Integer type, String style) {
        this.id = id;
        this.type = type;
        this.style = style;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }
}