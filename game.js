'use strict'

class Vector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  plus(vector){
       
    if(!(vector instanceof Vector)){
     throw new Error(`Можно прибавлять к вектору только вектор типа Vector.`);
    }
    
    let plusX = this.x + vector.x;
    let plusY = this.y + vector.y;
    return new Vector(plusX, plusY);

  }

  times(multiplier){
    let multiplyX = this.x * multiplier;
    let multiplyY = this.y * multiplier;
    return new Vector(multiplyX, multiplyY);
  }
}


const start = new Vector(30, 50);
const moveTo = new Vector(5, 10);
const finish = start.plus(moveTo.times(2));

console.log(`Исходное расположение: ${start.x}:${start.y}`);
console.log(`Текущее расположение: ${finish.x}:${finish.y}`);
console.log('');




class Actor{
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed  = new Vector(0, 0)){

     if(!(pos instanceof Vector) || !(size instanceof Vector) || !(speed instanceof Vector)){
         throw new Error(`В конструктор можно передавать только объект типа Vector.`);
     }

     this.pos = pos;
     this.size = size;
     this.speed = speed;


     Object.defineProperties(this, {
      left: {
        get: () => this.pos.x 
      },
      top: {
        get: () => this.pos.y
      },
      right: {
        get: () => this.pos.x + this.size.x
      },
      bottom: {
        get: () => this.pos.y + this.size.y
      },
      type: {
        get: () => 'actor'
      }
     });

  }

  act(){

  }


  isIntersect(actor){
    if(!actor || !(actor instanceof Actor)){
      throw new Error(`В метод isIntersect можно передавать только объект типа Actor.`);
    }
 

    if((this.pos.valueOf() === actor.pos.valueOf() && this.size.valueOf() === actor.size.valueOf()) || (this.pos.valueOf() < actor.pos.valueOf()) || (this.pos.valueOf() === actor.pos.valueOf() && actor.size.valueOf() === -1)) {
      return false;
     }


     return true;
   
  }
}


const items = new Map();
const player = new Actor();
items.set('Игрок', player);

items.set('Первая монета', new Actor(new Vector(10, 10)));
items.set('Вторая монета', new Actor(new Vector(15, 5)));

function position(item) {
  return ['left', 'top', 'right', 'bottom']
    .map(side => `${side}: ${item[side]}`)
    .join(', ');  
}

function movePlayer(x, y) {
  player.pos = player.pos.plus(new Vector(x, y));
}

function status(item, title) {
  console.log(`${title}: ${position(item)}`);
  if (player.isIntersect(item)) {
    console.log(`Игрок подобрал ${title}`);
  }
}

items.forEach(status);
movePlayer(10, 10);
items.forEach(status);
movePlayer(5, -5);
items.forEach(status);
