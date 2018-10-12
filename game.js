'use strict'

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {

    if (vector instanceof Vector) {
      const plusX = this.x + vector.x;
      const plusY = this.y + vector.y;
      return new Vector(plusX, plusY);
    }
    throw new Error(`Incorrect argument`);
  }

  times(multiplier) {
    const multiplyX = this.x * multiplier;
    const multiplyY = this.y * multiplier;
    return new Vector(multiplyX, multiplyY);
  }
}




class Actor {
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {

    if (!(pos instanceof Vector) || !(size instanceof Vector) || !(speed instanceof Vector)) {
      throw Error(`Incorrect argument`);
    }

    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this._type = 'actor';
  }
  act() {

  }


  get left() {
    return this.pos.x;
  }

  get top() {
    return this.pos.y;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  get bottom() {
    return this.pos.y + this.size.y;
  }

  get type() {
    return this._type;
  }



  isIntersect(actor) {
    if (!(actor instanceof Actor) || actor === undefined) {
      throw Error('Incorrect argument');
    }

    if (actor === this || actor.right < 0 || actor.bottom < 0) {
      return false;
    }

    return !(actor.left >= this.right || actor.right <= this.left || actor.top >= this.bottom || actor.bottom <= this.top);
  }
}




class Level {
  constructor(grid = [], actors = []) {
    this.grid = grid;
    this.actors = actors;
    this.height = this.grid ? this.grid.length : 0;
    this.width = grid.reduce((sum, item) => item.length > sum ? item.length : sum, 0);
    this.status = null;
    this.finishDelay = 1;
    this.player = actors.find(item => item.type === 'player');
  }


  isFinished() {
    return this.status !== null && this.finishDelay < 0 ? true : false;
  }

  actorAt(actor) {
    if (!actor || !(actor instanceof Actor)) {
      throw Error(`Incorrect argument`);
    }
    return this.actors.find(item => actor.isIntersect(item));
  }

  checkObstacle(x, y) {
    return (this.grid[y] && this.grid[y][x] && ((this.grid[y][x] === 'wall') || (this.grid[y][x] === 'lava')));
  }

  obstacleAt(posTo, size) {
    if (!(posTo instanceof Vector) || !(size instanceof Vector)) {
      throw Error(`Incorrect arguments`);
    }

    const x = posTo.x;
    const y = posTo.y;
    const xSize = size.x - 0.1;
    const ySize = size.y - 0.1;
    const left = Math.floor(x);
    const top = Math.floor(y);
    const bottom = Math.floor(y + ySize);
    const right = Math.floor(x + xSize);
    const middle = Math.round(top + ySize / 2);

    if (this.checkObstacle(left, top)) {
      return this.grid[top][left];
    }
    if (this.checkObstacle(right, top)) {
      return this.grid[top][right];
    }
    if (this.checkObstacle(left, bottom)) {
      return this.grid[bottom][left];
    }
    if (this.checkObstacle(right, bottom)) {
      return this.grid[bottom][right];
    }
    if (this.checkObstacle(left, middle)) {
      return this.grid[middle][left];
    }
    if (this.checkObstacle(right, middle)) {
      return this.grid[middle][right];
    }
    if (left < 0 || x + xSize > this.width || top < 0) {
      return 'wall';
    }
    if (y + ySize > this.height) {
      return 'lava';
    }
  }

  removeActor(actor) {
    if (this.actors.includes(actor)) {
      this.actors.splice(this.actors.indexOf(actor), 1)
    }
  }

  noMoreActors(type) {
    const noActors = this.actors.find(item => item.type === type);
    return typeof noActors === 'undefined' ? true : false;
  }

  playerTouched(type, actor) {
    if (this.status === null) {
      if (type === 'lava' || type === 'fireball') {
        this.status = 'lost';
      } else if (type === 'coin') {
        this.removeActor(actor);
        if (this.noMoreActors('coin')) {
          this.status = 'won';
        }
      }
    }
  }
}




class LevelParser {
  constructor(dictionary) {
    this.dictionary = dictionary;
  }

