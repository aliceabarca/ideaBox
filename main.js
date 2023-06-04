//---------- Query Selectors -----------//

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var cardContainer = document.querySelector('.card-container');
var topBox = document.querySelector('.top-box');
var bottomBox = document.querySelector('.bottom-box')
var inputForm = document.querySelector('.input-form');
var showFavsButton = document.querySelector('.show-starred')
var showAllButton = document.querySelector('.show-all')

//----------- Global Variables ---------//

var currentIdea
var ideaBoxArray = []

//----------- Event Listeners ---------//

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
  renderBottomBox('allCards')
  eraseInputs()
}
);

titleInput.addEventListener('input', disableSavedButton)
bodyInput.addEventListener('input', disableSavedButton);
inputForm.addEventListener('submit', disableSavedButton)
bottomBox.addEventListener('click', bottomBoxClick)
showFavsButton.addEventListener('click', function() {
  renderBottomBox('favCards')
  toggleClassList(showAllButton, showFavsButton)
})
showAllButton.addEventListener('click', function() {
  renderBottomBox('allCards')
  toggleClassList(showFavsButton, showAllButton)
})

//----------- Functions ---------//

function toggleClassList(bts, bth) {
  bts.classList.remove('hidden')
  bth.classList.add('hidden')
}

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

function updateCardContainer(array) {
  cardContainer.innerHTML = ''
  for (var i = 0; i < array.length; i++) {
    if (array[i].isFavorite === false) {
      cardContainer.innerHTML += `
        <div class='idea-cards' id=${array[i].id}>
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
            <h2>${array[i].title}</h2>
            </div>
            <div class="card-body-div">
            <p>${array[i].body}</p>
            </div>
          </div>
        </div>
      `
    } else {
      cardContainer.innerHTML += `
        <div class='idea-cards' id=${array[i].id}>
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
              <strong>${array[i].title}</strong>
            </div>
            <div class="card-body-div">
              <strong>${array[i].body}</strong>
            </div>
          </div>
        </div>
      `
    }  
  }
}

function renderBottomBox(whichPage) {
  if (whichPage === 'allCards') {
    updateCardContainer(ideaBoxArray)
  } else if (whichPage === 'favCards') {
    var showArray = []
    for (var i = 0; i < ideaBoxArray.length; i++) {
      if (ideaBoxArray[i].isFavorite === true) {
        showArray.push(ideaBoxArray[i])
      }
    } 
    updateCardContainer(showArray)
  }
}

function eraseInputs() {
  titleInput.value = ''
  bodyInput.value = ''
  disableSavedButton()
}

saveButton.disabled = true;
function disableSavedButton() {
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
  renderBottomBox('allCards')
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