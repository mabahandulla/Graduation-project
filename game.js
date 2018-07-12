'use strict'

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {

    if (!(vector instanceof Vector)) {
      throw new Error(`Можно прибавлять к вектору только вектор типа Vector.`);
    }

    let plusX = this.x + vector.x;
    let plusY = this.y + vector.y;
    return new Vector(plusX, plusY);

  }

  times(multiplier) {
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



class Actor {
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {

    if (!(pos instanceof Vector) || !(size instanceof Vector) || !(speed instanceof Vector)) {
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

  act() {

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


class Level {
  constructor(grid, actors) {
    if (grid) {
      this.grid = grid;
    }
    if (actors) {
      this.actors = actors;
    }

    Object.defineProperties(this, {
      player: {
        get: () => {
          function NewPlayer() {
            this.type = 'player';
          }
          NewPlayer.prototype = Object.create(Actor);
          NewPlayer.constructor = NewPlayer;
          const playerType = new NewPlayer();
          return playerType.type;
        }
      },
      height: {
        get: () => {
          return this.grid ? this.grid.length : 0;
        }
      },
      width: {
        get: () => {
          let cellLength = 0, currentCell = 0;

          if (this.grid) {
            this.grid.forEach((item, i) => {
              if (typeof item[i] !== 'undefined' && item[i] !== null) {
                currentCell = Object.keys(item).length;
                if (currentCell > cellLength) {
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

    this.status = null;
    this.finishDelay = 1;
  }

  isFinished() {
    return this.status !== null && this.finishDelay < 0 ? true : false;
  }

  actorAt(actor) {
    if (!actor || !(actor instanceof Actor)) {
      throw new Error(`В метод actorAt можно передавать только объект типа Actor.`);
    }

  }

  obstacleAt(pos, size) {
    if (!(pos instanceof Vector) || !(size instanceof Vector)) {
      throw new Error(`В метод obstacleAt можно передавать только объект типа Vector.`);
    }
  }
  removeActor(actor) {

  }
  noMoreActors(actorType) {

  }
  playerTouched(actorType, actor) {
    if (this.status !== null) {

    }
  }
}

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

const level = new Level(grid, [goldCoin, bronzeCoin, player, fireball]);

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