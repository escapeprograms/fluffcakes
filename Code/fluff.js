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
      var style = "transform:translate(-50%,-50%);position:absolute;left:"+this.pos[0]+";top"+this.pos[1]+";width:"+this.size[0]+"%;height:"+this.size[1]+";";
      document.getElementById("fluff-container").innerHTML+="<div class='obs' style='"+style+"'></div>";
   }
   this.draw = function(){
      document.getElementsByClassName("obs")[this.id].innerHTML="<img src = '"+this.img+"' width='100%' height='100%'>";
   }
   this.update = function(s){//array of attributes
      if (this.active){
         this.pos[0]+=this.vel[0];
         this.pos[1]+=this.vel[1];
         this.vel[0]+=this.acc[0];
         this.vel[1]+=this.acc[1];

         if (s){s();}
         if (0>this.pos[0]||this.pos[0]>100 || 0>this.pos[1]||this.pos[1]>100){
            this.active=false;
         }

        document.getElementsByClassName("obs")[this.id].style.left=this.pos[0]+"%";
        document.getElementsByClassName("obs")[this.id].style.top=this.pos[1]+"%";
      }else{
        document.getElementsByClassName("obs")[this.id].style.display='none';
      }
   }
}


var obstacles = [new Obstacle(0,[0,0],[1,1],[0,0],"/fluffcakes/Images/Misc/chest.png",0,[5,5])];
for (var i = 0; i < obstacles.length; i++){
   obstacles[i].create();
   obstacles[i].draw();
}

setInterval(()=>{
   for (var i = 0; i < obstacles.length; i++){
   obstacles[i].update();
}
},100);
