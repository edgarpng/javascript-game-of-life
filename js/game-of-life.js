var GameOfLife = (function(){

  "use strict";

  var liveCellsRatio = 0.1;//cells alive in the 1st random generation
  var currentGeneration;
  var width;
  var height;

  return function(gridWidth, gridHeight){
    this.getCurrentGeneration = getCurrentGeneration;
    this.getNextGeneration = getNextGeneration;
    this.randomize = randomize;
    this.toggleCell = toggleCell;
    currentGeneration = emptyGrid(gridWidth, gridHeight);
    width = gridWidth;
    height = gridHeight;
  }

  function getCurrentGeneration(){
    return currentGeneration;
  }

  function getNextGeneration(){
    var result = [];
    var liveCells;
    var i, j;
    var isCellAlive;

    for(i= 0; i < width; i++){
      result[i] = [];
      for(j= 0; j < height; j++){
        liveCells = liveCellsAround(i,j);
        isCellAlive = currentGeneration[i][j];
        if(isCellAlive){
          result[i][j] = (liveCells === 2 || liveCells === 3);
        }
        else{
          result[i][j] = (liveCells === 3);
        }
      }
    }

    currentGeneration = result;
    return result;
  }

  function randomize(){
    return currentGeneration = randomGrid(width, height);
  }

  function toggleCell(x, y){
    if(typeof currentGeneration[x] !== 'undefined' 
      && typeof currentGeneration[x][y] !== 'undefined'){
      currentGeneration[x][y] = !currentGeneration[x][y];
    }
  }

  function randomGrid(w, h){
    var random;
    var result = [];
    var i, j;

    for(i= 0; i < w; i++){
      result[i] = [];
      for(j= 0; j < h; j++){
        random = Math.random();
        result[i][j] = random < liveCellsRatio;
      }
    }

    return result;
  }

  function emptyGrid(w, h){
    var random;
    var result = [];
    var i, j;

    for(i= 0; i < w; i++){
      result[i] = [];
      for(j= 0; j < h; j++){
        result[i][j] = false;
      }
    }

    return result;
  }

  function liveCellsAround(x, y){
    var i, j;
    var k, l;
    var count = 0;

    for(i=x-1; i <= x+1; i++){
      for(j=y-1; j <= y+1; j++){
        if(x !== i || y !== j){
          k = clamp(i, 0, width-1);
          l = clamp(j, 0, height-1);
          if(currentGeneration[k][l]){
            count++;
          }
        }
      }
    }

    return count;
  }

  function clamp(value, lowerBound, upperBound){
    if(value < lowerBound){
      return upperBound
    }
    if(value > upperBound){
      return lowerBound;
    }
    return value;
  }

}());