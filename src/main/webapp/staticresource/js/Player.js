function playerStyle(){
    var audio=document.getElementsByTagName("audio").item(0);
    var value=document.getElementById("value");
    var up=document.getElementsByClassName("up").item(0);
    var play=document.getElementsByClassName("play").item(0);
    var down=document.getElementsByClassName("down").item(0);
    var Onbar=document.getElementsByClassName("Onbar").item(0);
    var Onrunber=document.getElementsByClassName("Onrunder").item(0);
    var Ontime=document.getElementsByClassName("Ontime").item(0);
    var Currtime=document.getElementsByClassName("Currtime").item(0);
    var playlist=window.frames["listv"].document.getElementsByClassName("playli");
    var fa=document.getElementsByClassName("fa").item(0);
    var songna=document.getElementsByClassName("palysong").item(0);
    var songer=document.getElementsByClassName("songername").item(0);
    play.onclick=function () {
        if(audio.paused)
            audio.play();
        else
            audio.pause();
    }
    audio.ontimeupdate=function (ev) {
        Ontime.innerHTML=getMin(audio.duration);
        var pre = Math.floor(audio.currentTime / audio.duration * (fa.offsetWidth));
        Onbar.style.width = pre + "px";
        var order=(pre+25)+"px";
        Currtime.innerHTML = getMin(audio.currentTime);
        Onrunber.style.left = order;
    }
    down.onclick=function () {
        var playis;
        var Sid;
        var spl=audio.getAttribute("src").split("/");
        for(var kj=0;kj<spl.length;kj++)
            Sid=spl[kj];
        var sid=Sid.split(".")[0];
        var s;
        for(var k=0;k<playlist.length;k++)
        {
            if(playlist[k].getElementsByTagName("i").item(0).getAttribute("value")==sid)
            {
                s=k;
                break;
            }
        }
        if((playlist.length-1)==s) {
            playis = playlist[0].getElementsByTagName("i").item(0);
            s=0;
        }
       else {
            playis = playlist[s + 1].getElementsByTagName("i").item(0);
            s=s+1;
        }
     var isid=  playis.getAttribute("value");
       var songname= playlist[s].getElementsByClassName("songtit").item(0);
       var songe= playlist[s].getElementsByClassName("sogername").item(0);
        songna.innerText=songname.innerText;
        songer.innerText=songe.innerText;
     audio.src="http://mp3.9ku.com/m4a/"+isid+".m4a";
     audio.play();
    };
    up.onclick=function () {
        var playis;
        var Sid;
        var spl=audio.getAttribute("src").split("/");
        for(var kj=0;kj<spl.length;kj++)
            Sid=spl[kj];
        var sid=Sid.split(".")[0];
        var s;
        for(var k=0;k<playlist.length;k++)
        {
            if(playlist[k].getElementsByTagName("i").item(0).getAttribute("value")==sid)
            {
                s=k;
                break;
            }
        }
        if(0==playlist[s].getElementsByTagName("i").item(0).innerText) {
            playis = playlist[playlist.length - 1].getElementsByTagName("i").item(0);
            s=playlist.length - 1;
        }
        else {
            playis = playlist[s - 1].getElementsByTagName("i").item(0);
            s=s-1;
        }
        var isid=  playis.getAttribute("value");
        var songname= playlist[s].getElementsByClassName("songtit").item(0);
        var songe= playlist[s].getElementsByClassName("sogername").item(0);
        songna.innerText=songname.innerText;
        songer.innerText=songe.innerText;
        audio.src="http://mp3.9ku.com/m4a/"+isid+".m4a";
        audio.play();
    }

}
function getMin(time) {
    var m = Math.floor(time / 60);
    var s = Math.floor(time % 60);
    if(m <= 9) {
        m = "0" + m
    }
    if(s <= 9) {
        s = "0" + s
    }
    return m + ":" + s
}
