function test () {
  for (var i=0;i<3;i++) {
  	 var checkandedit = new Object();
  	 checkandedit=window.open('https://www.baidu.com','_blank').location;
  	console.log(i);
  }
}