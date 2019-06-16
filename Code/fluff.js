//testing
function movePlayer(event){
   var x = event.clientX;
   var y = event.clientY;
   document.getElementById("player").style="transform:translate(-50%,-50%);position:absolute;left:"+(x)+"px;top:"+(y)+"px;";
}

function Obstacle(id,pos,vel,acc,img,dmg,size,s){
   this.id=id;//int
   this.pos=pos;//[x,y]
   this.vel=vel;//[dx,dy]
   this.acc=acc;//[d2x,d2y]
   this.img=img;//file.png
   this.dmg=dmg;//int
   this.size=size;//[width,height]
   this.active=true;
   if (s){this.s = s;}//[special function, args]}
   this.t = 0;
   
   this.create = function(){
      var style = "transform:translate(-50%,-50%);position:absolute;left:"+this.pos[0]+";top"+this.pos[1]+";width:"+this.size[0]+"%;height:"+this.size[1]+"%;";
      document.getElementById("fluff-container").innerHTML+="<div class='obs' style='"+style+"'></div>";
   }
   this.draw = function(){
      document.getElementsByClassName("obs")[this.id].innerHTML="<img src = '"+this.img+"' width='100%' height='100%'>";
   }
   this.update = function(){
      if (this.active){
         if (this.s){this.s(this);}
         
         this.pos[0]+=this.vel[0];
         this.pos[1]+=this.vel[1];
         this.vel[0]+=this.acc[0];
         this.vel[1]+=this.acc[1];
         
         if (0>this.pos[0]||this.pos[0]>100 || 0>this.pos[1]||this.pos[1]>100){
           this.active=false;
         }

        document.getElementsByClassName("obs")[this.id].style.left=this.pos[0]+"%";
        document.getElementsByClassName("obs")[this.id].style.top=this.pos[1]+"%";
        this.t++;
      }else{
        document.getElementsByClassName("obs")[this.id].style.display='none';
      }
   }
}
var obstacles = [new Obstacle(0,[10,0],[1,1],[0,0],"/fluffcakes/Images/Misc/chest.png",0,[4,5.5],(q)=>{bounce(q);})];

//special functions
function bounce(q){
     if (q.t>1){
        if (q.pos[0]>=100-q.vel[0]||q.pos[0]<=q.vel[0]){
           q.vel[0]*=-1;
        }
        if (q.pos[1]>=100-q.vel[1]||q.pos[1]<=q.vel[1]){
           q.vel[1]*=-1;
        }
     }
}
//testing
for (var i = 0; i < obstacles.length; i++){
   obstacles[i].create();
   obstacles[i].draw();
}

//update
setInterval(()=>{
   for (var i = 0; i < obstacles.length; i++){
   obstacles[i].update();
}
},10);

//add new
setInterval(()=>{
   var n = obstacles.length;
   obstacles.push(new Obstacle(n,[0,0],[1,1],[0,0],"/fluffcakes/Images/Misc/face.png",0,[4,5.5]));
   obstacles[n].create();
   obstacles[n].draw();
},1000);

