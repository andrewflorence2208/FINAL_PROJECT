            var score = 0
            var gamestatus = 0
            function reload(){
                score += 100
                draw();
                ctx.clearRect()}
            function draw() { //Movement test / Left
            var canvas  = document.getElementById("tela");
            canvas.width = 800;
            canvas.height = 800;
            var ctx = canvas.getContext("2d");
            var spawnx = 0
            var spawny = 0
            var button1spawnx = 0
            var button1spawny = 0
            var button2spawnx = 0
            var button2spawny = 0
            var button3spawnx = 0
            var button3spawny = 0
            var doorspawnx = 0
            var doorspawny = 0
            var g = 4
            var mapa = []
            function plano_labirinto(){
                

            var linhas = canvas.width
            var colunas = canvas.height

            var salas = []
            var collide = false;

            var quantia = 10 // quantia de salas
            var tamanho = 20
            var tamanhoMin = 20 //tamanho das salas será entre tamanhoMin e tamanhoMin + tamanho

            var disx
            var disy
            var corredorLargura = 3

            function parede(col, lin, x, y){
                this.col = col
                this.lin = lin 
                this.x = x
                this.y = y 
                this.empty = false //atributos dos blocos que formação a parede do labirinto 
                
                this.show = function() {
                    if (this.empty == false) {
                        ctx.fillStyle = "rgb(50,50,50,1)";
                        ctx.fillRect(this.x, this.y, g, g);
                    } else {
                        ctx.fillStyle = "rgb(105,105,102,1)";
                        ctx.fillRect(this.x, this.y, g, g);
                    }
                }
                
                
                this.carve = function(dis, x, y) {
                    for (var i = 0; i < salas.length; i++) {
                    if (
                        this.col >= salas[i].y / g &&
                        this.col < salas[i].y / g + salas[i].h / g &&
                        this.lin >= salas[i].x / g &&
                        this.lin  < salas[i].x / g + salas[i].w / g
                    ) {
                    this.empty = true;
                        }
                    }   
                };// determinante de, caso parte do labirinto seja uma sala, não possuirá paredes

                this.carveH = function(dis, x, y) {
                    if (
                    this.lin >= x &&
                    this.lin < x + dis &&
                    this.col < y + corredorLargura &&
                    this.col > y - corredorLargura
                ) {
                this.empty = true;
                
                    }
                };// determinante da geraçã dos corredores, caso certa coordenada seja um corredor, não será parede

                this.carveV = function(dis, x, y) {
                    if (
                        this.col >= y &&
                        this.col < y + dis &&
                        this.lin < x + corredorLargura &&
                        this.lin > x - corredorLargura
                        ) {
                    this.empty = true;
                    
                        }
                };//mesmo que anterior mas para outro eixo   
            }

            function makeGrid() {
                for (var lin = 0; lin < linhas; lin++) {
                for (var col = 0; col < colunas; col++) {
                    var y = col * g;
                    var x = lin * g;
                    var cell = new parede(col, lin, x, y);
                    mapa.push(cell);
                    
                }
                }
                
            } // inserir dados das celulas individuais na matriz do mapa

            function Sala(x, y, largura, altura, i) {
                this.x = (x - 1) * g;
                this.y = (y - 1) * g;
                this.w = largura * g;
                this.h = altura * g;

                this.center = [
                    Math.floor(this.x / g + largura / 2),
                    Math.floor(this.y / g + altura / 2)
                ];
                

                this.gerar = function() {
                    
                    ctx.fillStyle = "white";
                    ctx.fillText(i, this.x + this.w / 2, this.y + this.h / 2 - 20);
                };
            } // gerar posição das salas do labirinto
            
            function gerarSalas() {
                for (var i = 0; i < quantia; i++) {
                    var sala = new Sala(
                        Math.floor(Math.random() * linhas) + 1,
                        Math.floor(Math.random() * colunas) + 1,
                        Math.floor(Math.random() * tamanho) + tamanhoMin,
                        Math.floor(Math.random() * tamanho) + tamanhoMin,
                        i
                    );
                    
                
                    

                    if (i > 0) {
                    if (
                        salas[0].x + salas[0].w >= canvas.width ||
                        salas[0].x <= 0 ||
                        salas[0].y + salas[0].h >= canvas.height ||
                        salas[0].y <= 0
                    ) {
                        salas = [];
                        gerarSalas();
                        break;
                    }

                    for (var e = 0; e < salas.length; e++) {
                        collide = false;

                        if (
                            sala.x <= salas[e].x + salas[e].w &&
                            sala.x + sala.w >= salas[e].x &&
                            sala.y <= salas[e].y + salas[e].h &&
                            sala.y + sala.h >= salas[e].y
                        ) {
                        collide = true;
                        i--;
                        break;
                    } else if (
                        sala.x + sala.w >= canvas.width ||
                        sala.x <= 0 ||
                        sala.y + sala.h >= canvas.height ||
                        sala.y <= 0
                    ) {
                    collide = true;
                    i--;
                    break;
                    }
                    }
                    }

                    if (collide == false) {
                        if (i > 0) {
                            hCorridor(
                                salas[i - 1].center[0],
                                sala.center[0],
                                salas[i - 1].center[1],
                                sala.center[1]
                        );
                            vCorridor(
                                salas[i - 1].center[0],
                                sala.center[0],
                                salas[i - 1].center[1],
                                sala.center[1]
                            );
                        }
                        salas.push(sala)
                        if (i == 3) {
                            button1spawnx = salas[i].center[0] * g
                            button1spawny = salas[i].center[1] * g
                        } else if (i == 7) {
                            button2spawnx = salas[i].center[0] * g
                            button2spawny = salas[i].center[1] * g
                        } else if (i == 5) {
                            button3spawnx = salas[i].center[0] * g
                            button3spawny = salas[i].center[1] * g
                        } else if (i == 9) {
                            doorspawnx = salas[i].center[0] * g
                            doorspawny = salas[i].center[1] * g
                        }
                    }
                }
            }// inserir dados da sala na matriz salas caso não haja colisão entre salas
            
            function hCorridor(x1, x2, y1, y2) {
                if (x1 > x2) {
                    disX = x1 - x2;
                    disX += 1;

                for (var i = 0; i < mapa.length; i++) {
                    mapa[i].carveH(disX, x2, y2);
                }
                } else {
                    disX = x2 - x1;
                    disX += 1;
                    for (var i = 0; i < mapa.length; i++) {
                    mapa[i].carveH(disX, x1, y1);
                }
            }
        }

            function vCorridor(x1, x2, y1, y2) {
                var x;

                if (y1 > y2) {
                    disY = y1 - y2;
                    disY += 1;

                if (x2 + (disX - 1) > x1 + (disX - 1)) {
                    x = x2;
                } else {
                    x = x2 + (disX - 1);
                }

                for (var i = 0; i < mapa.length; i++) {
                    mapa[i].carveV(disY, x, y2);
                }
                } else {
                    disY = y2 - y1;
                    disY += 1;

                if (x1 + (disX - 1) > x2 + (disX - 1)) {
                    x = x1;
                } else {
                    x = x1 + (disX - 1);
                }

                for (var i = 0; i < mapa.length; i++) {
                    mapa[i].carveV(disY, x, y1);
                }
            }
            spawnx = salas[0].center[0] * g
            spawny = salas[0].center[1] * g;
            
        }

        function gerar() {
            for (var i = 0; i < mapa.length; i++) {
                mapa[i].carve();
                mapa[i].show();
            }

            for (var i = 0; i < salas.length; i++) {
                salas[i].gerar();
            }
            } // gerar o mapa
            

        function render() {
                makeGrid();
                gerarSalas()
                gerar();
        }
            render()
            }


        function plano_jogo(){
            var playerImage = new Image();
            playerImage.src = "https://i.imgur.com/bhcTQVr.png"

            
        //geração dos corredores entre salas

            // fim codigo do labirinto


            var tela_quiz = {
                pergunta: {},
                respostas: {}
            }
            document.getElementById("tela_quiz").innerHTML = ""

        
            var player = {
            speed: 128,
            width: 10,
            height: 10,
            lifes: 3,
            key_pieces: 0, 
            x : spawnx,
            y : spawny,
            currentx: 0,
            currenty: 0,
            drawSide() {
                ctx.fillStyle = "green"
                ctx.fillRect(this.x, this.y, this.width, this.height)
            }   
            
                
                
            }
            
            
            var playerColor = ctx.getImageData(player.x , player.y ,(player.width + 4), (player.height + 4));
              

            class button  {
                constructor(x, y, width, height, status) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height
                    this.status = status
                }
                drawSide(){
                    ctx.fillStyle = "cyan"
                ctx.fillRect(this.x,this.y,this.width,this.height);}
            }

            class square  {
                constructor(x, y, width, height, squarecolor, status) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height
                    this.color = squarecolor
                    this.status = status
                }
                drawSide() {
                    ctx.fillStyle = this.color
                    ctx.fillRect(this.x,this.y,this.width,this.height);           
                }
            }

            var buttons = [new button(button1spawnx, button1spawny, 15, 15, 0), new button(button2spawnx, button2spawny, 15, 15, 0), new button(button3spawnx, button3spawny, 15, 15, 0)]
            var door = new square(doorspawnx, doorspawny, 15, 15, "yellow", 0)

            var keysDown = {};

            addEventListener("keydown", function (event) {
                keysDown[event.key] = true;
            }, false);

            addEventListener("keyup", function (event) {
                delete keysDown[event.key];
            }, false);
            var update = function (modifier) {
                player.currentx = player.x
                player.currenty = player.y 
                if ("ArrowUp" in keysDown || "w" in keysDown) { // Player is holding up key
                    player.y -= player.speed * modifier;
                }
                if ("ArrowDown" in keysDown || "s" in keysDown) { // Player is holding down key
                    player.y += player.speed * modifier;
                }
                if ("ArrowLeft" in keysDown || "a" in keysDown) { // Player is holding left key
                    player.x -= player.speed * modifier;
                }
                if ("ArrowRight" in keysDown || "d" in keysDown) { // Player is holding right key
                    player.x += player.speed * modifier;
                }
               
            };
            
        
            var collision = function(){
                var color = "black";
                for (var i = 0; i < buttons.length; i++){
                    if(player.x+player.width >= buttons[i].x && 
                        player.x <= buttons[i].x+buttons[i].width && 
                        player.y <= buttons[i].y+buttons[i].height && 
                        player.y+player.height >= buttons[i].y){
                            color = "red"
                            player.x = player.currentx
                            player.y = player.currenty
                            ctx.clearRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height)
                            buttons[i].x = -50
                            buttons[i].y = -50
                            player.key_pieces += 1
                            console.log("collision")
                        }
                    if (player.key_pieces == 3) {
                        door.status = 1
                    } else {
                        door.status = 0
                    }
                    if(player.x+player.width >= door.x && 
                        player.x <= door.x+door.width && 
                        player.y <= door.y+door.height && 
                        player.y+player.height >= door.y && door.status == 1 ){
                            document.getElementById("tela_quiz").innerHTML = score + " " + "TESTE" + " " + player.lifes + " " + player.key_pieces + " " + gamestatus
                            reload()
                        }
                    ctx.fillStyle = color;
                    }
                    for(var i = 0, n = playerColor.data.length; i < n; i += 4) {
                        var red = playerColor.data[i];
                        var green = playerColor.data[i + 1];
                        var blue = playerColor.data[i + 2];
                        var alpha = playerColor.data[i + 3];
                    if(red==50 && green==50 && blue==50 && alpha==1){ 
                        player.x=player.currentx
                        player.y=player.currenty
                        console.log("collision_wall")
                    }
                    for(var i = 0; i < mapa.length; i++){
                            if (player.x+player.width >= mapa[i].x &&
                            player.x <= mapa[i].x+4 &&
                            player.y <= mapa[i].y+4 &&
                            player.y+player.height >= mapa[i].y && mapa[i].empty == false) {
                                player.x = player.currentx
                                player.y = player.currenty
                                console.log("collision")
                            }
                        
                    }
                        
}
            }
            
            

            var main = function () {
                update(0.02);
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (i = 0; i < buttons.length; i++){ 
                    if (buttons[i].status == 0) {
                    buttons[i].drawSide()
                    }
                    }
                    collision()
                player.drawSide();
                if (player.key_pieces == 3) {
                    door.drawSide()
                }
                requestAnimationFrame(main);
            }
            main()
        }
            plano_labirinto();
            console.log(mapa)
            var img = new Image();
            img.src = canvas.toDataURL('image/png')
            const element = document.querySelector("#tela")
            element.style.backgroundImage = 'url('+canvas.toDataURL("image/png")+')';
            plano_jogo();
        }

        