'use strict'

class Vector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  plus(vector){
   try{
       
    if(!(vector instanceof Vector)){
     throw new Error('Можно прибавлять к вектору только вектор типа Vector.');
    }
    
    let plusX = this.x + vector.x;
    let plusY = this.y + vector.y;
    return new Vector(plusX, plusY);
     
   } catch (err){
      console.error('[%s]', err);
   }
  }
  times(multiplier){
    let multiplyX = this.x * multiplier;
    let multiplyY = this.y * multiplier;
    return new Vector(multiplyX, multiplyY);
  }
}

//const arr = 'smile';
const start = new Vector(30, 50);
const moveTo = new Vector(5, 10);
//const moveTo = new Vector(10);
const finish = start.plus(moveTo.times(2));
//const finish = start.plus(arr);

console.log(`Исходное расположение: ${start.x}:${start.y}`);
console.log(`Текущее расположение: ${finish.x}:${finish.y}`);





class Actor{
  constructor(pos, size, speed){
   try{

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

     Object.defineProperties(this, {
    left: {
      get: function() {
         return generateId();
      }
    },
    top: {
      get: function() {
         return orderArray.reduce(function(sum, current) {
                return sum + current;
                }, 0);
      }
    },
    right: {
      get: function() {
         return currentDiscount(this.balance);
      }
    },
    bottom: {
      get: function() {
         return currentDiscount(this.balance);
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

const arr = [1, 2, 3];

const items = new Map();
const player = new Actor();
items.set('Игрок', player);

items.set('Первая монета', new Actor(new Vector(10, 10)));
//items.set('Вторая монета', new Actor(arr));
items.set('Вторая монета', new Actor(new Vector(15, 5)));