//movePlayer
var mouseX = 0;
var mouseY = 0;
var hp = 5;

var aOffX = document.getElementById("fluff-container").offsetLeft;//needs updating in index.js
var aOffY = document.getElementById("fluff-container").offsetTop;

function movePlayer(event){
   mouseX = 1100*(event.clientX-aOffX) / parseFloat(document.getElementById("fluff-container").style.width);//returns pixel val (scaled)
   mouseY = 500*(event.clientY-aOffY) / parseFloat(document.getElementById("fluff-container").style.height);//returns pixel val (scaled)
   document.getElementById("player").style="transform:translate(-50%,-50%);position:absolute;left:"+(event.clientX)+"px;top:"+(event.clientY)+"px;";
}
//canvas is 1100 x 500
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
   //visuals
   this.angle = 0;//int
   this.vpos = [100*this.pos[0]/1100,100*this.pos[1]/500];
   this.vsize = [100*this.size[0]/1100,100*this.size[1]/500];
   
   this.create = function(){
      var style = "transform:translate(-50%,-50%);position:absolute;left:"+this.vpos[0]+";top"+this.vpos[1]+
          ";width:"+this.vsize[0]+"%;height:"+this.vsize[1]+"%;";
      document.getElementById("fluff-container").innerHTML+="<div class='obs' style='"+style+"'></div>";
   }
   this.draw = function(){
      document.getElementsByClassName("obs")[this.id].innerHTML="<img src = '"+this.img+"' width='100%' height='100%'>";
   }
   this.update = function(){
      if (this.active){
         if (this.s){this.s(this);}
         //collision
         this.collision();
         //update pos and vel
         this.pos[0]+=this.vel[0];
         this.pos[1]+=this.vel[1];
         this.vel[0]+=this.acc[0];
         this.vel[1]+=this.acc[1];
         //destroy object
         if (0>this.pos[0]||this.pos[0]>1100 || 0>this.pos[1]||this.pos[1]>500){
           this.active=false;
         }
         //update visuals
         this.vpos = [100*this.pos[0]/1100,100*this.pos[1]/500];
         document.getElementsByClassName("obs")[this.id].style.left=this.vpos[0]+"%";
         document.getElementsByClassName("obs")[this.id].style.top=this.vpos[1]+"%";
         document.getElementsByClassName("obs")[this.id].style.transform="translate(-50%,-50%) rotate("+this.angle+"deg)";
         //time
         this.t++;
      }else{
        document.getElementsByClassName("obs")[this.id].style.display='none';
      }
   }
   this.collision = function(){
      var dx = this.pos[0]-mouseX;
      var dy = this.pos[1]-mouseY;
      if (Math.sqrt((dx*dx)+2*(dy*dy))<=40){
         hp-=this.dmg;
         this.active=false;
         console.log(Math.sqrt((dx*dx)+2*(dy*dy))+"hp: "+hp);
      }
   }
}
var obstacles = [new Obstacle(0,[10,0],[10,10],[0,0],"/fluffcakes/Images/Misc/chest.png",0,[80,80],(q)=>{bounce(q);spin(q,1);})];

//special functions
function disappear(q,t){
   if (q.t>=t){
      q.active=false;
   }
}
function bounce(q){
     if (q.t>1){
        if (q.pos[0]>=1100-q.vel[0] || q.pos[0]<= -q.vel[0]){
           q.vel[0]*=-1;
        }
        if (q.pos[1]>=500-q.vel[1] || q.pos[1]<= -q.vel[1]){
           q.vel[1]*=-1;
        }
     }
}
function spin(q,vel){
   q.angle+=vel;
}
function gravity(q,acc){
   q.acc=-acc;
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

//flush all objects
function flushArray(a){
   var t = [];
   for (var i = 0; i < a.length; i++){
      if (a[i]){
         t.push(a[i]);
      }
   }
   return t;
}
function flush(){
   var c = document.getElementById("fluff-container");//c for container
   c.innerHTML="";
   obstacles=[];
}

//attack orders
var order = ["","","","",""];

function spawnObstacle(type,pos,vel,acc,img,dmg,size){
   
}

//add new testing
setInterval(()=>{
   var n = obstacles.length;
   var a = Math.atan(mouseY/mouseX);
   obstacles.push(new Obstacle(n,[0,0],[10*Math.cos(a),10*Math.sin(a)],[0,0],"/fluffcakes/Images/Misc/face.png",1,[40,40]));
   obstacles[n].create();
   obstacles[n].draw();
},1000);
