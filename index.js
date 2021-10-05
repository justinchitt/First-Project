const url = "http://localhost:3000/characters"

function init(e) {
    getCharacters(url)
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
    charCard.style.borderRadius = "50%";
    // let charCardBottom = document.createElement('div')
    charCard.addEventListener('mouseover', () => showDesc(character, charCard, descHolder, name))
    charCard.addEventListener('mouseout', () => hideDesc(descHolder, charCard, name))
    charCard.addEventListener('click',() => playerOneChoice(character))
    charCard.style.border = "4px solid"
    charCard.style.borderColor = "red"
    charCard.addEventListener("click", (e) => changeBorder(e, charCard))
    charCard.append(imgChar, name)
    charCard.style.backgroundColor = "#E9E7E7"
    document.getElementById('image-line').append(charCard)
    // document.getElementById('image-line-bottom').append(charCardBottom)
}

function changeBorder(e, charCard) {
    console.log(e.target)
    charCard.style.borderColor = "green"
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
    let upBttn = document.createElement('button')
    upBttn.textContent = '↑'
    let downBttn = document.createElement('button')
    downBttn.textContent = '↓'
    charCard.style.backgroundColor = 'yellow'
    name.style.backgroundColor = 'red'
    descHolder.append(upBttn, downBttn)
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
let newDesc = document.getElementById('desc')

function postCharacter() {
    
    form.addEventListener("submit", (e)=> {
    e.preventDefault()

    let newObj = {
        name: newName.value,
        image: newImage.value,
        face: "something",
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
    fetch(url, {
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
    bttn.addEventListener('click', init)
    document.getElementById('bg').appendChild(bttn)
    

}

start()