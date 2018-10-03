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

/*
const start = new Vector(30, 50);
const moveTo = new Vector(5, 10);
const finish = start.plus(moveTo.times(2));

console.log(`Исходное расположение: ${start.x}:${start.y}`);
console.log(`Текущее расположение: ${finish.x}:${finish.y}`);
console.log('');
*/



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

  isIntersect(actor) {
    if (!(actor instanceof Actor) || actor === undefined) {
          throw new Error('arguments error');
    }

    //if (actor === this || actor.size.x < 0 || actor.size.y < 0) {
    if (actor === this || actor.right < 0 || actor.bottom < 0) {
          return false;
      }

  return !(actor.left >= this.right || actor.right <= this.left || actor.top >= this.bottom || actor.bottom <= this.top);
  }

  /*
  isIntersect(actor) {
    if (!actor || !(actor instanceof Actor)) {
      throw new Error(`В метод isIntersect можно передавать только объект типа Actor.`);
    }

    //Объект не пересекается сам с собой - FALSE
    if (this === actor) {
      return false;
    }

    //Объект не пересекается с объектом расположенным в той же точке, но имеющим отрицательный вектор размера - FALSE
    if ((this.left === actor.left && this.top === actor.top) && (actor.right < 0 && actor.bottom < 0)) {
      return false;
    }

    //Объект не пересекается с объектом расположенным очень далеко - FALSE
    if (this.right <= actor.left && this.bottom <= actor.top) {
      return false;
    }

    //Объект не пересекается с объектом со смежными границами - FALSE
    if (
      ((this.left === actor.right) && (this.top <= actor.bottom) && (this.bottom >= actor.top)) ||
      ((this.bottom === actor.top) && (this.left <= actor.right) && (this.right >= actor.left)) ||
      ((this.top === actor.bottom) && (this.left <= actor.right) && (this.right >= actor.left)) ||
      ((this.right === actor.left) && (this.top <= actor.bottom) && (this.bottom >= actor.top))
    ) {
      return false;
    }
    //Объект пересекается с объектом, который частично содержится в нём - TRUE
    if (
      (((this.left >= actor.left && this.left < actor.right) || (this.right > actor.left && this.right >= actor.right)) &&
        ((this.top >= actor.top && this.top < actor.bottom) || (this.bottom > actor.top && this.bottom >= actor.bottom))) ||
      (((this.left <= actor.left && this.left < actor.right) || (this.right > actor.left && this.right <= actor.right)) &&
        ((this.top <= actor.top && this.top > actor.bottom) || (this.bottom > actor.top && this.bottom <= actor.bottom)))
    ) {
      return true;
    }

    //Объект пересекается с объектом, который полностью содержится в нём - TRUE
    if (((actor.left >= this.left && actor.left <= this.right) || (actor.right >= this.left && actor.right <= this.right)) && ((actor.top >= this.top && actor.top <= this.bottom) || (actor.bottom >= this.top && actor.bottom <= this.bottom))) {
      return true;
    }

  }

  */
}


class Level{
  constructor(grid = [], actors= []){
    this.grid = grid;
    this.actors = actors;
    this.height = this.grid.length;
    this.width = grid.reduce((sum, el) => el.length > sum ? el.length : sum, 0);

    /*
      Object.defineProperties(this, {
        width: {
          get: () => {
             let cellLength = 0;
             if(this.grid){
              let currentCell = 0;
              this.grid.forEach((item, i) => {
               if(typeof item[i] !== 'undefined' && item[i] !== null){
                currentCell = Object.keys(item).length;
                if(currentCell > cellLength){
                  cellLength = currentCell;
                }
               } else {
                 cellLength = item.length;
               }
  
              });            
             }           
             return cellLength;
          }
        }
     })
*/
   this.status = null;
   this.finishDelay = 1;
   this.player = actors.find(el => el.type === 'player');
  }



  isFinished(){
    return this.status !== null && this.finishDelay < 0 ? true : false;
  }

  actorAt(actor){
    if(!actor || !(actor instanceof Actor)){
      throw new Error(`В метод actorAt можно передавать только объект типа Actor.`);
    }
    
    this.actors.forEach((item) => {
       if(actor.isIntersect(item)){
         return item;
       }
    });
    //return result;
  }

  obstacleAt(pos, size){
    if(!(pos instanceof Vector) || !(size instanceof Vector)){
      throw new Error(`В метод obstacleAt можно передавать только объект типа Vector.`);
    }

  }

  removeActor(){

  }

  noMoreActors(){

  }

  playerTouched(){
   if(this.status !== null){

   }

  }
}

/*
function MyCoin(title) {
  this.type = 'coin';
  this.title = title;
}
MyCoin.prototype = Object.create(Actor);
MyCoin.constructor = MyCoin;


//const goldCoin = new MyCoin('Золото');
//const bronzeCoin = new MyCoin('Бронза');
*/
//const fireball = new Actor(new Vector(20, 20), new Vector(40, 40));

function Player() {
  this.type = 'player';
}

Player.prototype = Object.create(Actor);
Player.constructor = Player;

const player = new Actor();

const level = new Level(undefined, [ player ]);
console.log(level.player);

/*
const level = new Level(undefined, [ player, mushroom ]);
const actor = level.actorAt(player);
//expect(actor).to.be.equal(mushroom);


const grid = [
  [undefined, undefined],
  ['wall', 'wall']
];
console.log(grid[0][1]);


const lines = 100;
const grid = new Array(lines);
const level = new Level();
console.log(level.height);
*/
/*
const lines = 5;
const cells = 2;
const cellsMax = new Array(5);
const grid = new Array(lines).fill(new Array(cells));
grid[3] = cellsMax;
const level = new Level(grid);
console.log(level.width);
*/


/*
const grid = [
  [undefined, undefined],
  ['wall', 'wall']
];

function MyCoin(title) {
  this.type = 'coin';
  this.title = title;
}
MyCoin.prototype = Object.create(Actor);
MyCoin.constructor = MyCoin;

const goldCoin = new MyCoin('Золото');
const bronzeCoin = new MyCoin('Бронза');
const player = new Actor();
const fireball = new Actor();

const level = new Level(grid, [ goldCoin, bronzeCoin, player, fireball ]);

level.playerTouched('coin', goldCoin);
level.playerTouched('coin', bronzeCoin);

if (level.noMoreActors('coin')) {
  console.log('Все монеты собраны');
  console.log(`Статус игры: ${level.status}`);
}

const obstacle = level.obstacleAt(new Vector(1, 1), player.size);
if (obstacle) {
  console.log(`На пути препятствие: ${obstacle}`);
}

const otherActor = level.actorAt(player);
if (otherActor === fireball) {
  console.log('Пользователь столкнулся с шаровой молнией');
}
*/