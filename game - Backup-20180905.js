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
        get: () => 'actor',
        configurable: true
      }
     });
  }

  act(){

  }

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
}
/*
console.log('Объект не пересекается с объектом расположенным в той же точке, но имеющим отрицательный вектор размера - FALSE');
const player = new Actor(new Vector(0, 0), new Vector(1, 1));
console.log('Игрок');
console.log(player.left+', '+player.top+', '+player.right+', '+player.bottom);
console.log(player);
console.log('');
const coin = new Actor(new Vector(0, 0), new Vector(1, 1).times(-1));
console.log('Монета');
console.log(coin.left+', '+coin.top+', '+coin.right+', '+coin.bottom);
console.log(coin);
const notIntersected = player.isIntersect(coin);
console.log(notIntersected);
*/
/*
console.log('Объект пересекается с объектом, который частично содержится в нём - TRUE\n');
const position = new Vector(5, 5);
const size = new Vector(10, 10);
const player = new Actor(position, size);
console.log('Игрок');
console.log(player.left+', '+player.top+', '+player.right+', '+player.bottom);
console.log(player);
console.log('');
const moveX = new Vector(1, 0);
const moveY = new Vector(0, 1);
const coins = [
  new Actor(position.plus(moveX.times(-1)), size),
  new Actor(position.plus(moveY.times(-1)), size),
  new Actor(position.plus(moveX), size),
  new Actor(position.plus(moveY), size)
];
coins.forEach(coin => {
  console.log('Монета');
  console.log(coin.left+', '+coin.top+', '+coin.right+', '+coin.bottom);
  console.log(coin);
  const intersected = player.isIntersect(coin);
  console.log(intersected);
});

console.log('Объект не пересекается с объектом со смежными границами - FALSE\n');
const position = new Vector(5, 5);
const size = new Vector(10, 10);
const player = new Actor(position, size);
console.log('Игрок');
console.log(player.left+', '+player.top+', '+player.right+', '+player.bottom);
console.log(player);
console.log('');
const moveX = new Vector(1, 0);
const moveY = new Vector(0, 1);
const coins = [
  new Actor(position.plus(moveX.times(-1))),
  new Actor(position.plus(moveY.times(-1))),
  new Actor(position.plus(size).plus(moveX)),
  new Actor(position.plus(size).plus(moveY))
];
coins.forEach(coin => {
  console.log('Монета');
  console.log(coin.left+', '+coin.top+', '+coin.right+', '+coin.bottom);
  console.log(coin);
  const notIntersected = player.isIntersect(coin);
  console.log(notIntersected);
});
*/
/*
console.log('Объект не пересекается с объектом расположенным очень далеко - FALSE\n');
const player = new Actor(new Vector(0, 0));
console.log('Игрок');
console.log(player.left+', '+player.top+', '+player.right+', '+player.bottom);
console.log(player);
const coin = new Actor(new Vector(100, 100));
console.log('Монета');
console.log(coin.left+', '+coin.top+', '+coin.right+', '+coin.bottom);
console.log(coin);
const notIntersected = player.isIntersect(coin);
console.log(notIntersected);
*/

/*
console.log('Объект пересекается с объектом, который полностью содержится в нём - TRUE\n');
const player = new Actor(new Vector(0, 0), new Vector(100, 100));
console.log('Игрок');
console.log(player.left+', '+player.top+', '+player.right+', '+player.bottom);
console.log(player);
const coin = new Actor(new Vector(10, 10), new Vector());
console.log('Монета');
console.log(coin.left+', '+coin.top+', '+coin.right+', '+coin.bottom);
console.log(coin);
const intersected = player.isIntersect(coin);
console.log(intersected);
*/
/*
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
*/


