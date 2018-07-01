'use strict'

class Vector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  plus(vector){

    if(!(vector instanceof Vector)){
     throw new Error('Можно прибавлять к вектору только вектор типа Vector.');
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

const arr = 'smile';
const start = new Vector(30, 50);
const moveTo = new Vector(5, 10);
//const finish = start.plus(moveTo.times(2));
const finish = start.plus(arr);

console.log(`Исходное расположение: ${start.x}:${start.y}`);
console.log(`Текущее расположение: ${finish.x}:${finish.y}`);





class Actor{
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed  = new Vector(0, 0)){
   try{
     this.pos = pos;
     this.size = size;
     this.speed = speed;
     const key = Object.keys(this);

     key.forEach((element) => {
       if(!(element instanceof Vector)){
         throw new Error(`"${element}" не является объектом типа Vector.`);
       }
     })
/*
    let showError = value => {
      throw new Error(`"${value}" не является объектом типа Vector.`);
    }

    if(pos && !(pos instanceof Vector)){
     showError(pos);
    } else if(pos){
      this.pos = pos;
    }

    if(size && !(size instanceof Vector)){
     showError(size);
    } else if(size){
      this.size = size;
    }

    if(speed && !(speed instanceof Vector)){
     showError(speed);
    } else if(speed){
      this.speed = speed;
    }
*/
     Object.defineProperties(this, {
    left: {
      get: function() {
         return this.pos.x;
      }
    },
    top: {
      get: function() {
         return this.pos.y;
      }
    },
    right: {
      get: function() {
         return this.size.x;
      }
    },
    bottom: {
      get: function() {
         return this.size.y;
      }
    },
    type: {
      get: function() {
        return 'actor';
      }
    }
});

   } catch (err){
      console.error('[%s]', err);
   }
  }

  act(){

  }


  isIntersect(actor){
   
  }

}

//const arr = [1, 2, 3];

const items = new Map();
const player = new Actor();
items.set('Игрок', player);

items.set('Первая монета', new Actor(new Vector(10, 10)));
//items.set('Вторая монета', new Actor(arr));
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
