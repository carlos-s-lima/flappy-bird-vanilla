// ===== VARIÁVEIS GLOBAIS =====
let gameLoop = null
let esteira = null
let passaro = null
let eventListenersAdicionados = false

// ===== FUNÇÕES UTILITÁRIAS =====

// Função construtora de um elemento qualquer
function novoElemento(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

// ===== CONSTRUTORES DE OBJETOS DO JOGO =====

// Função construtora de uma barreira
function Barreira(reversa = false) {
    this.elemento = novoElemento("div", "barreira")

    const bico = novoElemento("div", "bico")
    const corpo = novoElemento("div", "corpo")

    this.elemento.appendChild(reversa ? corpo : bico)
    this.elemento.appendChild(reversa ? bico : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

// Função construtora de um par de barreiras
function parDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento("div", "barreiras")

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split("px")[0])
    
    this.setX = x => this.elemento.style.left = `${x}px`

    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

// Função responsável por criar, animar e reaproveitar as barreiras do jogo
function Esteira(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + 2 * espaco),
        new parDeBarreiras(altura, abertura, largura + 3 * espaco),
        new parDeBarreiras(altura, abertura, largura + 4 * espaco)
    ]
    
    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
        
            const meio = largura / 2
            const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio
            if(cruzouOMeio) notificarPonto()
        })
    }
}

// Função construtora do Pássaro
function Passaro(alturaJogo) {
    this.elemento = novoElemento("img", "bird")
    this.elemento.src = "../img/birdNew.png"

    this.getY = () => parseInt(this.elemento.style.bottom.split("px")[0])
    this.setY = y => {
        if (y <= 0) {
            y = 0
            this.setAngulo(0)
        }
        this.elemento.style.bottom = `${y}px`
    }

    // Controle de rotação
    let angulo = 0
    this.setAngulo = novoAngulo => {
        angulo = novoAngulo
        this.elemento.style.transform = `rotate(${angulo}deg)`
    }

    // Inicializar a posição usando bottom
    this.setY(alturaJogo / 2)
    this.setAngulo(0)

    this.gravidade = () => {
        let y = this.getY()
        this.setY(y - 2.5)
        
        // Rotacionar para baixo gradualmente (máximo +45 graus)
        if (angulo < 45) {
            this.setAngulo(angulo + 1.5)
        }
    }
    
    this.voar = () => {
        let y = this.getY()
        this.setY(y + 55)
        
        // Rotacionar para cima ao voar (-20 graus)
        this.setAngulo(-20)
    }
}

// ===== FUNÇÕES DE COLISÃO =====

// Função responsável por verificar sobreposição entre dois elementos
function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

// Função responsável por verificar colisão do pássaro com as barreiras
function colidiu(passaro, esteira) {
    let colidiu = false
    esteira.pares.forEach(parDeBarreiras => {
        if(!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior) || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu
}

// ===== FUNÇÕES DE CONTROLE DO JOGO =====

// Função para limpar o jogo completamente
function limparJogo() {
    // Limpar o interval do loop
    if (gameLoop) {
        clearInterval(gameLoop)
        gameLoop = null
    }
    
    // Remover elementos do DOM
    const areaDoJogo = document.querySelector(".gameContainer")
    
    if (passaro && passaro.elemento && passaro.elemento.parentNode) {
        areaDoJogo.removeChild(passaro.elemento)
    }
    
    if (esteira && esteira.pares) {
        esteira.pares.forEach(par => {
            if (par.elemento && par.elemento.parentNode) {
                areaDoJogo.removeChild(par.elemento)
            }
        })
    }
    
    // Resetar referências
    esteira = null
    passaro = null
}

// Função para iniciar/reiniciar o jogo
function start() {
    // Limpar jogo anterior se existir
    limparJogo()
    
    const alturaJogo = 600
    const larguraJogo = 1000
    const areaDoJogo = document.querySelector(".gameContainer")
    
    let pontos = 0
    const scoreElement = document.getElementById("score")
    scoreElement.textContent = '0'
    
    // Função para notificar pontos
    const notificarPonto = () => {
        pontos++
        scoreElement.textContent = pontos
    }
    
    esteira = new Esteira(alturaJogo, larguraJogo, 200, 400, notificarPonto)
    passaro = new Passaro(alturaJogo)
    
    areaDoJogo.appendChild(passaro.elemento)
    esteira.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    // Loop principal do jogo
    gameLoop = setInterval(() => {
        esteira.animar()
        passaro.gravidade()
        if (colidiu(passaro, esteira)) {
            clearInterval(gameLoop)
            const restartScreen = document.getElementById('restart-screen')
            restartScreen.style.display = 'flex'
        }
    }, 20)
    
    if (!eventListenersAdicionados) {
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                event.preventDefault()
                if (passaro) passaro.voar()
            }
        })

        document.addEventListener('click', function(event) {
            // Evitar que cliques nos botões de start/restart acionem o voar
            if (!event.target.closest('#start-button') && 
                !event.target.closest('#restart-button')) {
                if (passaro) passaro.voar()
            }
        })
        
        eventListenersAdicionados = true
    }
}

// ===== INICIALIZAÇÃO E EVENT LISTENERS =====

const startScreen = document.getElementById('start-screen')
const startButton = document.getElementById('start-button')

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'
    start()
})

const restartButton = document.getElementById('restart-button')
restartButton.addEventListener('click', () => {
    const restartScreen = document.getElementById('restart-screen')
    restartScreen.style.display = 'none'
    start()
})