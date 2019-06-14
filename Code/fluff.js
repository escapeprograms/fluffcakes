//testing
function movePlayer(event){
   var x = event.clientX;
   var y = event.clientY;
   document.getElementById("player").style="transform:translate(-50%,-50%);position:absolute;left:"+(x)+"px;top:"+(y)+"px;";
}



