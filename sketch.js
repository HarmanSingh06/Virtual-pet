//Create variables here
var dog,happyDog,dogImg,dogHappyImg;
var database;
var foodS,foodStock;
var firebase;
var bg;

var angryDogImg;
foodStock = firebase.database().ref('food');
foodStock.on("value", readStock);

function preload()
{
  //load images here
  dogImg = loadImage("images/dogimg.png");
  dogHappyImg = loadImage("images/dogImg1.png");

  bg = loadImage("images/house.jpg")

  angryDogImg = loadImage("images/angry.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  //--------------------DOG SPRITE
  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  //--------------------DOG SPRITE


}


function draw() {
  background(bg);  
  drawSprites();
  console.log(foodS);

  if(foodS){
  if(keyWentDown(UP_ARROW) && foodS > 0){
    //foodS = foodS-1
    writeStock(foodS);
    dog.addImage(dogHappyImg)
    }
  }


  //Adding Some Additional Features
    if(foodS<1){
      push()
      textSize(17);
      stroke("Red")
      fill("Black")
      text("I did not get the Food,Who ate it. Was that the Evil Dog?", 55, 90)
      pop();
      var angryDog = createSprite(480,400);
      angryDog.addImage(angryDogImg)
      angryDog.scale=0.4;
    }

  
  //Add styles here
  //Ok, I added Styles here happy Now
  //-------------------------------------------Food Stock
  if(foodS){
  push();
  textSize(25);
  
  fill("black")
  stroke("white")
  strokeWeight(3)
  
  translate(177,236)
  rotate(-6)
  
  text("Food Left: " + foodS, 0,0);
  
  pop();
}

  //-----------------------------------------------Food Stock


  //-----------------------------------------------------------Text Lines
  fill("White")
  stroke("red")
  strokeWeight(3)
  textSize(20)
  text("NOTE: Press UP Arrow Key to feed Scooby-Doo", 50, 40);
  text("But Why is this Dog So Hungry if he is a Virtual Dog", 30, 460)
  //------------------------------------------------------------Text Lines

}

//Read Value From Data Base
function readStock(data){
  foodS = data.val();
}

//Write to database
function writeStock(stock){
  if(stock<=0){
    stock = 0
  }
  else{
    stock=stock-1
  }
  database.ref('/').update({
    food : stock
  })
}


