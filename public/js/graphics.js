var gameScene;
var tileWidth = 24;
var floorSprite;
var wallSprite;
var wallHeight = 0;
var borderOffset = new Phaser.Point(250,50); //to centralize the isometric level display

var levelData = 
    [[1,1,1,1,1,1],
     [1,0,0,0,0,1],
     [1,0,0,0,0,1],
     [1,0,0,0,0,1],
     [1,0,0,0,0,1],
     [1,1,1,1,1,1]];

function createLevel() {
    var tileType = 0;
    //~ for( var i = 0; i < levelData.lenght; i++ ) {
        //~ for( var j = 0; j < levelData[0].lenght; j++) {
            //~ tileType = levelData[i][j];
            //~ placeTile(tileType, i, j);
        //~ }
    //~ }
    
    //~ heroMapTile = new Phaser.Point(0,0);
    //~ addHero();
    //~ ...
    
    renderScene();
}

function renderScene() {
    console.log("calling renderScene()");
    gameScene.clear();
    var tileType = 0;
    for( var i = 0; i < levelData.length; ++i ) {
        for( var j = 0; j < levelData[0].length; ++j ) {
            tileType = levelData[i][j];
            drawTileIso(tileType, i,j);
        }
    }
}

function drawTileIso(tileType, i, j) {
    var isoPt  = new Phaser.Point();
    var cartPt = new Phaser.Point();
    cartPt.x = j*tileWidth;
    cartPt.y = i*tileWidth;
    isoPt = cartesianToIsometric(cartPt);
    if(tileType == 1) {
        gameScene.renderXY(floorSprite, isoPt.x+borderOffset.x, isoPt.y + borderOffset.y - wallHeight, false);
    } else {
        gameScene.renderXY(wallSprite,  isoPt.x+borderOffset.x, isoPt.y + borderOffset.y, false);
    }
}

function cartesianToIsometric(cartPt){
    var tempPt=new Phaser.Point();
    tempPt.x=cartPt.x-cartPt.y;
    tempPt.y=(cartPt.x+cartPt.y)/2;
    return (tempPt);
}
function isometricToCartesian(isoPt){
    var tempPt=new Phaser.Point();
    tempPt.x=(2*isoPt.y+isoPt.x)/2;
    tempPt.y=(2*isoPt.y-isoPt.x)/2;
    return (tempPt);
}
