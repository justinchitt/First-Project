window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}; 

const urlCharacters = "http://localhost:3000/characters"
const urlMaps = "http://localhost:3000/maps"

function init(e) {
    getCharacters(urlCharacters)
    getMaps()
    postCharacter()
    e.target.parentNode.remove()
}

function getCharacters(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(characters => {
        characters.forEach(renderCharacterTop)
        characters.forEach(renderCharacterBottom)
    })
}

function renderCharacterTop(character) {
    let name = document.createElement('h2')
    let imgChar = document.createElement('img')
    let descHolder = document.createElement('div')
    name.textContent = character.name
    imgChar.src = character.face
    let charCard = document.createElement('div')
    charCard.addEventListener('mouseover', () => showDesc(character, charCard, descHolder, name))
    charCard.addEventListener('mouseout', () => hideDesc(descHolder, charCard, name))
    charCard.addEventListener('click',() => playerOneChoice(character))
    // charCard.style.borderColor = "red"
    charCard.addEventListener("click", (e) => changeBorderOne(e, charCard))
    charCard.append(imgChar, name)
    charCard.style.backgroundColor = "#E9E7E7"
    document.getElementById('image-line').append(charCard)
    // document.getElementById('image-line-bottom').append(charCardBottom)
}

function changeBorderOne(e, charCard) {
    console.log(e.target)
    charCard.style.border = "8px solid"
    charCard.style.borderColor = "red"
    // e.target.parentNode.style.borderColor = "yellow"
    
}

function changeBorderTwo(e, charCard) {
    console.log(e.target)
    charCard.style.border = "8px solid"
    charCard.style.borderColor = "blue"
    // e.target.parentNode.style.borderColor = "yellow"
    
}

function playerOneChoice (character){
    let fighterOneImg = document.getElementById('fighterone');
    document.getElementById('playerOneName').textContent = character.name;
    document.getElementById('playerOneDesc').textContent = character.desc;
    fighterOneImg.src = character.image
}

function renderCharacterBottom(character) {
    let name = document.createElement('h2')
    let imgChar = document.createElement('img')
    let descHolder = document.createElement('div')
    name.textContent = character.name
    imgChar.src = character.face
    let charCard = document.createElement('div')
    // let charCardBottom = document.createElement('div')
    charCard.addEventListener('mouseover', () => showDesc(character, charCard, descHolder, name))
    charCard.addEventListener('mouseout', () => hideDesc(descHolder, charCard, name))
    charCard.addEventListener('click',() => playerTwoChoice(character))
    charCard.addEventListener("click", (e) => changeBorderTwo(e, charCard))
    charCard.append(imgChar, name)
    charCard.style.backgroundColor = "#E9E7E7"
    // document.getElementById('image-line').append(charCard)
    document.getElementById('image-line-bottom').append(charCard)
}

function playerTwoChoice (character){
    let fighterTwoImg = document.getElementById('fightertwo');

    document.getElementById('playerTwoName').textContent = character.name;

    document.getElementById('playerTwoDesc').textContent = character.desc
    // console.log(fighterTwoImg)
    // console.log(playerDesc)
    // console.log(fighterTwoImg)
    fighterTwoImg.src = character.image

}

function showDesc(character, charCard, descHolder, name) {
    // let desc = document.createElement('p')
    // desc = character.desc
    // let upBttn = document.createElement('button')
    // upBttn.textContent = '↑'
    // let downBttn = document.createElement('button')
    // downBttn.textContent = '↓'
    charCard.style.backgroundColor = 'yellow'
    name.style.backgroundColor = 'red'
    // descHolder.append(upBttn, downBttn)
    charCard.append(descHolder)
}

function hideDesc(descHolder, charCard, name) {
    descHolder.replaceChildren()
    charCard.style.backgroundColor = "#E9E7E7"
    name.style.backgroundColor = "#E9E7E7"
}
let form = document.querySelector('form')
let newName = document.getElementById('name')
let newImage = document.getElementById('image')
let newFace = document.getElementById('face')
let newDesc = document.getElementById('desc')

function postCharacter() {
    
    form.addEventListener("submit", (e)=> {
    e.preventDefault()

    let newObj = {
        name: newName.value,
        image: newImage.value,
        face: newFace.value,
        likes: "0",
        desc: newDesc.value
    }

    renderCharacterTop(newObj)
    renderCharacterBottom(newObj)
    postNewCharacter(newObj)
    })
    form.reset()
}


function postNewCharacter(object) {
    console.log(object)
    fetch(urlCharacters, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(object)
        })
}


function start() {
    let bttn = document.createElement('button')
    bttn.textContent = 'START'
    bttn.style.backgroundColor = 'transparent';
    bttn.style.border = 'none';
    bttn.style.fontSize = '500%';
    bttn.style.fontFamily =  'Lucida Handwriting';
    bttn.style.color = 'red';
    bttn.addEventListener('click', init)
    document.getElementById('bg').appendChild(bttn)
    

}

function getMaps() {
    fetch(urlMaps)
    .then(resp => resp.json())
    .then(maps =>{
        let button = document.createElement('button')
        button.textContent = "READY"
     maps.forEach((map) => renderMaps(map, button))})
}

function renderMaps(map, button) {
    let img = document.createElement('img')
    img.src = map.image
    button.addEventListener('click', () => handleMap(img,button))
    document.getElementById('ready-fightbtn').append(button)
}

function handleMap(img,button) {
    img.addEventListener('click', (e) => handleSelect(e,button))
    document.getElementById('map').append(img)
}
function handleSelect(e,button) {
    let replace = document.getElementById("versus")
    replace.src = e.target.src
    let fightBttn = document.createElement('button')
    fightBttn.textContent = "FIGHT"
    button.remove();
    document.getElementById('ready-fightbtn').append(fightBttn)
    fightBttn.addEventListener('click',startFight)
}

function startFight(){
    document.getElementById('image-line').replaceChildren()
    document.getElementById('image-line-bottom').replaceChildren()
    document.getElementById('map').replaceChildren()
    form.replaceChildren()
    let arena = document.getElementById('versus').src
    console.log(arena);
    document.body.style.backgroundImage = `url(${arena})`;
    document.getElementById('vsContainer').remove()
    let combat = document.createElement('button');
    combat.textContent = 'TUSSLE'
    document.getElementById('combatbutton').append(combat);
    combat.addEventListener('click', (combat) => tussle(combat))
    // console.log

    
}

function tussle(combat){
    let playerOne = document.getElementById('playerOneName').textContent
    let playerTwo = document.getElementById('playerTwoName').textContent

    let prob1 = Math.floor(Math.random() * 2) +1;
    console.log(prob1)
    
    let prob2 = Math.floor(Math.random() * 2) +1;
    console.log(prob2)
    
    if( prob1 === prob2){
        alert(`${playerOne} Won`);
      }else{
        alert(`${playerTwo} Won`);
    }

    let newGame = document.createElement('button');
    newGame.textContent = 'START NEW GAME'; 
    newGame.addEventListener('click',startNewGame)
    document.getElementById('combatbutton').replaceChildren();
    document.getElementById('combatbutton').append(newGame);
    
};

function startNewGame(){
    location.reload() 
   
}

// tussle()


start()