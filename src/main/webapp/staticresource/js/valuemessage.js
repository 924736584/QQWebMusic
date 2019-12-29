var i = 0;

function Htmlonload() {
    var massteritem = document.getElementsByClassName("massteritem");
    var inputslist = createList();
    for (var ix=1; ix < massteritem.length; ix++) {
        var ele = createdisplay(inputslist[ix - 1], ix);
        massteritem[ix].appendChild(ele);
    }
    Mypage=0;
}
function createList()
{
    var Bulist=["为你推荐", "经典粤语",
        "流行","情歌","官方歌单","网络歌曲", "最新",
        "内地", "港台","欧美","韩国","日本","其他",
        "当前显示"];
    var buna=[];
    for(var i=0;i<4;i++)
    {
        var sli=[];
        if(i==0)
            for(var k=0;k<6;k++)
                sli[k]=Bulist[k];
       else if(i==1)
            for(var k=6;k<12;k++)
                sli[k-6]=Bulist[k];
        else if(i==2)
                sli[0]=Bulist[13];
        else if(i==3)
            for(var k=7;k<13;k++)
                sli[k-7]=Bulist[k];
        buna[i]=sli;
    }
    return buna;
}
/**
 * 添加主按钮的监听
 * @param _this
 */
function openinter(_this) {
    var displays = document.getElementsByClassName("display");
    var parent = _this.parentNode;
    var displayP = parent.getElementsByClassName("display").item(0);
    i++;
    if (i % 2 != 0) {
        displayP.style.display = "none";
        return;
    }
    for (var k = 0; k < displays.length; k++) {
        displays[k].style.display = "none";
    }
    var parent = _this.parentNode;
    var displayP = parent.getElementsByClassName("display").item(0);
    displayP.style.display = "block";
    butnEvent(_this,1);
}
//创建子按钮
function createdisplay(lists, flog) {
    var ele = document.createElement("div");
    ele.setAttribute("class", "display");
    for (var i = 0; i < lists.length; i++) {
        var buttons = document.createElement("button");
        buttons.setAttribute("class", "sonButton");
        buttons.setAttribute("index", flog);
        buttons.setAttribute("sonind", i);
        buttons.setAttribute("onclick","butnEvent(this,1)");
        buttons.innerText = lists[i];
        ele.appendChild(buttons);
    }
    ele.style.display = "none";
    return ele;
}

