var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update:update, render: render });

//code grotendeels uit de lessen, van de opdrachten in Phaser, en van de templates van blackboard. Wel helemaal zelf getyped, en passend gemaakt bij mijn eigen game. 

var fishSprites; //de vissen
var child; //kind, de mushroom
var geluid1; //achtergrond muziek
var geluid2; //jump geluid
var geluid3; //pickup geluid (p-ping)
//var toets1; //als deze ingedrukt wordt gaat het geluidplayer geluid afspelen
var player; //de speler, jij
var greenJellyfish;
var crab; //de rode krab
var egg; //de eggplant (rechtsbovenin)
var carrot; //de wortel
var melon; //de meloen
var platform; //de platformen
var rightButton;//pijltjes toets naar rechts
var leftButton; //pijltjes toets naar links
var jumpButton; //pijltjes toets naar boven
var downButton; //pijltjes toets naar beneden
var text; //de text bovenin
var text2;
var text3;
var score=0; //score wordt bijgehouden
var aantal=0;
var AANTAL_CLOUDS=6; //aantal wolken
var AANTAL_FISH=9; //aantal vissen, de vijanden

function preload() {
    game.load.baseURL = 'https://examples.phaser.io/assets/'; //link met alle plaatjes op example.phaser.io
    game.load.image('sky', 'particlestorm/sky10.png') //de achtergrond
    game.load.image('platform1', 'particlestorm/particles/block1.png'); //het rode platform
    game.load.image('platform2', 'particlestorm/particles/block2.png'); //het oranje platform
    game.load.image('platform3', 'particlestorm/particles/block3.png'); //het gele platform
    game.load.image('platform4', 'particlestorm/particles/block4.png'); //het groene platform
    game.load.image('platform5', 'particlestorm/particles/block5.png'); //het blauwe platform
    game.load.image('platform6', 'particlestorm/particles/block6.png'); //het donkerblauwe platform helemaal onderaan
    game.load.image('platform7', 'particlestorm/particles/block7.png'); //het paarse platform
    //een platform bestaat maar uit 1 vierkantje, maar ik heb de vierkantjes in create d.m.v. coördinaten naast elkaar gezet.
    game.load.image('tomato', 'sprites/tomato.png'); //tomaat
    game.load.image('carrot', 'sprites/carrot.png'); //wortel
    game.load.image('cloud', 'particlestorm/cloud.png');
    game.load.atlasXML('seacreatures', 'sprites/seacreatures.png', 'sprites/seacreatures.xml'); //hier staan heel veel dieren in, maar ik gebruik aleen greenJelleyfish
    game.load.image('fish', 'games/gofish/fishie.png'); //de vijand
    game.load.image('melon', 'sprites/melon.png'); //waar de vijand in veranderd
    game.load.image('mushroom', 'sprites/mushroom.png'); //de paddestoel die de vijand draagt
    game.load.image('eggplant', 'sprites/eggplant.png'); //de blauwe eggplant

    game.load.audio('geluidachtergrond', ['audio/tech/drums.mp3']); //de achtergrondmuziek die constant afspeelt
    //game.load.audio('geluidplayer', ['audio/SoundEffects/numkey_wrong.wav']); //als je player jumpt
    game.load.audio('pickup', ['audio/SoundEffects/p-ping.mp3']); //als de player een fish met mushroom heeft gevangen
}

