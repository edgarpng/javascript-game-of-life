(function($){

  var canvas, context;
  var width, height;
  var CELL_SIZE = 15;
  var SPACING = 1;
  var REFRESH_INTERVAL = 200;
  var DEAD_CELL_COLOR = "rgba(255, 255, 255, .5)";
  var LIVE_CELL_COLOR = "rgba(150, 255, 0, .5)";
  var game;

  function init(){
    canvas = $("#canvas");
    context = canvas.get(0).getContext("2d");
    stretchCanvas();
    game = new GameOfLife(gridWidth(), gridHeight());
    draw(game.getCurrentGeneration());
    setInterval(redraw, REFRESH_INTERVAL);
  }

  function stretchCanvas(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.attr("width", width);
    canvas.attr("height", height);
  }

  function redraw(){
    draw(game.getNextGeneration());
  }

  function draw(grid){
    var i, j;
    clear();
    for(i=0; i< grid.length; i++){
      for(j=0; j< grid[0].length; j++){
        context.fillStyle = grid[i][j]? LIVE_CELL_COLOR : DEAD_CELL_COLOR;
        context.beginPath();
        context.rect(i * increment(), j * increment(), CELL_SIZE, CELL_SIZE);
        context.closePath();
        context.fill();
      }
    }
  }

  function clear() {
    context.clearRect(0, 0, width, height);
  }

  function increment(){
    return CELL_SIZE + SPACING;
  }

  function gridHeight(){
    return Math.ceil(height / increment());
  }

  function gridWidth(){
    return Math.ceil(width / increment());
  }

  $(init);
}(jQuery));