var cy;
function butnEvent(_this,cy) {
    var index = _this.getAttribute("index");
    /**
     * 标题名称
     * @type {Array}
     */
    var listName = [];
    var trValue = [];
    var serveraddrs;
    var listValue=[];
    var tableinterface = document.getElementById("righttable");
    switch (index) {
        /**
         * 全部歌曲
         */
        case "0":{
            serveraddrs= "http://localhost:8080/QQMusicWeb_war_exploded/admin/valueall";
            var senddata= new Array("page="+Mypage, "size=100");
            var styles = "GET";
            responValue=  Ajaxrequest(serveraddrs, senddata, styles);
             var obj= eval("(" + responValue + ")");
            var lsitvalues = obj.data;
            listName = new Array("歌曲Id", "曲目1", "歌手","播放量","歌曲推荐", "新歌首发", "精彩推荐", "新碟首发");
            for (var gus = 0; gus < lsitvalues.length; gus++) {
                var jsonobj = lsitvalues[gus];
                valueArr = new Array(jsonobj.id, jsonobj.songname, jsonobj.songer,jsonobj.playnum,jsonobj.type);
                listValue[gus] = valueArr;
            }
        } ;break;
        /**
         * 推荐歌曲
         */
        case "1": {
            var responValue;
            var styles = "GET";
            serveraddrs = "http://localhost:8080/QQMusicWeb_war_exploded/admin/songtype";
            if(!_this.hasAttribute('sonind'))
            {
                var senddata = new Array("type=Gqti");
                var styles = "GET";
                responValue=  Ajaxrequest(serveraddrs, senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                listName = new Array("歌曲ID", "曲目", "歌手","播放量", "为你推荐", "经典粤语", "流行", "情歌", "官方歌单","网络歌曲");
                for (var gus = 0; gus < lsitvalues.length; gus++) {
                    var jsonobj = lsitvalues[gus];
                        var valueArr = new Array(jsonobj.id, jsonobj.songname, jsonobj.songer,jsonobj.playnum,jsonobj.type);
                    listValue[gus] = valueArr;
                }
            }
            else{
                var sonind=_this.getAttribute("sonind");
                var senddata = new Array("type=Gqti");
                responValue=  Ajaxrequest(serveraddrs,senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                var tableda=[];
                switch (sonind) {
                    case "0":{
                        tableda= sonbuttonEvent("1","0",lsitvalues);
                    };break;
                    case "1":{
                        tableda= sonbuttonEvent("1","1",lsitvalues);
                    };break;
                    case "2":{
                        tableda= sonbuttonEvent("1","2",lsitvalues);
                    };break;
                    case "3":{
                        tableda= sonbuttonEvent("1","3",lsitvalues);
                    };break;
                    case "4":{
                        tableda=  sonbuttonEvent("1","4",lsitvalues);
                    };break;
                    case "5":{
                        tableda= sonbuttonEvent("1","5",lsitvalues);
                    };break;
                }
                listName=tableda[0];
                listValue=tableda[1];
            }

        };break;
        case "2": {
            serveraddrs = "http://localhost:8080/QQMusicWeb_war_exploded/admin/songtype";
            listName = new Array("歌曲ID", "曲目", "歌手", "播放量", "最新", "内地", "港台", "欧美","韩国","日本");
            if(!_this.hasAttribute('sonind'))
            {
                var senddata = new Array("type=Xgsf");
                var styles = "GET";
                responValue=  Ajaxrequest(serveraddrs, senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                for (var gus = 0; gus < lsitvalues.length; gus++) {
                    var jsonobj = lsitvalues[gus];
                        var valueArr = new Array(jsonobj.id, jsonobj.songname, jsonobj.songer,jsonobj.playnum,jsonobj.type);
                    listValue[gus] = valueArr;
                }
            }
            else{
                var sonind=_this.getAttribute("sonind");
                var senddata = new Array("type=Xgsf");
                responValue=  Ajaxrequest(serveraddrs,senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                var tableda=[];
                switch (sonind) {
                    case "0":{
                        tableda= sonbuttonEvent("2","0",lsitvalues);
                    };break;
                    case "1":{
                        tableda= sonbuttonEvent("2","1",lsitvalues);
                    };break;
                    case "2":{
                        tableda= sonbuttonEvent("2","2",lsitvalues);
                    };break;
                    case "3":{
                        tableda= sonbuttonEvent("2","3",lsitvalues);
                    };break;
                    case "4":{
                        tableda=  sonbuttonEvent("2","4",lsitvalues);
                    };break;
                    case "5":{
                        tableda= sonbuttonEvent("2","5",lsitvalues);
                    };break;
                }
                listName=tableda[0];
                listValue=tableda[1];
            }
        };break;
        case "3": {
            serveraddrs = "http://localhost:8080/QQMusicWeb_war_exploded/admin/songtype";
            listName = new Array("歌曲ID", "曲目", "歌手", "播放量","当前显示");
            if(!_this.hasAttribute('sonind'))
            {
                var senddata = new Array("type=Jctj");
                var styles = "GET";
                responValue=  Ajaxrequest(serveraddrs, senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                for (var gus = 0; gus < lsitvalues.length; gus++) {
                    var jsonobj = lsitvalues[gus];
                        var valueArr = new Array(jsonobj.id, jsonobj.songname, jsonobj.songer,jsonobj.playnum,jsonobj.type);
                    listValue[gus] = valueArr;
                }
            }
            else{
                var sonind=_this.getAttribute("sonind");
                var senddata = new Array("type=Jctj");
                responValue=  Ajaxrequest(serveraddrs,senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                var tableda=[];
                switch (sonind) {
                    case "0":{
                        tableda= sonbuttonEvent("3","0",lsitvalues);
                    };break;
                    default:break;
                }
                listName=tableda[0];
                listValue=tableda[1];
            }
        };
            break;
        case "4": {
            serveraddrs = "http://localhost:8080/QQMusicWeb_war_exploded/admin/songtype";
            listName = new Array("歌曲ID", "曲目", "歌手", "播放量", "内地", "港台", "欧美","韩国","日本","其他");
            if(!_this.hasAttribute('sonind'))
            {
                var senddata = new Array("type=Xdsf");
                var styles = "GET";
                responValue=  Ajaxrequest(serveraddrs, senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                for (var gus = 0; gus < lsitvalues.length; gus++) {
                    var jsonobj = lsitvalues[gus];
                        var valueArr = new Array(jsonobj.id, jsonobj.songname, jsonobj.songer,jsonobj.playnum,jsonobj.type);
                    listValue[gus] = valueArr;
                }
            }
            else{
                var sonind=_this.getAttribute("sonind");
                var senddata = new Array("type=Xgsf");
                responValue=  Ajaxrequest(serveraddrs,senddata, styles);
                var obj = eval("(" + responValue + ")");
                var lsitvalues = obj.data;
                var tableda=[];
                switch (sonind) {
                    case "0":{
                        tableda= sonbuttonEvent("4","0",lsitvalues);
                    };break;
                    case "1":{
                        tableda= sonbuttonEvent("4","1",lsitvalues);
                    };break;
                    case "2":{
                        tableda= sonbuttonEvent("4","2",lsitvalues);
                    };break;
                    case "3":{
                        tableda= sonbuttonEvent("4","3",lsitvalues);
                    };break;
                    case "4":{
                        tableda=  sonbuttonEvent("4","4",lsitvalues);
                    };break;
                    case "5":{
                        tableda= sonbuttonEvent("4","5",lsitvalues);
                    };break;
                }
                listName=tableda[0];
                listValue=tableda[1];
            }
        };break;
        default:
            break;
    }
    var tablesentiy = createTable(listName, listValue, trValue,cy);
    if(cy) {
        //添加表格类容
        tableinterface.appendChild(tablesentiy);
        //添加刷新按钮事件
        setruferEvent(index);
        Mypage=0;
    }
    MyTable=listName;
    MyServerAddrs=serveraddrs;
    OnButton=_this;
    TableElement=tablesentiy;
}

//处理表格，建立格式各样的表格类型
//@Param _this当前的节点
//@Param listName表头内容
//@Param value表的数据
//@Param tableValuetr存储表的数据行信息
function createTable(listName, value, tableValuetr,clean) {
    //	创建前删除其他table,当前是否选择了删除
    if (clean){
        var oldele = document.getElementsByTagName("table");
    while (oldele.length > 0) {
        for (var sfk = 0; sfk < oldele.length; sfk++) {
            oldele[sfk].remove();
        }
    }
    }
    var ele = document.createElement("table");
    ele.setAttribute("border", " ");
    ele.setAttribute("cellspacing", " ");
    ele.setAttribute("cellpadding", " ");
    ele.setAttribute("id", "mytable");
    var tr = document.createElement("tr");
    //创建表头复选
    var Cth=document.createElement("th");
    Cth.setAttribute("width","25px");
    Cth.innerHTML="<input type='checkbox' id='checkall'/>";
    tr.appendChild(Cth);

    for (var is = 0; is < listName.length; is++) {
        var th = document.createElement("th");
        th.innerText = listName[is];
        tr.appendChild(th);
    }
    ele.appendChild(tr);
    for (var isk = 0; isk < value.length; isk++) {
        var trs = document.createElement("tr");
      tableValuetr[isk]=trs;
        /**
         * 创建行首复选
         * @type {HTMLTableDataCellElement}
         */
        var std = document.createElement("td");
        var Scheckbox = document.createElement("input");
        Scheckbox.setAttribute("type", "checkbox");
        Scheckbox.setAttribute("name","dcheck");
        std.appendChild(Scheckbox);
        trs.appendChild(std);
        /**
         * 创建内容
         */
    for (var sfg = 0; sfg < value[isk].length; sfg++) {
                if (sfg==value[isk].length-1) {
                    var strin=value[isk][sfg].split("");
                    for(var is=0; is< strin.length;is++) {
                        var td = document.createElement("td");
                        var checkboxs = document.createElement("input");
                        checkboxs.setAttribute("type", "checkbox");
                        checkboxs.setAttribute("name", "trcheck");
                        if (strin[is] == 1) {
                            checkboxs.setAttribute("value", "1");
                            checkboxs.checked = true;
                        } else {
                            checkboxs.setAttribute("value", "0");
                            checkboxs.checked = false;
                        }
                        td.appendChild(checkboxs);
                        trs.appendChild(td);
                    }

                } else {
                    var td1 = document.createElement("td");
                    td1.innerText = value[isk][sfg];
                    trs.appendChild(td1);
                }


            }
        ele.appendChild(trs);
    }
    CurrenttableEvent(tableValuetr);
    //全部数据添加到存储容器中
    allColumtr(tableValuetr);
    if(clean) {
        return ele;
    }
    else {
        return tableValuetr;
    }
}
var responValue;

/**
 * 使用的同步方法
 * @param serveraddrs 请求地址
 * @param senddata 发送的数据，传入数组new Array("key=value")
 * @param styles 请求方式
 * @returns {*}
 * @constructor
 */
function Ajaxrequest(serveraddrs, senddata, styles) {
    var xmlHttpRequest = new XMLHttpRequest();
    var sendDatas = "";
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            responValue = xmlHttpRequest.responseText;
        }
    }
    switch (styles) {
        case "POST": {
            xmlHttpRequest.open(styles, serveraddrs);
            if (senddata.length < 0) {
                xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttpRequest.send(null);
            } else {
                for (var vk = 0; vk < senddata.length; vk++) {
                    if (vk = 0) {
                        sendDatas = sendDatas + senddata[vk];
                    } else {
                        sendDatas = sendDatas + "," + senddata[vk];
                    }
                }
                xmlHttpRequest.send(sendDatas);
            }
        };
            break;
        case "GET": {
            if (senddata.length < 0) {
                xmlHttpRequest.open(styles, serveraddrs, false);
                xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            } else {
                for (var vk = 0; vk < senddata.length; vk++) {
                    if (vk == 0) {
                        sendDatas = sendDatas + senddata[vk];
                    } else {
                        sendDatas = sendDatas + "&" + senddata[vk];
                    }
                }
                var url = serveraddrs + "?" + sendDatas + "&" + "date=" + new Date();
                xmlHttpRequest.open(styles, url, false);
                xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xmlHttpRequest.send(null);
        };
            break;
        default:
            break;
    }
    return responValue;
}

/**
 * 小按钮的操作
 * @param indexid
 * @param sonid
 * @param Objlist
 * @returns {[][]}
 */
function sonbuttonEvent(indexid,sonid,Objlist)
{
    var TableTitle=[];
    var listvalue=new Array();
  var HeardArray=new Array(
      "歌曲ID","曲目","歌手","播放量","歌曲推荐",
      "新歌首发", "精彩推荐","新碟首发","为你推荐", "经典粤语",
      "流行","情歌","官方歌单","网络歌曲", "最新",
      "内地", "港台","欧美","韩国","日本",
      "其他", "当前显示");
  var TableTitleindex;
  switch (indexid) {
      //歌曲推荐
    case "1":{
       TableTitleindex=new Array(0,1,2,3,8,9,10,11,12,13);
      for(var tg=0;tg<TableTitleindex.length;tg++)
      {
          var indexnu=Number(TableTitleindex[tg]);
        TableTitle[tg]=HeardArray[indexnu];
      }
        switch (sonid) {
          //为你推荐
          case "0":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[0]=="1")
              {
                var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                    Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                listvalue.push(thisArray);
              }
            }
          };break;
          //经典粤语
          case "1":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
                if(Objlist[ksg].type.split("")[1]=="1")
                {
                    var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                        Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                    listvalue.push(thisArray);
                }
            }
          };break;
          case "2":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
                if(Objlist[ksg].type.split("")[2]=="1")
                {
                    var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                        Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                    listvalue.push(thisArray);
                }
            }
          };break;
          case "3":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
                if(Objlist[ksg].type.split("")[3]=="1")
                {
                    var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                        Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                    listvalue.push(thisArray);
                }
            }
          };break
          case "4":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
                if(Objlist[ksg].type.split("")[4]=="1")
                {
                    var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                        Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                    listvalue.push(thisArray);
                }
            }
          };break;
          case "5":{
            for(var ksg=0;ksg<Objlist.length;ksg++){
                if(Objlist[ksg].type.split("")[5]=="1")
                {
                    var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                    Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                    listvalue.push(thisArray);
                }
            }
          };break;
            default:break;
        }
    };break;
    //新歌首发
    case "2":{
      TableTitleindex =new Array(0,1,2,3,14,15,16,17,18,19);
      for(var tg=0;tg<TableTitleindex.length;tg++)
      {
        TableTitle[tg]=HeardArray[TableTitleindex[tg]];
      }
      switch (sonid) {
          //最新
        case "0":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[0]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
        //内地
        case "1":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[1]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
        //港台
        case "2":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[2]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
        //欧美
        case "3":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[3]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
        //韩国
        case "4":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[4]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
        //日本
        case "5":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[5]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
      }
    };break;
    //精彩推荐
    case "3":{
      TableTitleindex =new Array(0,1,2,3,21);
      for(var tg=0;tg<TableTitleindex.length;tg++)
      {
        TableTitle[tg]=HeardArray[TableTitleindex[tg]];
      }
      switch (sonid) {
          //最新
        case "0":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[0]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
      }
    };break;
    //新碟首发
    case "4":{
      TableTitleindex =new Array(0,1,2,3,15,16,17,18,19,20);
      for(var tg=0;tg<TableTitleindex.length;tg++)
      {
        TableTitle[tg]=HeardArray[TableTitleindex[tg]];
      }
      switch (sonid) {
          //内地
        case "0":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[0]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
          //港台
        case "1":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[1]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
          //欧美
        case "2":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[2]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
          //韩国
        case "3":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[3]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
          //韩国
        case "4":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[4]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
          //日本
        case "5":{
          for(var ksg=0;ksg<Objlist.length;ksg++){
              if(Objlist[ksg].type.split("")[5]=="1")
              {
                  var thisArray=new Array(Objlist[ksg].id,Objlist[ksg].songname,
                      Objlist[ksg].songer,Objlist[ksg].playnum,Objlist[ksg].type);
                  listvalue.push(thisArray);
              }
          }
        };break;
      }
    };break;
    default:break;
  }
  return new Array(TableTitle,listvalue);
}

