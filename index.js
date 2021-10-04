const url = "http://localhost:3000/characters"

function init() {
    getCharacters(url)
}

function getCharacters(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(characters => characters.forEach(renderCharacter))
}

function renderCharacter(character) {
    let name = document.createElement('h2')
    name.textContent = character.name
    let imgChar = document.createElement('img')
    imgChar.src = character.image
    let charCard = document.createElement('div')
    let descHolder = document.createElement('div')
    charCard.addEventListener('mouseover', () => showDesc(character, charCard, descHolder, name))
    charCard.addEventListener('mouseout', () => hideDesc(descHolder, charCard, name))
    charCard.append(imgChar, name)
    charCard.style.backgroundColor = "#E9E7E7"
    document.getElementById('image-line').append(charCard)
}

function showDesc(character, charCard, descHolder, name) {
    let desc = document.createElement('p')
    desc = character.desc
    let upBttn = document.createElement('button')
    upBttn.textContent = '↑'
    let downBttn = document.createElement('button')
    downBttn.textContent = '↓'
    charCard.style.backgroundColor = 'yellow'
    name.style.backgroundColor = 'red'
    descHolder.append(upBttn, desc, downBttn)
    charCard.append(descHolder)
}

function hideDesc(descHolder, charCard, name) {
    descHolder.replaceChildren()
    charCard.style.backgroundColor = "#E9E7E7"
    name.style.backgroundColor = "#E9E7E7"
}

init()