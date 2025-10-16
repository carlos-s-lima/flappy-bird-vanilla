# Flappy Bird Clone

Um clone do clássico jogo Flappy Bird desenvolvido com HTML5, CSS3 e JavaScript vanilla.

![Flappy Bird](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Sobre o Projeto

Este é um clone fiel do famoso jogo Flappy Bird, desenvolvido do zero utilizando apenas tecnologias web puras (Vanilla JavaScript). O projeto foi criado com foco em boas práticas de código, programação orientada a objetos e experiência do usuário.

## Funcionalidades

- Jogabilidade clássica do Flappy Bird
- Sistema de pontuação em tempo real
- Salvamento de recorde pessoal (localStorage)
- Sistema de restart elegante sem recarregar a página
- Controles por teclado (Espaço) e mouse/touch
- Interface com design pixel art
- Layout responsivo
- Detecção de colisão precisa
- Física realista com gravidade e rotação do pássaro

## Como Executar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Opção 1: Abrir Diretamente

Simplesmente abra o arquivo `index.html` no seu navegador preferido.

### Opção 2: GitHub Pages

[Acesse o projeto aqui](https://carlos-s-lima.github.io/flappy-bird-vanilla/src/)

## Como Jogar

1. Clique no botão **Start** para começar
2. Use a **barra de espaço** ou **clique do mouse** para fazer o pássaro voar
3. Desvie das barreiras verdes
4. Tente superar seu recorde pessoal

## Estrutura do Projeto

```
flappy-bird-clone/
│
├── index.html          # Estrutura HTML do jogo
├── styles.css          # Estilos e animações
├── app.js              # Lógica do jogo
├── img/                # Imagens do jogo
│   ├── birdNew.png
│   ├── Start.png
│   └── Restart.png
├── fonts/              # Fontes customizadas
│   └── Minecraftia-Regular.ttf
└── README.md           # Este arquivo
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização, animações e transições
- **JavaScript (ES6+)**: Lógica do jogo, POO com funções construtoras
- **LocalStorage API**: Persistência do high score
- **Canvas**: Não utilizado - puro DOM manipulation

## Principais Conceitos Aplicados

### JavaScript
- Programação Orientada a Objetos (Funções Construtoras)
- Manipulação do DOM
- Event Listeners
- Intervals e Timings
- LocalStorage para persistência de dados
- Detecção de colisão com bounding boxes

### CSS
- Flexbox e Grid Layout
- Gradientes lineares
- Transições e transforms
- Custom fonts com @font-face
- User-select prevention

### Boas Práticas
- Código modular e organizado
- Comentários explicativos
- Nomenclatura semântica
- Gerenciamento adequado de memória
- Sistema de limpeza de recursos

## Funcionalidades Técnicas

### Sistema de Colisão
```javascript
function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    // Verifica sobreposição horizontal e vertical
}
```

### Física do Pássaro
- Gravidade constante puxando para baixo
- Impulso ao voar
- Rotação dinâmica baseada na direção do movimento

### Gerenciamento de Estado
- Flag `jogoAtivo` para controlar interações
- Limpeza adequada de elementos do DOM
- Sistema de restart sem reload da página

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Seu Nome
- GitHub: [@carlos-s-lima](https://github.com/carlos-s-lima)
- LinkedIn: [Carlos Lima](https://linkedin.com/in/carlos-s-lima)

## Agradecimentos

- Inspirado no jogo original Flappy Bird de Dong Nguyen
- Fonte Minecraftia para o estilo pixel art
- Comunidade de desenvolvedores web

---

Se você gostou deste projeto, considere dar uma estrela no repositório!

**Feito com JavaScript**