/**
 * 表格 input监听
 */
function CurrenttableEvent(trDate)
{
    for(var thistr in trDate)
    {
        var inputElement=trDate[thistr].getElementsByTagName("input");
        for(var inx =0;inx< inputElement.length;inx++) {
            inputElement[inx].setAttribute("onclick","checkEvent(this)");
        }
    }
}


/**
 * 动态加载数据到表格
 */
var MyTable;
var MyServerAddrs;
var Mypage;
var OnButton;
var TableElement=new Array();
function tablevalueScrollAdd() {

    if(OnButton.getAttribute("index")==0) {
        Mypage++;
        butnEvent(OnButton, 0);
        var Tablethis = document.getElementById("mytable");
        for (var ik = 0; ik < TableElement.length; ik++)
            Tablethis.appendChild(TableElement[ik]);
    }
}

/**
 * 行选事件监听
 */
function checkEvent(_this) {
    var trcol=_this.parentNode.parentNode;
    var thistd=trcol.getElementsByTagName("td");
    var boucheck=trcol.getElementsByTagName("input");
    var trvalue="";
    for(var j=0;j<thistd.length;j++)
    {
        if(thistd[j].innerText!="")
    trvalue+=thistd[j].innerText+"&";
    }
    for(var i=0;i<boucheck.length;i++) {
        if (boucheck[i].getAttribute("name") == "trcheck") {
            trvalue=boucheck[i].checked?trvalue+="1":trvalue += "0";
        }
    }
    updataclonum(trvalue);
    return trvalue;
}
/**
 * 获得当前全部行的信息
 * 保存原始下信息
 */
