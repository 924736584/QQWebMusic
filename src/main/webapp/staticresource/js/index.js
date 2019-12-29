// /**
//  * Onload
//  */
function satartload() {
// 	//为板块内容添加了我监听
    new AddButtonEvent("Gqti", "chose");
    new AddButtonEvent("Xgsf", "itemchilk");
	new AddButtonEvent("Xdsf","xditems");
    fydou("Gqtjitems");
    fydou("Xgsfitems");
    fydou("Jctjitems");
    fydou("Xdsfitems");
    lanmu="wntj";
    xglm="zx";
    // //添加效果分页
    // Mysize(12,"Xgsf_div",440);
    // Mysize(10,"Xdsf_div",620);


}

//
//AddButonEvent()
function AddButtonEvent(ulID, functi) {
    this.ulID = ulID;
    this.functi = functi;
    //获取元素
    var fa = document.getElementById(ulID);
    var button = fa.children;
    for (var key = 0; key < button.length; key++) {
        button[key].setAttribute("onclick", functi + "(" + (key + 1) + ")");
    }
}

// /**
//  * 歌曲推荐JS
//  */
var lanmu;
function chose(r) {
    switch (r) {
        case 1: {
            lanmu="wntj"
            HttpRequest(1, "wntj",0);
        }
            ;
            break;
        case 2: {
            lanmu="jdyy"
            HttpRequest(1, "jdyy",0);
        }
            ;
            break;
        case 3: {
            lanmu="lx"
            HttpRequest(1, "lx",0);
        }
            ;
            break;
        case 4: {
            lanmu="qg"
            HttpRequest(1, "qg",0);
        }
            ;
            break;
        case 5: {
            lanmu="gfgd"
            HttpRequest(1, "gfgd",0);
        }
            ;
            break;
        case 6: {
            lanmu="wlgq"
            HttpRequest(1, "wlgq",0);
        };break;
    }
}

function sizej(pagenumber, pagesize) {
    var size = parseInt(pagenumber) * parseInt(pagesize);
    console.log(size);
    return size;
}

// //分页豆
function fydou(type) {
    var nums = document.getElementsByClassName(type).item(0);
    var zvalue=nums.getAttribute("value");
    var va;
    var num = 0;
    var alt = "";
    switch (type) {
        case "Gqtjitems":
            num = Math.ceil(zvalue / 5);
            alt = "gequtui";
            va = 0;
            break;
        case "Xgsfitems":
            num = Math.ceil(zvalue / 12);
            alt = "xinge";
            va = 1;
            break;
        case "Jctjitems":
            num = Math.ceil(zvalue/ 2);
            alt = "jctj";
            va = 2;
            break;
        case "Xdsfitems":
            num = Math.ceil(zvalue / 10);
            alt = "xdsf";
            va = 3;
            break;
        default:
            break
    }
    var gequul = document.getElementsByClassName("butn").item(va).getElementsByTagName("ul").item(0);
    while(gequul.children.length>0)
	{
		for(var kd=0;kd<gequul.children.length;kd++)
		{
			gequul.children[kd].remove();
		}
	}
    for (var i = 0; i < num; i++) {
        var ilb = document.createElement("i");
        ilb.setAttribute("class", "fyb");
        ilb.setAttribute("num", i);
        ilb.setAttribute("alt", alt);
        ilb.setAttribute("onclick", "btufy(this)");
        gequul.appendChild(ilb);
    }
}

function btufy(_this) {
    console.log(_this);
    var number = _this.getAttribute("num");
    var alt = _this.getAttribute("alt");
    switch (alt) {
        case "gequtui": {
            // var popcontenrt = document.getElementsByClassName("popcontenrt").item(0);
            // jump(number, popcontenrt, 1200);
            HttpRequest(1, lanmu,number);
        };
            break;
        case "xinge": {
            // var pop_item = document.getElementsByClassName("pop_item").item(0);
            // jump(number, pop_item, 1200);\
            HttpRequest(2, xglm,number);
        };break;
        case "xdsf":{
            HttpRequest(4,xdlm,number);
        };break;
        default:
            break;
    }
}

function jump(page, popelement, size) {
    var size = sizej(page, size);
    popelement.style.left = -size + "px";
}


/**
 * 新歌首发
 */
var xglm
function itemchilk(index)
{
	switch (index) {
		case 1:HttpRequest(2,"zx",0);xglm="zx";break;
		case 2:HttpRequest(2,"ld",0);xglm="ld";break;
		case 3:HttpRequest(2,"gt",0);xglm="gt";break;
		case 4:HttpRequest(2,"om",0);xglm="om";break;
		case 5:HttpRequest(2,"hg",0);xglm="hg";break;
		case 6:HttpRequest(2,"rb",0);xglm="rb";break;
		default:break
	}
}

