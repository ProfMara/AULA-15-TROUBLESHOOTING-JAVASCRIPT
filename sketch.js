//PASSO 1 CRIAR AS VARIÁVEIS
var trex_correndo, trex, trex_parado, trex_colidido;
var solo, soloImagem, soloInvisivel;
var nuvemImagem;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var grupoNuvem, grupoCacto;

//CARREGAR ARQUIVOS DE MÍDIA
function preload() {
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");

    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_parado = loadAnimation("trex1.png");
    trex_colidido = loadAnimation("./assets/trex_colidido.png")
    obs1 = loadImage("obstaculo1.png");
    obs2 = loadImage("obstaculo2.png");
    obs3 = loadImage("obstaculo3.png");
    obs4 = loadImage("obstaculo4.png");
    obs5 = loadImage("obstaculo5.png");
    obs6 = loadImage("obstaculo6.png");
}

function setup() {
    createCanvas(600, 200);


    //solo
    solo = createSprite(300, 190, 600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    soloInvisivel = createSprite(300, 199, 600, 2);
    soloInvisivel.visible = false;    

    //trex
    trex = createSprite(50, 170, 150, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("parado", trex_parado);
    trex.addAnimation("colidido", trex_colidido);
    //define o raio colisor
    trex.setCollider("rectangle", 100,0, 300,100);

    trex.debug = true;  
    trex.scale = 0.5;

    grupoCacto = new Group();
    grupoNuvem = new Group();
    
}

function draw() {
    background("white");
    if(gameState ==PLAY){
        trex.changeAnimation("correndo");

        if (solo.x < 0) {
            solo.x = solo.width / 1.99;
        }

        if (keyDown("space") && trex.isTouching(solo)) {
            trex.velocityY = -13;
        }
        if(!trex.isTouching(solo)){
            trex.changeAnimation("parado");
        }
        if(trex.isTouching(grupoCacto)){
            gameState = END;
        }
    }
    if(gameState == END){
        solo.velocityX = 0;
    }
    

    trex.velocityY += 0.8;
    trex.collide(soloInvisivel)
   
    criarNuvens();
    gerarObs();
    drawSprites();

}
//cria a function 
function criarNuvens(){
    if (frameCount % 60 === 0) {
        nuvem = createSprite(600, 100, 40, 10);
        nuvem.y = Math.round(random(10, 60));
        nuvem.addImage(nuvemImagem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;

        //atribuir tempo de vida à sprite
        nuvem.lifetime = 200;
        //ajustar a profundidade
        trex.depth = nuvem.depth + 1;
        grupoNuvem.add(nuvem);
        grupoNuvem.setLifetimeEach(30);
      
    }
}

function gerarObs() {
    if (frameCount % 60 === 0) {
        var cacto = createSprite(400, 175, 10, 40);
        cacto.velocityX = -6;

        //gerar obstáculos aleatórios
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1:
                cacto.addImage(obs1);
                break;
            case 2:
                cacto.addImage(obs2);
                break;
            case 3:
                cacto.addImage(obs3);
                break;
            case 4:
                cacto.addImage(obs4);
                break;
            case 5:
                cacto.addImage(obs5);
                break;
            case 6:
                cacto.addImage(obs6);
                break;
            default:
                break;
        }

        //atribuir escala e vida útil ao obstáculo       
        cacto.scale = 0.5;
        cacto.lifetime = 300;
        grupoCacto.add(cacto);
        grupoCacto.setLifetimeEach(20);

    }
}