var allDataArry=new Array();
function allColumtr(trinfo) {

    //trinfo转换为当字符格式
    //---&--&11101;
    for(var i=0;i<trinfo.length;i++)
    {
        var strvalue="";
        var trvalue=trinfo[i].getElementsByTagName("td");
        var boucheck=trinfo[i].getElementsByTagName("input");
        for(var j=0;j<trvalue.length;j++)
        {
            if(trvalue[j].innerText!="")
            strvalue+=trvalue[j].innerText+"&";
        }
        for(var k=0;k<boucheck.length;k++) {
            if (boucheck[k].getAttribute("name") == "trcheck") {
                strvalue=boucheck[k].checked?strvalue += "1": strvalue += "0";
            }
        }
        allDataArry[allDataArry.length]=strvalue;
    }
}
/**
 * 获取修改行的信息
 */
//存储修改行的信息
var upDataArray=new Array();
function updataclonum(trvalue)
{
    //与原始数据比较是否存入
    var songID=trvalue.split("&")[0];
    var Yvalue;
    for(var i=0,k=allDataArry.length-1;i<allDataArry.length ,k>0;i++,k--)
    {   var dt1=allDataArry[i].split("&")[0];
        var dt2=allDataArry[k].split("&")[0];
        if(songID==dt1 || songID==dt2)
        {
            Yvalue=songID==dt1?allDataArry[i]:allDataArry[k];
            break
        }
    }
   if(Yvalue!=trvalue)
   {
       var flog=false;
       var kis;
       for(var ki=0;ki<upDataArray.length;ki++)
       {
           var dtr1=upDataArray[ki].split("&")[0];
           if(dtr1==songID)
           {
               flog=true;
               kis=ki;
               break;
           }
       }
       if(!flog)
           upDataArray[upDataArray.length]=trvalue;
       else
           upDataArray[kis]=trvalue;
   }
   else{
       var num;
       var log=false;
       for(var ki=0;ki<upDataArray.length;ki++)
       {
           var dtr1=upDataArray[ki].split("&")[0];
           if(dtr1==songID)
           {
               log=true;
               num=ki;
               break;
           }
       }
       if(log)
       {
           upDataArray.splice(num,1);
       }
   }
}

//刷新按钮添加事件
function setruferEvent(index)
{
    var ruferButn=document.getElementById("rufer");
    ruferButn.setAttribute("onclick","savevalueToData("+index+")");
}
/**
 * 更新数据到数据库
 */
function savevalueToData(index)
{
    var Jsonvalue={};
    Jsonvalue['index']=index;
    Jsonvalue['data']=upDataArray;
    var xmlHttp=new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:8080/QQMusicWeb_war_exploded/admin/updateData");
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify(Jsonvalue);
    xmlHttp.onreadystatechange=function (ev) {
        if(xmlHttp.readyState==4 && xmlHttp.status==200) {
            alert("status=" + xmlHttp.status + "info:" + xmlHttp.responseText);
            allDataArry=new Array();
            allColumtr(document.getElementsByTagName("tr"));

        }
    };

    xmlHttp.send(data);
    upDataArray=new Array();

}




/**
 * 动态加载界面滚轮方法
 */
window.onscroll=function () {
var scrollHeight=document.body.scrollHeight;
var scrollTop=document.documentElement.scrollTop;
var clientHeight=document.documentElement.clientHeight;
if(scrollTop+clientHeight+20>scrollHeight){
    tablevalueScrollAdd();
}
}