/**
 * 精彩推荐
 */
/**
 * 新碟首发
 */
var xdlm
function xditems(index) {
	switch (index) {
		case 1:HttpRequest(4,"ld",0);xdlm="ld";break;
		case 2:HttpRequest(4,"gt",0);xdlm="gt";break;
		case 3:HttpRequest(4,"om",0);xdlm="om";break;
		case 4:HttpRequest(4,"hg",0);xdlm="hg";break;
		case 5:HttpRequest(4,"rb",0);xdlm="rb";break;
		case 6:HttpRequest(4,"qt",0);xdlm="qt";break;
		default:break
	}
}
/**
 * 服务器请求
 * @param type
 * @param style
 * @constructor
 */
function HttpRequest(type, style,page) {
    var xmlhttp = new XMLHttpRequest();
    var seraddrs = 'http://localhost:8080/QQMusicWeb_war_exploded/sourch?type=' + type + "&style=" + style+"&page="+page;
    xmlhttp.open("GET", seraddrs);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function (ev) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            switch (type) {
                case 1: {
                    var Gqtj = document.getElementsByClassName("Gqtj_div").item(0);
                    var pa=Gqtj.parentNode;
                    pa.removeChild(Gqtj);

                    pa.innerHTML=xmlhttp.response;
					fydou("Gqtjitems");
                }
                    ;
                    break;
                case 2: {
                    var Xgsf = document.getElementsByClassName("Xgsf_div").item(0);
                    var pa=Xgsf.parentNode;
                    pa.innerHTML=xmlhttp.response;
					fydou("Xgsfitems");
                }
                    ;
                    break;
                case 3: {
                    var Jctj = document.getElementsByClassName("Jctj_div").item(0);
                    var pa=Jctj.parentNode;
                    pa.innerHTML=xmlhttp.response;
					fydou("Jctjitems");
                }
                    ;
                    break;
                case 4: {
                    var Xdsf = document.getElementsByClassName("Xdsf_div").item(0);
                    var pa=Xdsf.parentNode;
                    pa.innerHTML=xmlhttp.response;
					fydou("Xdsfitems");
                };
                    break;
                default:
                    break;
            }
        }
    };
    xmlhttp.send(null);
}
function setCookie(name,value)
{
    document.cookie = name + "=" + escape(value) + "; path=/";
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
function palyer(_this)
{
        var xmlhttp = new XMLHttpRequest();
        var seraddrs = 'http://localhost:8080/QQMusicWeb_war_exploded/play/flush/'+_this.getAttribute("value");
        xmlhttp.open("GET", seraddrs);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.onreadystatechange=function (ev) {
            if(xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var items=document.getElementById("items");
                if(items==null)
                window.open('http://localhost:8080/QQMusicWeb_war_exploded/play/'+_this.getAttribute("value"));
                else
                    items.innerHTML=xmlhttp.response;
            }
        };
        xmlhttp.send(null);

}
// function Mysize(size,divid,height) {
// var sfg=document.getElementsByClassName(divid).item(0);
//     var num=sfg.getAttribute("value");
//     var lis=sfg.getElementsByTagName("li");
//     var divl=[]
//     for(var i=0;i<Math.ceil(num/size);i++)
//     {
//         var divgh
//         for( var k=i*size;k<(i+1)*size;k++) {
//             if(k>num)
//                 break;
//             else if (k % size == 0) {
//                 divgh = document.createElement("div");
//                 divl.push(divgh);
//             }
//             divgh.appendChild(lis[k]);
//         }
//     }
//     for(var vh=0;vh<divl.length;vh++)
//     {
//         divl[vh].style.width=1200+"px";
//         divl[vh].style.height=height+"px";
//         divl[vh].style.cssFloat="left";
//         sfg.appendChild(divl[vh]);
//     }
// }
//
// /**
//  * 精彩推荐
//  */
// function jctjitem() {
//
// }
//
// //歌曲推荐
// var GQTJArray;
// //新歌首发
// var XGSFArray;
// //精彩推荐
// var JCTJArray;
// //新碟首发
// var XDSFArray;
// function DealResonpose(type,obj){
// 	var Objlist=obj.data;
// 	switch (type) {
// 		case "Gqti": {
// 			GQTJArray=new Array();
// 			GQTJArray.push(Objlist);
// 		};break;
// 		case "Xgsf": {
// 			XGSFArray=new Array();
// 			XGSFArray.push(Objlist);
// 		};break;
// 		case "Jctj": {
// 			JCTJArray=new Array();
// 			JCTJArray.push(Objlist);
// 		};break;
// 		case "Xdsf": {
// 			XDSFArray=new Array();
// 			XDSFArray.push(Objlist);
// 		};break;
// 		default:break
// 	}
// }
