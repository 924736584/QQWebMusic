package org.util;

import java.util.ArrayList;
import java.util.List;

public class TableJsonDeal {
   private int index;
   private List<String> data=new ArrayList<>();

    public TableJsonDeal() {
    }

    public TableJsonDeal(int index, List<String> data) {
        this.index = index;
        this.data = data;
    }

    public int getIndex(){
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public List<String> getData() {
        return data;
    }

    public void setData(List<String> data) {
        this.data = data;
    }
}
