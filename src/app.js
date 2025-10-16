// Função construtora de um elemento qualquer
function novoElemento(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

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
            y = 0;
        }
        this.elemento.style.bottom = `${y}px`
    }

    this.setY(alturaJogo / 2)

    this.gravidade = () => {
        let y = this.getY()
        this.setY(y - 4)
    }
    
    this.voar = () => {
        let y = this.getY()
        this.setY(y + 70)
    }
}

// Função start
function start() {
    const alturaJogo = 600
    const larguraJogo = 1000
    const areaDoJogo = document.querySelector(".gameContainer")
    
    let pontos = 0
    const scoreElement = document.getElementById("score")
    
    // Função para notificar pontos
    const notificarPonto = () => {
        pontos++
        scoreElement.textContent = pontos
    }
    
    const esteira = new Esteira(alturaJogo, larguraJogo, 200, 400, notificarPonto)
    const passaro = new Passaro(alturaJogo)
    
    areaDoJogo.appendChild(passaro.elemento)
    esteira.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    setInterval(() => {
        esteira.animar()
        passaro.gravidade()
    }, 20)
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault()
            passaro.voar()
        }
    })

    document.addEventListener('click', function() {
        passaro.voar()
    })
}

start()