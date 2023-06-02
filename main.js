// query selectors:

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var cardContainer = document.querySelector('.card-container');
var topBox = document.querySelector('.top-box');
var bottomBox = document.querySelector('.bottom-box')
var inputForm = document.querySelector('.input-form');
var deleteButton = document.querySelector('.delete-button')

// event listener:

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
}
);

titleInput.addEventListener('input', emptyInputs)
bodyInput.addEventListener('input', emptyInputs);
inputForm.addEventListener('submit', emptyInputs)

bottomBox.addEventListener('click', deleteIdea)

// global variables:
var currentIdea;
var ideaBoxArray = [];

// functions:

function captureIdea(title, body) {
  return {
    title: title,
    body: body,
    id: Date.now()
  }
}

function createIdeaObject(title, body) {
currentIdea = captureIdea(title, body)
ideaBoxArray.push(currentIdea)
cardContainer.innerHTML = ''
for (var i = 0; i < ideaBoxArray.length; i++) {
  cardContainer.innerHTML += `
  <div class='idea-cards'>
  <div class='card-header-main'>
  <header class='card-header'>
  <button type='favorite'>
  <img class="favorite-on" src="assets/star-active.svg" alt="favorite on">
  <img class="favorite-off hidden" src="./assets/star.svg" alt="favorite off">
  </button>
  <button type='delete'>
  <img class="delete-button" id=${ideaBoxArray[i].id} src="./assets/delete.svg" alt="favorite on">
  </button>
  </header>
  </div>
  <div class='card-body'>
  <div class="card-title">
  <strong>${ideaBoxArray[i].title}</strong>
  </div>
  <div class="card-body">
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
  console.log(event.target)
  for (i = 0; i < ideaBoxArray.length; i++) {
    if (ideaBoxArray[i].id == event.target.parentNode.id) {}
  }
}




//create assests folder//////