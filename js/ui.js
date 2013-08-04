(function($){

  var canvas, context;
  var width, height;
  var game;
  //Board styles
  var CELL_SIZE = 15;
  var SPACING = 1;
  var REFRESH_INTERVAL = 200;
  var DEAD_CELL_COLOR = "rgba(255, 255, 255, .5)";
  var LIVE_CELL_COLOR = "rgba(150, 255, 0, .5)";
  //Key codes and events for each key press
  var keys = {13: 'enter', 80: 'p', 82: 'r', 83: 's'};
  var keyFunctions = {'enter': startGame, 'r': startRandomGame};

  function init(){
    canvas = $("#canvas");
    context = canvas.get(0).getContext("2d");
    canvas.click(toggleCell);
    $(window).keyup(handleKeyPresses);
    $(window).resize(stretchCanvas);
    stretchCanvas();
    game = new GameOfLife(gridWidth(), gridHeight());
    draw(game.getCurrentGeneration());
  }

  function startGame(){
    setInterval(redraw, REFRESH_INTERVAL);
    $(window).off('keyup');
    $("#header").fadeOut(300);
  }

  function startRandomGame(){
    draw(game.randomize());
    startGame();
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

  function redraw(){
    draw(game.getNextGeneration());
  }

  function clear() {
    context.clearRect(0, 0, width, height);
  }

  function stretchCanvas(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.attr("width", width);
    canvas.attr("height", height);
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

  function toggleCell(event){
    var x = event.pageX;
    var y = event.pageY;
    var cell = cellAtCoordinates(x, y);
    game.toggleCell(cell.x, cell.y);
    draw(game.getCurrentGeneration());
  }

  function cellAtCoordinates(x, y){
    var cell = {};
    cell.x = Math.floor(x / increment());
    cell.y = Math.floor(y / increment());
    return cell;
  }

  function handleKeyPresses(event){
    var key = keys[event.which];
    var callback = keyFunctions[key];
    if(typeof callback === 'function'){
      callback(event);
      canvas.off('click');
    }
  }

  $(init);
}(jQuery));