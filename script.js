let order = []; //ordens do jogo aleatórias
let clickedOrder = []; // ordem dos nossos cliques
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul


//querySelector seleciona o primeiro que possui o mesmo nome indicado.
//querySelectorAll seleciona todos com o mesmo nome indicado
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const comeco = document.getElementById('comeco');
const comeco_corpo = document.getElementById('comeco_corpo');
const corpo = document.getElementById('corpo');
const pontos = document.getElementById('pontuacao');
const comecar_jogo = document.getElementById('comecar_jogo');
//cria ordem aleatória de cores


let menu = () =>{
    comeco.style.visibility = 'visible';
    corpo.style.visibility = 'hidden';
    pontos.style.visibility = 'hidden';
    comeco_corpo.style.visibility = 'visible';
    score = 0;
    order = [];
    clickedOrder = [];
}

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); //guarda um numero aleatorio a cada rodada do 0 ao 3
    order[order.length] = colorOrder; //atribui o indice do array com o numero da cor escolhida
    clickedOrder = []; //mesmo que não tenha sido alterada, é importante reescrever para poder mudar dentro da função

    for(let i in order){
        let elementColor = createColorElement(order[i]); //variavel que vai guardar o numero do array order e que será usado dentro da função
        lightColor(elementColor, Number(i) + 1); //pega o numero + 1 pra existir na lista de cores. Number só indica que é um número
    }
}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected'); //adiciona uma classe usada no css
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//setTimeout espera um certo tempo passar para entao executar a função. Dois parametros (função, tempo)

//checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder){ //uso do in pois está iterando cada item do array
        if(clickedOrder[i] != order[i]){ //o i é o mesmo em clickedOrder e em order. O i mostra tudo que tem dentro da let, todos os numeros e vai comparar com todos os numeros da outra let
            corpo.style.visibility = 'visible';
            document.getElementById('pontuacao_final').innerHTML = (score - 1) + " pontos";
            gameOver(); //executa a função lose
            break //para a iteração do for, roda o lose e em seguida para de novo
        }
    }
    if(clickedOrder.length == order.length){
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível`);
        document.getElementById('pontos').innerHTML = score; //MUDANÇA: coloquei a pontuação em um balão dentro da página
        nextLevel(); //Executa a função nextLevel
    }
}

//for in retorna o índice (0, 1, 2) e o for of retorna os valores (34, 52, 21)

//função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder(); // executa a função checkOrder.
        //Precisa ser dentro pois ele vai remover o selected e nunca vai conseguir checar (pois não existe mais nada)
    }, 200), 250
}

//Função que retorna a cor
let createColorElement = (color) => { //condicional - se for verde vai retornar um número
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if (color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

//função para o próximo nível do jogo
let nextLevel = () => {
    score ++; //aumenta o score
    shuffleOrder(); //faz o shuffle com uma nova ordem de cores
}

//Caso o jogador tenha perdido o jogo, game over. Dá um alert
let gameOver = () =>{
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em ok para iniciar um novo jogo`); -> outra maneira de escrever, usado dois acentos graves ``
    //alert('Pontuação: ' + score + '\nVocê perdeu o jogo!\nClique em ok para iniciar um novo jogo');
    corpo.style.visibility = 'visible';
    order = []; //zera a ordem das cores
    clickedOrder = []; //zera a ordem dos cliques
    score = 0;
    //menu(); //Recomeça o jogo
}

//função de início de jogo
let playGame = () =>{
    //alert('Bem vindo ao Gênesis, iniciando novo jogo!');
    score = 0; //zerar aqui porque a pessoa pode não querer recomeçar.
    corpo.style.visibility = 'hidden';
    comeco.style.visibility = 'hidden';
    pontos.style.visibility = 'visible';
    comeco_corpo.style.visibility = 'hidden';
    nextLevel();
}

//Ativar os cliques do jogo porque os antigos ainda estão computados

//eventos de clique para as cores
green.onclick = () => click(0); //precisa de um callback para executá-la
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Precisa colocar o menu() para começar primeiro e somente executar o playgame() quando for clicado o botão
//playGame(); //inicia no mesmo momento que abre a página
menu();