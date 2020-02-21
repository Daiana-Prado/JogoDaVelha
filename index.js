const readline = require('readline')
var tabuleiro = []
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const vez = function(vez){
    if(vez === -1){
        return "  -  "
    } else if(vez === 0){
        return "  O  "
    } else{
        return "  X  "
    }
}

var quemJoga = 0

var posicao = {"x": 0, "y": 0}

var joguei = false

var jogarBot = null

const game = {
    "new": function(){
        console.clear()
        tabuleiro = [
                    [-1,-1,-1],
                    [-1,-1,-1],
                    [-1,-1,-1]
        ]
    },
    "tabuleiro": function(){
        var aux = ""
        console.log("Jogue usando números, X e Y")
        console.log("   0    1    2")
        for(let i = 0; i < tabuleiro.length; i++){
            if(i <= 2){
                aux += `${i}`
            }
            for(let b = 0; b < tabuleiro[i].length; b++){
                if(b === 2){
                    aux += `${vez(parseInt(tabuleiro[i][b]))}\n`
                } else{
                    aux += `${vez(parseInt(tabuleiro[i][b]))}`
                }
            }
        }
        return aux
    },
    "botPlay": function(){
        var idY = Math.floor(Math.random() * tabuleiro.length)
        var idX = Math.floor(Math.random() * tabuleiro[idY].length)
        while(tabuleiro[idY][idX] === 0 || tabuleiro[idY][idX] === 1){
            idY = Math.floor(Math.random() * tabuleiro.length)
            idX = Math.floor(Math.random() * tabuleiro[idY].length)
        }
        tabuleiro[idY][idX] = 0
        if(quemJoga == 0){
            quemJoga = 1
        } else{
            quemJoga = 0
        }
    },
    "play": function(x, y){
        const found = tabuleiro[x][y]
        if(found === -1){
        if(quemJoga == 0){
            quemJoga = 1
        } else{
            quemJoga = 0
        }
        if(jogarBot !== "y"){
            tabuleiro[x][y] = quemJoga
        } else{
            tabuleiro[x][y] = quemJoga
            game.botPlay()
        }
        }
        joguei = false
    },
    "verifica": function(){
        //Verifica O
        if(tabuleiro[0][0] === 0 && tabuleiro[0][1] === 0 && tabuleiro[0][2] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[1][0] === 0 && tabuleiro[1][1] === 0 && tabuleiro[1][2] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[2][0] === 0 && tabuleiro[2][1] === 0 && tabuleiro[2][2] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[0][0] === 0 && tabuleiro[1][1] === 0 && tabuleiro[2][2] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[0][2] === 0 && tabuleiro[1][1] === 0 && tabuleiro[2][0] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[0][0] === 0 && tabuleiro[1][0] === 0 && tabuleiro[2][0] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[0][1] === 0 && tabuleiro[1][1] === 0 && tabuleiro[2][1] === 0){
            return "O ganhou parabéns"
        } else if(tabuleiro[0][2] === 0 && tabuleiro[1][2] === 0 && tabuleiro[2][2] === 0){
            return "O ganhou parabéns"
        }
        //Verifica X
        if(tabuleiro[0][0] === 1 && tabuleiro[0][1] === 1 && tabuleiro[0][2] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[1][0] === 1 && tabuleiro[1][1] === 1 && tabuleiro[1][2] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[2][0] === 1 && tabuleiro[2][1] === 1 && tabuleiro[2][2] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[0][0] === 1 && tabuleiro[1][1] === 1 && tabuleiro[2][2] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[0][2] === 1 && tabuleiro[1][1] === 1 && tabuleiro[2][0] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[0][0] === 1 && tabuleiro[1][0] === 1 && tabuleiro[2][0] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[0][1] === 1 && tabuleiro[1][1] === 1 && tabuleiro[2][1] === 1){
            return "X ganhou parabéns"
        } else if(tabuleiro[0][2] === 1 && tabuleiro[1][2] === 1 && tabuleiro[2][2] === 1){
            return "X ganhou parabéns"
        }
    }
}

var rodou = false

//Function perguntar
function perguntar(){
    console.log(game.tabuleiro())
    var bot = null
    if(jogarBot === null){
    bot = () => {
        return new Promise((resolve, reject) => {
        rl.question('Deseja jogar com bot? (y or n)  ', (answer) => {
            jogarBot = answer
            resolve()
        })
        })
    }
    }
    const question1 = () => {
        return new Promise((resolve, reject) => {
        rl.question('Posição X:  ', (answer) => {
            posicao.x = answer
            resolve()
        })
        })
    }
    const question2 = () => {
        return new Promise((resolve, reject) => {
        rl.question('Posição Y:  ', (answer) => {
            posicao.y = answer 
            joguei = true
            resolve()
        })
        })
    }
    const main = async () => {
        if(!rodou){
        await bot()
        }
        await question1()
        await question2()
        rodou = true
        if(joguei){
            if(posicao.x === "" || posicao.x === null){
                posicao.x = 0
            }
            if(posicao.y === "" || posicao.y === null){
                posicao.y = 0
            }
            game.play(posicao.x, posicao.y)
            console.clear()
            if(!game.verifica()){
            perguntar()
            } else{
                console.log(game.verifica())
                console.log("Iniciando um novo jogo em 2 segundo")
                setTimeout(() => {
                    game.new()
                    perguntar()
                }, 2000);
            }
        }
    }
    main()
}

//Start new Game
game.new()
perguntar()
