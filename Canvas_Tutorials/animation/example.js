/*
 * Copyright (C) 2012 David Geary. This code is from the book
 * Core HTML5 Canvas, published by Prentice-Hall in 2012.
 *
 * License:
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * The Software may not be used to create training material of any sort,
 * including courses, books, instructional videos, presentations, etc.
 * without the express written consent of David Geary.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    paused = true,
    
    animateButton = document.getElementById('animateButton');

var discs =  createDisks(1);
var numDiscs = discs.length;
var trackList = createRandomMarkerTrack(1000, 8);
// Functions.....................................................

function createDisks(maxDiscsNumbers){
   var disks = [];
   for(var i=0; i<maxDiscsNumbers; i++){
      var objX = Math.floor((Math.random() * 650) + 1);
      var objY = Math.floor((Math.random() * 450) + 1);

      var velX = Math.floor((Math.random() * 5) + 1);
      var velY = Math.floor((Math.random() * 5) + 1);


      var diskObj = {
           x: objX,
           y: objY,
           lastX: objX,
           lastY: objY,
           velocityX: velX,
           velocityY: velY,
           radius: 15,
           innerColor: 'rgba(255,0,0,1.0)',
           middleColor: 'rgba(255,0,0,0.7)',
           outerColor: 'rgba(255,0,0,0.5)',
           strokeStyle: 'orange'
      };
      disks.push(diskObj);
   }

   return disks
}

// for canvas of dimentions 750 x 500.
// pointsRelativeDensity represents the desired relaive distance between points
function createRandomMarkerTrack(trackMaxPoints, pointsRelativeDensity){
   var objInitX = Math.floor((Math.random() * 700) + 1);
   var objInitY = Math.floor((Math.random() * 450) + 1);
   var trackList = [
      {
          x: objInitX,
          y: objInitY
      }
   ];
   var px = trackList[0].x;
   var py = trackList[0].y;
   for(var j=0; j<trackMaxPoints; j++){
      px += Math.floor((Math.random() * pointsRelativeDensity) + 1);
      py += Math.floor((Math.random() * pointsRelativeDensity) + 1);
      var point = {
         x:px,
         y:py
      };
      trackList.push(point);
   }
   return trackList;
}

function drawBackground() {
   var STEP_Y = 12,
       i = context.canvas.height;
   
   context.strokeStyle = 'lightgray';
   context.lineWidth = 0.5;

   while(i > STEP_Y*4) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= STEP_Y;
   }

   context.save();

   context.strokeStyle = 'rgba(100,0,0,0.3)';
   context.lineWidth = 1;

   context.beginPath();

   context.moveTo(35,0);
   context.lineTo(35,context.canvas.height);
   context.stroke();

   context.restore();
}

function update() {
   var disc = null;

   for(var i=0; i < numDiscs; ++i) {
      disc = discs[i];

      if (disc.x + disc.velocityX + disc.radius > context.canvas.width ||
          disc.x + disc.velocityX - disc.radius < 0) 
         disc.velocityX = -disc.velocityX;

      if (disc.y + disc.velocityY + disc.radius > context.canvas.height ||
          disc.y + disc.velocityY - disc.radius  < 0) 
         disc.velocityY= -disc.velocityY;

      disc.x += disc.velocityX;
      disc.y += disc.velocityY;
   }
}


var trackPointCounter = 0;
function updateByCustomTrack(trackList) {
    var disc = null;

    for(var i=0; i < numDiscs; ++i) {
        disc = discs[i];

        if(trackPointCounter< trackList.length){
            if (disc.x + disc.radius > context.canvas.width ||
                disc.x - disc.radius < 0)
                disc.x = -trackList[trackPointCounter].x;

            if (disc.y + disc.radius > context.canvas.height ||
                disc.y - disc.radius  < 0)
                disc.y = -trackList[trackPointCounter].y;

            disc.x = trackList[trackPointCounter].x;
            disc.y += trackList[trackPointCounter].y;
        }
    }
    trackPointCounter++;
}

function draw() {
   var disc = discs[i];

   for(var i=0; i < numDiscs; ++i) {
      disc = discs[i];

      gradient = context.createRadialGradient(disc.x, disc.y, 0,
                         disc.x, disc.y, disc.radius);

      gradient.addColorStop(0.3, disc.innerColor);
      gradient.addColorStop(0.5, disc.middleColor);
      gradient.addColorStop(1.0, disc.outerColor);

      context.save();
      context.beginPath();
      context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
      context.fillStyle = gradient;
      context.strokeStyle = disc.strokeStyle;
      context.fill();
      context.stroke();
      context.restore();
   }
}

// Animation.....................................................

function animate(time) {
   if (!paused) {
      context.clearRect(0,0,canvas.width,canvas.height);
      drawBackground();
       updateByCustomTrack(trackList);
      // update();
      draw();

      window.requestNextAnimationFrame(animate);
   }
}
   
// Initialization................................................

context.font = '48px Helvetica';

animateButton.onclick = function (e) {
   paused = paused ? false : true;
   if (paused) {
      animateButton.value = 'Animate';
   }
   else {
     window.requestNextAnimationFrame(animate);
      animateButton.value = 'Pause';
   }
};
