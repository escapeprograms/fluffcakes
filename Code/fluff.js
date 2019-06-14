//testing
function movePlayer(event){
   var x = event.clientX;
   var y = event.clientY;
   document.getElementById("player").style="transform:translate(-50%,-50%);position:absolute;left:"+(x)+"px;top:"+(y)+"px;";
}

function Obstacle(pos,vel,acc,img,dmg){
   this.pos=pos;
   this.vel=vel;
   this.acc=acc;
   this.img=img;
   this.dmg=dmg;
   this.active=true;
}