function create() {
    game.add.image(0, 0, 'sky'); //positie van achtergrond afbeelding

    game.add.image(210, 385, 'tomato'); //plaatje van tomaat
    carrot = game.add.image(710, 430, 'carrot'); //plaatje van carrot
    carrot.scale.set(1.5);

    egg = game.add.image(640, 100, 'eggplant')
    egg.scale.set(1.5);

    crab = game.add.sprite(80, 510, 'seacreatures'); //sprite wordt toegevoegd
    crab.animations.add('swim', Phaser.Animation.generateFrameNames('crab1', 0, 25, '', 4), 30, true); //crab wordt uit sprite gehaald
    crab.animations.play('swim'); //animatie afspelen
    crab.scale.set(0.8); //crab wordt kleiner gemaakt

    platform = game.add.physicsGroup(); //alle platformen hebben dezelfde eigenschappen, maar een andere positie
    platform.create(650, 130, 'platform1');
    platform.create(620, 130, 'platform1');

    platform.create(500, 350, 'platform2');
    platform.create(530, 350, 'platform2');
    platform.create(560, 350, 'platform2');
    platform.create(590, 350, 'platform2');

    platform.create(200, 400, 'platform3');
    platform.create(230, 400, 'platform3');

    platform.create(100, 150, 'platform4'); 
    platform.create(130, 150, 'platform4');
    platform.create(160, 150, 'platform4');

    platform.create(700, 460, 'platform5');
    platform.create(730, 460, 'platform5');

    platform.create(30,  570, 'platform6');
    platform.create(0,   570, 'platform6');
    platform.create(60,  570, 'platform6');
    platform.create(90,  570, 'platform6');
    platform.create(120, 570, 'platform6');
    platform.create(150, 570, 'platform6');
    platform.create(180, 570, 'platform6');
    platform.create(210, 570, 'platform6');
    platform.create(240, 570, 'platform6');
    platform.create(270, 570, 'platform6');
    platform.create(300, 570, 'platform6');
    platform.create(330, 570, 'platform6');
    platform.create(560, 570, 'platform6');
    platform.create(590, 570, 'platform6');
    platform.create(620, 570, 'platform6');
    platform.create(650, 570, 'platform6');
    platform.create(680, 570, 'platform6');
    platform.create(710, 570, 'platform6');
    platform.create(740, 570, 'platform6');
    platform.create(770, 570, 'platform6');
    platform.create(800, 570, 'platform6'); //van links naar rechts

    platform.create(0, 540, 'platform6');
    platform.create(0, 510, 'platform6');//van onder naar boven aan de linker kant
    platform.create(770, 540, 'platform6'); //van onder naar boven aan de rechter kant 

    platform.create(350, 220, 'platform7');
    platform.create(380, 220, 'platform7');
    platform.create(410, 220, 'platform7');
    //platforms eerste getal staat voor x coördinaten (van links naar rechts met een maximum van 800, en tweede getal staat voor
    // y coördinaten van boven naar beneden met een maximum van 600. Hoevaak een platform (vb: platform 5) voorkomt, hoe vaker je dat blokje in het spel ziet. 

    player = game.add.sprite(200, 200, 'seacreatures'); //paarse getallen staan voor de positie van de wabbit, eerste getal staat voor positie van links naar rechts, tweede getal staat 
    //voor positie van boven naar beneden.
    player.scale.set(0.6);//player wordt kleiner gemaakt
    game.physics.arcade.enable(player);//player wordt aangezet

    player.body.collideWorldBounds = false; //of de wabbit de grenzen van het spel (muren) kan waarnemen en tegen deze aanbotst.
    player.body.gravity.y = 700; //of de wabbit zwaartegracht ervaart, getal staat voor hoe sterk de zwaartekracht is.
    //player.body.bounce.set(0.8); //speler stuiterd tegen de platformen
    player.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true); //hier wordt bepaald dat alleen greenJelleyfish te zien moet zijn
    player.animations.play('swim'); //animatie afspelen

    cloudSprites = [];
    for (var i = 0; i < AANTAL_CLOUDS; i++) { //zet de 5 wolken in het spel neer
        cloudSprites[i] = game.add.sprite(0, 0, 'cloud'); //verwijst naar de cloud afbeelding
        cloudSprites[i].position = new Phaser.Point(game.rnd.frac() * 800, game.rnd.frac() * 600); //willekeurige plaatsen binnen 800 bij 600 voor de wolken wordt gekozen
    }
    game.physics.enable(cloudSprites, Phaser.Physics.ARCADE); //wolken worden aangezet

    var screenCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
    for (var i =0; i < AANTAL_CLOUDS; i++) { 
        var velocity = Phaser.Point.subtract(screenCenter, cloudSprites[i].position);
        velocity.setMagnitude(game.rnd.frac()*20); //omvang, en het getal staat voor de maximale snelheid van de wolken. er wordt per wol een snelheid gekozen tussen 0 en 20.
        cloudSprites[i].body.velocity=velocity; //snelheid
        //geen hoeksnelheid, omdat ik niet wil dat de wolken draaien heb ik deze weggehaalt.
    }

    fishSprites = [];
    for (var i = 0; i < AANTAL_FISH; i++) { //zet de 5 wolken in het spel neer
        fishSprites[i] = game.add.sprite(0, 0, 'fish'); //verwijst naar de cloud afbeelding
        fishSprites[i].position = new Phaser.Point(game.rnd.frac() * 700, game.rnd.frac() * 200); //willekeurige plaatsen binnen 800 bij 600 voor de wolken wordt gekozen
        fishSprites[i].addChild(game.make.sprite(0,-21, 'mushroom')); //
    }
    game.physics.enable(fishSprites, Phaser.Physics.ARCADE);

    var screenCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
    for (var i =0; i < AANTAL_FISH; i++) {
        var velocity = Phaser.Point.subtract(screenCenter, fishSprites[i].position);
        velocity.setMagnitude(game.rnd.frac()*20); //omvang, en het getal staat voor de maximale snelheid van de wolken. er wordt per wol een snelheid gekozen tussen 0 en 20.
        fishSprites[i].body.velocity=velocity;
        //geen hoeksnelheid, omdat ik niet wil dat de wolken draaien heb ik deze weggehaalt.
    }

    platform.setAll('body.immovable', true); //de speler kan landen op de blokken

    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    var style = { font: "25px Arial", fill: "#fff"} //de stijl van de text

    text = game.add.text(10, 10, "Jumps: " + score, style); //de text van het aantal jumps
    tex2 = game.add.text(150, 10, "Catch the mushrooms! But only catch them from above...", style); //de andere text
    text3 = game.add.text(10, 50, "Mushrooms: " + aantal, style);

    toets1 = game.input.keyboard.addKey(Phaser.Keyboard.UP); //toets waarmee het geluid aan gaat
    geluid1 = game.add.audio('geluidachtergrond'); //achtergrond geluid
    //geluid2 = game.add.audio('geluidplayer'); //jump geluid
    geluid3 = game.add.audio('pickup'); //p-ping geluid
}

