var GameOfLife = (function(){

  var liveCellsRatio = 0.1;

  return function(width, height, liveCellsRatio){
    this.width = width;
    this.height = height;
    this.liveCellsRatio = liveCellsRatio;
    this.currentGeneration = currentGeneration;
    this.nextGeneration = nextGeneration;
  }

  function currentGeneration(){
    return randomArray(this.width, this.height)
  }

  function nextGeneration(){
    return randomArray(this.width, this.height)
  }

  function randomArray(width, height){
    var random;
    var result = [];
    var i, j;

    for(i= 0; i < width; i++){
      for(j= 0; j < height; j++){
        random = Math.random();
        result[i] = result[i] || [];
        result[i][j] = random > (1 - liveCellsRatio);
      }
    }

    return result;
  }

}());