class Level{
  constructor(grid, actors){
   if(grid){
     this.grid = grid;
   }
   if(actors){
     this.actors = actors;
   }


/*
   Object.defineProperties(this, {
      player: {
        get: () => {
           if(this.actors && this.actors.includes(player)){             
             function Player(){};
             Player.prototype = Object.create(Actor.prototype);
             Player.prototype.constructor = Actor;
             Player.prototype.type = this.actors[this.actors.indexOf(player)];
             const newPlayer = new Player();
             return newPlayer.type;
             //return Player.prototype.type = this.actors[this.actors.indexOf(player)];
             //const newPlayer = Object.create(this.actors[this.actors.indexOf(player)]);
             //return newPlayer.type;
             //return newPlayer.prototype.type = this.actors[this.actors.indexOf(player)];
             //return newPlayer.prototype.type = this.actors[this.actors.indexOf(player)];
             //return this.actors[this.actors.indexOf(player)].prototype.type = this.actors[this.actors.indexOf(player)];
             //const currentPlayer = Object.create(this.actors[this.actors.indexOf(player)]);
             //return Actor.prototype.type = this.actors[this.actors.indexOf(player)];
             //return this.actors[this.actors.indexOf(player)];
           }
        } 
      },
      height: {
        get: () => {
          return this.grid ? this.grid.length : 0;
        }
      },
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
    });
*/

    //this.player = this.actors[this.actors.indexOf(player)];

    this.height = this.grid ? this.grid.length : 0;
      
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

   this.status = null;
   this.finishDelay = 1;
   this.player = this.makePlayer();
  }


  makePlayer() {
    if(this.actors && this.actors.includes(player)){

/**/
//Вариант 1
      let currentPlayer = this.actors[this.actors.indexOf(player)];
      delete currentPlayer.type;
      currentPlayer.type = 'player';
      return currentPlayer;


/*

//Вариант 2
      let pos = this.actors[this.actors.indexOf(player)].pos;
      let size = this.actors[this.actors.indexOf(player)].size;
      let speed = this.actors[this.actors.indexOf(player)].speed;

      class Player extends Actor{
        constructor(){
          super(...arguments);
          delete this.type;
          this.type = 'player';
        }
      }
      const newPlayer = new Player(pos, size, speed);
      return newPlayer;
*/
/*
//Вариант 3
      function Player(){};
      Player.prototype = Object.create(Actor.prototype);
      //Player.prototype.constructor = Player;
      Player.prototype.type = 'player';
      //Player.pos = this.actors[this.actors.indexOf(player)].pos;
      //Player.size = this.actors[this.actors.indexOf(player)].size;
      //Player.speed = this.actors[this.actors.indexOf(player)].speed;
      const newPlayer = new Player();
      return newPlayer;
 */     
   }
  }
      /*
      let pos = this.actors[this.actors.indexOf(player)].pos;
      let size = this.actors[this.actors.indexOf(player)].size;
      let speed = this.actors[this.actors.indexOf(player)].speed;

      class Player extends Actor{
        constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed  = new Vector(0, 0)){
          super(pos, size, speed);
          delete this.type;
          this.type = 'player';
        }
      }

      const newPlayer = new Player(pos, size, speed);
      return newPlayer;
      */


  isFinished(){
    return this.status !== null && this.finishDelay < 0 ? true : false;
  }

  actorAt(actor){
    if(!actor || !(actor instanceof Actor)){
      throw new Error(`В метод actorAt можно передавать только объект типа Actor.`);
    }
    
    this.actors.forEach((item) => {
      console.log(item);
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
const player = new Actor(new Vector(10, 10), new Vector(15, 15));
const mushroom = new Actor(new Vector(9, 10), new Vector(15, 14));
//console.log(player);

const level = new Level(undefined, [ player, mushroom ]);
console.log(level.player);

//console.log(level.player === player);
//console.log(player.hasOwnProperty('type'));
/*
const level = new Level(undefined, [ player, mushroom ]);
const actor = level.actorAt(player);
console.log(actor);
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
const lines = 100;
const cells = 50;
const grid = new Array(lines).fill(new Array(cells));
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