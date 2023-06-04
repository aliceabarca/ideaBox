// query selectors:

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var cardContainer = document.querySelector('.card-container');
var topBox = document.querySelector('.top-box');
var bottomBox = document.querySelector('.bottom-box')
var inputForm = document.querySelector('.input-form');


//testing
var showFavs = document.querySelector('#show-starred-button')
var showAll = document.querySelector('#show-saved')

// event listener:

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
  displayIdeaCard()
  emptyInputs()
}
);

titleInput.addEventListener('input', emptyInputs)
bodyInput.addEventListener('input', emptyInputs);
inputForm.addEventListener('submit', emptyInputs)
bottomBox.addEventListener('click', bottomBoxClick)
showFavs.addEventListener('click', showFavoritedIdeas)
showAll.addEventListener('click', showAllIdeas)



// global variables:
var currentIdea
var ideaBoxArray = []

// functions:

function captureIdea(title, body) {
  return {
    title: title,
    body: body,
    id: Date.now(),
    isFavorite: false
  }
}

function createIdeaObject(title, body) {
currentIdea = captureIdea(title, body)
ideaBoxArray.push(currentIdea)
}

function displayIdeaCard() {
cardContainer.innerHTML = ''
for (var i = 0; i < ideaBoxArray.length; i++) {
  cardContainer.innerHTML += `
  <div class='idea-cards' id=${ideaBoxArray[i].id}>
  <div class='card-header-main'>
  <header class='card-header'>
  <button class='header-buttons'>
  <img class="favorite-star" src="./assets/star.svg" alt="favorite off" data-type='favorite-button'>
  </button>
  <button class='header-buttonss'>
  <img class="delete-button" src="./assets/delete.svg" alt="favorite on" data-type='del-button'>
  </button>
  </header>
  </div>
  <div class='card-body'>
  <div class="card-title">
  <strong>${ideaBoxArray[i].title}</strong>
  </div>
  <div class="card-body-div">
  <strong>${ideaBoxArray[i].body}</strong>
  </div>
  </div>
  </div>
  `
}
  titleInput.value = ''
  bodyInput.value = ''
  emptyInputs()
  return currentIdea
}

saveButton.disabled = true;
function emptyInputs() {
    if (titleInput.value !== '' && bodyInput.value !== '') {
      saveButton.disabled = false;
      saveButton.classList.remove('disabled');
    } else {
      saveButton.disabled = true;
      saveButton.classList.add('disabled');
    }
}


function deleteIdea(event) {
  currentIdea = event.target.parentElement.parentElement.parentElement.parentElement
  for (i = 0; i < ideaBoxArray.length; i++) {
    if (ideaBoxArray[i].id === parseInt(currentIdea.id)) {
      ideaBoxArray.splice(i, 1)
    }
  }
  displayIdeaCard()
}

function saveIdea(event) {
  var card = event.target
  currentIdea = event.target.parentElement.parentElement.parentElement.parentElement
  if ('favorite-button' === event.target.dataset.type) {
    for (var i = 0; i < ideaBoxArray.length; i++) {
      if (ideaBoxArray[i].id === parseInt(currentIdea.id)) {
        if (ideaBoxArray[i].isFavorite === false) {
          ideaBoxArray[i].isFavorite = true
          card.src = "./assets/star-active.svg"
        } else if (ideaBoxArray[i].isFavorite === true) {
          ideaBoxArray[i].isFavorite = false
          card.src = "./assets/star.svg"
        }
      } 
    }
  }
}

function bottomBoxClick(event) {
  if ('favorite-button' === event.target.dataset.type) {
    saveIdea(event)
  } else if ('del-button' === event.target.dataset.type) {
    deleteIdea(event)
  }

}

// on click
  // loop through our ideasboxarray
    // isfavorite = true
      //if so, run our display ideaCardsfunction

function displayClickedArray() {

}

function showFavoritedIdeas() {
  showArray = []
  cardContainer.innerHTML = ''
  for (var i = 0; i < ideaBoxArray.length; i++) {
    if (ideaBoxArray[i].isFavorite === true) {
      showArray.push(ideaBoxArray[i])
    }
  }
  for (var i = 0; i < showArray.length; i++) {
  cardContainer.innerHTML += `
  <div class='idea-cards' id=${showArray[i].id}>
  <div class='card-header-main'>
  <header class='card-header'>
  <button class='header-buttons'>
  <img class="favorite-star" src="./assets/star-active.svg" alt="favorite off" data-type='favorite-button'>
  </button>
  <button class='header-buttonss'>
  <img class="delete-button" src="./assets/delete.svg" alt="favorite on" data-type='del-button'>
  </button>
  </header>
  </div>
  <div class='card-body'>
  <div class="card-title">
  <strong>${showArray[i].title}</strong>
  </div>
  <div class="card-body-div">
  <strong>${showArray[i].body}</strong>
  </div>
  </div>
  </div>
  `
}
}

function showAllIdeas() {
  cardContainer.innerHTML = ''
for (var i = 0; i < ideaBoxArray.length; i++) {
  cardContainer.innerHTML += `
  <div class='idea-cards' id=${ideaBoxArray[i].id}>
  <div class='card-header-main'>
  <header class='card-header'>
  <button class='header-buttons'>
  <img class="favorite-star" src="./assets/star.svg" alt="favorite off" data-type='favorite-button'>
  </button>
  <button class='header-buttonss'>
  <img class="delete-button" src="./assets/delete.svg" alt="favorite on" data-type='del-button'>
  </button>
  </header>
  </div>
  <div class='card-body'>
  <div class="card-title">
  <strong>${ideaBoxArray[i].title}</strong>
  </div>
  <div class="card-body-div">
  <strong>${ideaBoxArray[i].body}</strong>
  </div>
  </div>
  </div>
  `
}
}