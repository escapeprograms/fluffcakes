//testing
function movePlayer(event){
   var x = event.clientX;
   var y = event.clientY;
   document.getElementById("player").style="transform:translate(-50%,-50%);position:absolute;left:"+(x)+"px;top:"+(y)+"px;";
}

function Obstacle(id,pos,vel,acc,img,dmg,size){
   this.id=id;//int
   this.pos=pos;//[x,y]
   this.vel=vel;//[dx,dy]
   this.acc=acc;//[d2x,d2y]
   this.img=img;//file.png
   this.dmg=dmg;//int
   this.size=size;//[width,height]
   this.active=true;
   
   this.create = function(){
      var s = "position:absolute;left:"+pos[0]+";top"+pos[1]+";";
      document.getElementById("fluff-container").innerHTML+="<div class='obs' style='"+s+"'></div>";
   }
   this.draw = function(){
      document.getElementsByClassName("obs")[this.id].innerHTML="<img src = '"+this.img+"'>";
   }
}




var obstacles = [new Obstacle(0,[0,0],[0,0],[0,0],"/fluffcakes/Images/Misc/chest.png",0,[100,100])];
