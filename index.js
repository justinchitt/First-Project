const urlCharacters = "http://localhost:3000/characters"
const urlMaps = "http://localhost:3000/maps"
let form = document.querySelector('form')
let newName = document.getElementById('name')
let newImage = document.getElementById('image')
let newFace = document.getElementById('face')
let newDesc = document.getElementById('desc')

function init(e) {
    getCharacters(urlCharacters)
    getMaps()
    postCharacter()
    byeForm()
    e.target.parentNode.remove()
}

function getCharacters(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(characters => {
        characters.forEach((character) => renderCharacter(character, 'playerOneName', 'playerOneDesc', 'fighterone', "red", 'image-line'))
        characters.forEach((character) => renderCharacter(character, 'playerTwoName', 'playerTwoDesc', 'fightertwo', "blue", 'image-line-bottom'))
    })
}

function renderCharacter(character, playerName, playerDesc, playerImg, color, id) {
    let name = document.createElement('h2')
    let imgChar = document.createElement('img')
    let descHolder = document.createElement('div')
    name.textContent = character.name
    imgChar.src = character.face
    let charCard = document.createElement('div')
    includeEvent(charCard, name, descHolder, imgChar, character,  playerName, playerDesc, playerImg, color,)
    document.getElementById(id).append(charCard)
}

function includeEvent(charCard, name, descHolder, imgChar, character, playerName, playerDesc, playerImg, color) {
    charCard.addEventListener('mouseover', () => showDesc(charCard, descHolder, name))
    charCard.addEventListener('mouseout', () => hideDesc(descHolder, charCard, name))
    charCard.addEventListener('click',() => playerChoice(character, playerName, playerDesc, playerImg))
    charCard.addEventListener("click", () => changeBorder(charCard, color))
    charCard.className = 'charCard'
    
    charCard.append(imgChar, name)
}

function showDesc(charCard, descHolder, name) {
    charCard.style.backgroundColor = 'yellow'
    name.style.backgroundColor = 'red'
    charCard.append(descHolder)
}

function changeBorder(charCard, color) {
    charCard.style.border = "8px solid"
    charCard.style.borderColor = color
    
}

function playerChoice (character, name, desc, img){
    let fighterOneImg = document.getElementById(img);
    document.getElementById(name).textContent = character.name;
    document.getElementById(desc).textContent = character.desc;
    fighterOneImg.src = character.image
}

function hideDesc(descHolder, charCard, name) {
    descHolder.replaceChildren()
    charCard.style.backgroundColor = "#E9E7E7"
    name.style.backgroundColor = "#E9E7E7"
}

function postCharacter() {
    
    form.addEventListener("submit", (e)=> {
    e.preventDefault()

    let newObj = {
        name: newName.value,
        image: newImage.value,
        face: newFace.value,
        desc: newDesc.value
    }

    renderCharacter(newObj, newObj.name, newObj.desc, newObj.image, "red", "image-line")
    renderCharacter(newObj, newObj.name, newObj.desc, newObj.image, "blue", "image-line-bottom")
    postNewCharacter(newObj)
    })
    form.reset()
}

function byeForm() {
    form.addEventListener('submit', removeForm)
}

function removeForm() {
    form.remove()
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
    // bttn.style.color = 'red';
    bttn.id = 'startbutton';
    bttn.addEventListener('click', init)
    document.getElementById('bg').appendChild(bttn)
}

function getMaps() {
    fetch(urlMaps)
    .then(resp => resp.json())
    .then(maps =>{
        let button = document.createElement('button')
        button.textContent = "READY"
        button.id = 'readybutton'
        button.className ='starter'
    maps.forEach((map) => renderMaps(map, button))})
}

function renderMaps(map, button) {
    let img = document.createElement('img')
    img.src = map.image
    button.addEventListener('click', () => {
        button.textContent = "SET";
        button.id = 'setbutton' 
        handleMap(img, button, map)})
    document.getElementById('ready-fightbtn').append(button)
}

function handleMap(img,button, map) {
    img.addEventListener('click', (e) => handleSelect(e,button, map))
    document.getElementById('map').append(img)
}
function handleSelect(e, button, map) {
    let replace = document.getElementById("versus")
    replace.src = e.target.src
    let fightBttn = document.createElement('button')
    document.getElementById('vsContainer').id = 'newVsContainer'
    fightBttn.textContent = "FIGHT"
    fightBttn.id = 'fightButtonIcon'
    fightBttn.className = 'starter';
    let mapName = document.createElement('h2')
    mapName.textContent = map.name
    button.remove();
    document.getElementById('ready-fightbtn').append(fightBttn, mapName)
    fightBttn.addEventListener('click',startFight)
}

function startFight(){
    deleteStuff()
    let arena = document.getElementById('versus').src
    document.body.style.backgroundImage = `url(${arena})`;
    document.getElementById('newVsContainer').remove()
    let combat = document.createElement('button');
    combat.textContent = 'TUSSLE'
    document.getElementById('combatbutton').append(combat);
    combat.addEventListener('click', tussle)
}

function deleteStuff() {
    document.getElementById('image-line').replaceChildren()
    document.getElementById('image-line-bottom').replaceChildren()
    document.getElementById('map').replaceChildren()
    form.replaceChildren()
}

function tussle(){
    game()
    let newGame = document.createElement('button');
    newGame.textContent = 'START NEW GAME'; 
    newGame.addEventListener('click',startNewGame)
    document.getElementById('combatbutton').replaceChildren();
    document.getElementById('combatbutton').append(newGame);
    
};

function game() {
    let playerOne = document.getElementById('playerOneName').textContent
    let playerTwo = document.getElementById('playerTwoName').textContent
    let prob1 = Math.floor(Math.random() * 2) +1;
    let prob2 = Math.floor(Math.random() * 2) +1;
    if( prob1 === prob2){
        alert(`${playerOne} Won`);
    }else{
        alert(`${playerTwo} Won`);
    }
}

function startNewGame(){
    location.reload() 
}



start()