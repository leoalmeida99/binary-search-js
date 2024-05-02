let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let getParagrafoDica = document.getElementById('dica');
let min = 1;
let max = numeroLimite;
let melhorDiferencaEntreMaxEMin = numeroLimite;
let melhorMin = 1 
let melhorMax = numeroLimite;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == '' || chute > numeroLimite || chute < 1){
        exibirTextoNaTela('h1', 'Digite um número válido!');
        limparCampo();
        return;
    }

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        debugger;
        atualizaDica(true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
            atualizaDica(false, true, chute);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
            atualizaDica(false, false, chute);
        }
        tentativas++;
        limparCampo();
    }
}

function atualizaDica(UsuarioVenceu, isNumeroSecretoEhMenor, palpite) {
    debugger;
    if (UsuarioVenceu) {
        getParagrafoDica.innerHTML = `O número secreto é: ${numeroSecreto}`;
        return;
    }
    palpite = parseInt(palpite);
    let diferencaEntrePalpiteAtualEMaximoAtual;
    if (isNumeroSecretoEhMenor) {
        diferencaEntrePalpiteAtualEMaximoAtual = palpite - min; 
        minAtual = min;
        maxAtual = palpite;
        max = palpite;
    } else {
        diferencaEntrePalpiteAtualEMaximoAtual = max - palpite;
        minAtual = palpite;
        maxAtual = max;
        min = palpite;
    }

    if (diferencaEntrePalpiteAtualEMaximoAtual < melhorDiferencaEntreMaxEMin){
        melhorDiferencaEntreMaxEMin = diferencaEntrePalpiteAtualEMaximoAtual;
        melhorMin = minAtual; 
        melhorMax = maxAtual;
    }
    getParagrafoDica.innerHTML = `Dica: o numero está entre ${melhorMin} e ${melhorMax}, sugestão: ${diferencaEntrePalpiteAtualEMaximoAtual}`;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    min = 1;
    max = numeroLimite;
    getParagrafoDica.innerHTML = `Dica: o numero está entre ${min} e ${max}`;
}