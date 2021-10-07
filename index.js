const urlCharacters = "http://localhost:3000/characters"
const urlMaps = "http://localhost:3000/maps"
let form = document.querySelector('form')
let newName = document.getElementById('name')
let newImage = document.getElementById('image')
let newFace = document.getElementById('face')
let newDesc = document.getElementById('desc')

start()

function start() {
    let bttn = document.createElement('button')
    bttn.textContent = 'START'
    document.getElementById('everything').style.display = "none"
    showForm()
    bttn.id = 'startbutton';
    bttn.addEventListener('click', init)
    document.getElementById('bg').appendChild(bttn)
}

function init(e) {
    getCharacters(urlCharacters)
    document.getElementById('everything').style.display = "block"
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
        characters.forEach((character) => renderCharacter(character, 'playerTwoName', 'playerTwoDesc', 'fightertwo', "#001AFF", 'image-line-bottom'))
    })
}

function renderCharacter(character, playerName, playerDesc, playerImg, color, id) {
    let name = document.createElement('h2')
    let imgChar = document.createElement('img')
    let descHolder = document.createElement('div')
    name.textContent = character.name
    name.style.backgroundColor = "white"
    imgChar.src = character.face
    let charCard = document.createElement('div')
    includeEvent(charCard, name, descHolder, imgChar, character,  playerName, playerDesc, playerImg, color)
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
    clickFunctionBacktoNormal()
    charCard.style.border = "12px solid"
    charCard.style.borderColor = color
}

function playerChoice (character, playerName, desc, img){
    let fighterOneImg = document.getElementById(img);
    document.getElementById(playerName).textContent = character.name;
    document.getElementById(desc).textContent = character.desc;
    fighterOneImg.src = character.image
}

function hideDesc(descHolder, charCard, name) {
    descHolder.replaceChildren()
    charCard.style.backgroundColor = "#E9E7E7"
    name.style.backgroundColor = "#E9E7E7"
}

function showForm() {
    form.style.display = "none"
    document.getElementById('appear').addEventListener('click', changeDisplay)
}

function changeDisplay() {
    form.style.display = "block"
}

function postCharacter() {
    form.addEventListener("submit", (e)=> handleSubmit(e))
    form.reset()
}

function handleSubmit(e) {
    e.preventDefault()
    let newObj = {
        name: newName.value,
        image: newImage.value,
        face: newFace.value,
        desc: newDesc.value
    }
    renderCharacter(newObj,'playerOneName', 'playerOneDesc', 'fighterone', "red", "image-line")
    renderCharacter(newObj, 'playerTwoName', 'playerTwoDesc', 'fightertwo', "blue", "image-line-bottom")
    postNewCharacter(newObj)
}

function byeForm() {
    form.addEventListener('submit', removeForm)
}

function removeForm() {
    form.remove()
    document.getElementById('appear').remove()
}

function postNewCharacter(object) {
    fetch(urlCharacters, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(object)
        })
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
    img.alt = map.name
    button.addEventListener('click', () => {
        button.textContent = "SET";
        button.id = 'setbutton' 
        handleMap(img, button)
    })
    document.getElementById('ready-fightbtn').append(button)
}

function handleMap(img, button) {
    img.addEventListener('click', (e) => handleSelect(e,button, img))
    document.getElementById('map').append(img)
}
function handleSelect(e, button, img) {
    let replace = document.getElementById("versus")
    replace.src = e.target.src
    let fightBttn = document.createElement('button')
    document.getElementById('mapheader').textContent = img.alt;
    document.getElementById('vsContainer').id = 'newVsContainer'
    fightBttn.textContent = "FIGHT"
    fightBttn.id = 'fightButtonIcon'
    button.remove();
    document.getElementById('ready-fightbtn').append(fightBttn)
    fightBttn.addEventListener('click',startFight)
}

function startFight(){
    deleteStuff()
    let arena = document.getElementById('versus').src
    document.body.style.backgroundImage = `url(${arena})`;
    document.getElementById('newVsContainer').remove()
    let combat = document.createElement('button');
    combat.textContent = 'TUSSLE'
    combat.id = 'combatbttn'
    document.getElementById('newcombat').append(combat);
    combat.addEventListener('click',()=> tussle(combat))
    barsPopUp();
}

function barsPopUp(){
    document.getElementsByClassName('bars')[0].style.display = 'block';
    document.getElementsByClassName('bars')[1].style.display = 'block';
    document.getElementsByClassName('bars')[2].style.display = 'block';
    document.getElementsByClassName('bars')[3].style.display = 'block';
}

function clickFunctionBacktoNormal(){
    let cards = document.getElementsByClassName('charCard')
    for (const card of cards) {
        card.style.border = 'none';
    }
}

function deleteStuff() {
    document.getElementById('image-line').replaceChildren()
    document.getElementById('image-line-bottom').replaceChildren()
    document.getElementById('map').replaceChildren()
    document.getElementById('appear').remove()
    form.replaceChildren()
    document.getElementById('subheader').remove()
}

function tussle(combat){
    let newGame = document.createElement('button');
    combat.style.display = "none"
    newGame.textContent = 'START NEW GAME'; 
    newGame.id='newgame'
    newGame.addEventListener('click',startNewGame)
    document.getElementById('combatbutton').replaceChildren();
    document.getElementById('newcombat').append(newGame);
    game()
};

function game() {
    let playerOne = document.getElementById('playerOneName').textContent
    let playerTwo = document.getElementById('playerTwoName').textContent
    let prob1 = Math.floor(Math.random() * 2) +1;
    let prob2 = Math.floor(Math.random() * 2) +1;
    if( prob1 === prob2){
        handleWin('healthbartwo', 'HP2', 'fightertwo', playerOne);
    }else{
        handleWin('healthbarone', 'HP1', 'fighterone', playerTwo);
    }
}

function handleWin(health, text, location, player) {
    document.getElementById(health).style.background = "red";
    document.getElementById(text).textContent = "HP: 0";
    document.getElementById(location).src = 'https://i.imgur.com/17Ntd93.png';
    alert(`${player} Won`);
}

function startNewGame(){
    location.reload() 
}
