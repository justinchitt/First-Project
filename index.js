const url = "http://localhost:3000/characters"

function init(){
    getCharacters(url)
}

function getCharacters(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(characters => characters.forEach(renderCharacter))
}

function renderCharacter(character) {
    // let name = document.createElement('h2')
    // name.textContent = character.name
    let imgChar = document.createElement('img')
    imgChar.src = character.image
    imgChar.addEventListener('mouseover', () => showDesc(character))
    document.getElementById('image-line').append(imgChar)
}

function showDesc(character) {

}

init()