  actorFromSymbol(symbol) {
    if (!symbol) return;
    return (!(symbol in this.dictionary)) ? undefined : this.dictionary[symbol];
  }

  obstacleFromSymbol(symbol) {
    if (symbol === 'x') {
      return 'wall'
    };
    if (symbol === '!') {
      return 'lava';
    }
    if (symbol !== 'x' || symbol !== '!') {
      return undefined;
    }
  }

  createGrid(stringsArr) {
    return stringsArr.map(str => str.split('').map(el => {
      if (el === '!') {
        return 'lava';
      } else if (el === 'x') {
        return 'wall';
      }
    }));
  }

  createActors(stringsArr) {
    const strArray = stringsArr.map(str => str.split(''));
    const actors = [];
    strArray.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.dictionary && this.dictionary[cell] && typeof this.dictionary[cell] === 'function') {
          const actor = new this.dictionary[cell](new Vector(x, y));
          if (actor instanceof Actor) {
            actors.push(actor);
          }
        }
      });
    });
    return actors;
  }

  parse(plan) {
    const grid = this.createGrid(plan);
    const actors = this.createActors(plan);
    return new Level(grid, actors);
  }
}

class Player extends Actor {
  constructor(location) {
    super(location, new Vector(0.8, 1.5));
    this._type = 'player';
    this.pos.y -= 0.5;
  }
}

class Fireball extends Actor {
  constructor(position = new Vector(), speed = new Vector()) {
    super(position, undefined, speed);
    this._type = 'fireball';
  }

  act(time, level) {
    const nextPos = this.getNextPosition(time);
    const obj = level.obstacleAt(nextPos, this.size);
    if (obj) {
      this.handleObstacle();
      return;
    }
    this.pos = nextPos;
  }

  getNextPosition(time = 1) {
    return new Vector(this.pos.x + this.speed.x * time, this.pos.y + this.speed.y * time);
  }

  handleObstacle() {
    if (this.speed.x > 0 || this.speed.y > 0) {
      this.speed.x = -this.speed.x;
      this.speed.y = -this.speed.y;
    } else {
      this.speed.x = Math.abs(this.speed.x);
      this.speed.y = Math.abs(this.speed.y);
    }
  }
}

class HorizontalFireball extends Fireball {
  constructor(position) {
    super(position, new Vector(2, 0));
  }
}

class VerticalFireball extends Fireball {
  constructor(position) {
    super(position, new Vector(0, 2));
  }
}

class FireRain extends Fireball {
  constructor(position) {
    super(position, new Vector(0, 3));
    this.start = position;
  }

  handleObstacle() {
    this.pos = this.start;
  }
}

class Coin extends Actor {
  constructor(location = new Vector()) {
    super(location, new Vector(0.6, 0.6));
    this.pos.x += 0.2;
    this.pos.y += 0.1;
    this._type = 'coin';
    this.location = location;
    this.springSpeed = 8;
    this.springDist = 0.07;
    this.spring = Math.random() * (Math.PI * 2);
  }

  act(time) {
    const next = this.getNextPosition(time);
    this.pos = next;
  }

  updateSpring(time = 1) {
    this.spring += this.springSpeed * time;
  }

  getSpringVector() {
    return new Vector(0, Math.sin(this.spring) * this.springDist);
  }

  getNextPosition(time = 1) {
    this.updateSpring(time);
    const newVector = this.getSpringVector();
    return new Vector(this.location.x + newVector.x, this.location.y + newVector.y);
  }
}


const actorDict = {
  '@': Player,
  'v': FireRain,
  '=': HorizontalFireball,
  '|': VerticalFireball,
  'o': Coin
}


const parser = new LevelParser(actorDict);

loadLevels()
  .then(schemas => runGame(JSON.parse(schemas), parser, DOMDisplay))
  .then(() => alert('Вы выиграли приз!'))
  .catch(err => alert(err));