'use strict'


class Vector{
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }

  plus(vector){
   if(!vector instanceof(Vector)){
     throw 'Можно прибавлять к вектору только вектор типа Vector.';
   }
    let plusX = this.x + vector.x;
    let plusY = this.y + vector.y;
    let plusObj = {x: plusX, y: plusY};
    return plusObj;
  }
  times(multiplier){
    let multiplyX = this.x * multiplier;
    let multiplyY = this.y * multiplier;
    return {x: multiplyX, y: multiplyY};
  }
}

const start = new Vector(30, 50);
const moveTo = new Vector(5, 10);
const finish = start.plus(moveTo.times(2));

console.log(`Исходное расположение: ${start.x}:${start.y}`);
console.log(`Текущее расположение: ${finish.x}:${finish.y}`);