function update() {
    if(geluid1.isPlaying===false) { //als het geluid uit staat
            geluid1.play(); //checken of ie al aan staat, wordt helemaal afgespeeld.
        }
    
    // else if (toets1.isDown) {
    //     if(geluid2.isPlaying===false) { //als het geluid uit staat
    //         geluid2.play(); //jumpgeluid afspelen
    //     }
    // }

    if (player.body.velocity.y>=0) { //snelheid
    game.physics.arcade.collide(player, platform); //speler en platforms kunnen botsen, 
    }
    player.body.velocity.x = 0;

    if (leftButton.isDown) //als de linker pijltjestoets is ingedrukt
    {
        player.body.velocity.x = -300;//de snelheid van de player naar links
    }
    else if (rightButton.isDown) //als de rechter pijltjestoets is ingedrukt
    {
        player.body.velocity.x = 300;//de snelheid van de player naar rechts
    }
    else if (jumpButton.isDown) //als de boven pijltjestoets is ingedrukt
    {
        player.body.velocity.y = -150;//de snelheid van de player naar boven
    }
    else if (downButton.isDown) //als de beneden pijltjestoets is ingedrukt
    {
        player.body.velocity.y = 150;//de snelheid van de player naar beneden
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) //de player kan pas jumpen, en dit wordt dus pas geteld, als de player een platform aanraakt
    {
        player.body.velocity.y = -400; //de player jumpt 
        score++;
        text.text="Jumps " + score; //het aantal jumps vanaf een platform van de player wordt bijgehouden
    }
       
   game.physics.arcade.overlap(player, fishSprites, changeMelon); //hiermee is er collision herkenning tussen fish en kwal

}

function onBulletHit(obj1, obj2) {
    obj2.loadTexture(); //als de kwal de fish raakt, gaat de fish (obj1) weg
}

function changeMelon(kwal, fish) {
    fish.loadTexture('melon'); //de fish wordt veranderd in melon
    fish.body.velocity.x = 60; //de snelheid waarmee de melon naar rechts gaat, is geen zwaartekracht.
    fish.body.gravity.y = 20; //de zwaartekracht die alleen de melon ervaart, als dus de fish in melon is veranderd.
    if (fish.body.touching.up==true) { //als de kwal de mushroom en melon van boven raakt, verdwijnen de mushroom en melon
        fish.kill(); //de fish (met dus de mushroom eraan) wordt gedood
        geluid3.play(); //als de kwal de mushroom en fish van boven raakt hoor je het p-ping geluid (geluid3)
        aantal++;
        text3.text="Mushrooms " + aantal;
    }
    else {
        kwal.kill(); //als de kwal de melon en mushroom van onderen raakt, verdwijnt de kwal
    }
}

function render() {
    
}