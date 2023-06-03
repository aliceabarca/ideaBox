// query selectors:

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var cardContainer = document.querySelector('.card-container');
var topBox = document.querySelector('.top-box');
var bottomBox = document.querySelector('.bottom-box')
var inputForm = document.querySelector('.input-form');


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
bottomBox.addEventListener('click', deleteIdea)
bottomBox.addEventListener('click', saveIdea)




// global variables:
var currentIdea
var ideaBoxArray = []
var savedIdeasArray = []

// functions:

function captureIdea(title, body) {
  return {
    title: title,
    body: body,
    id: Date.now(),
    isFavorite: "hidden"
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
  <div class='idea-cards'>
  <div class='card-header-main'>
  <header class='card-header'>
  <button class='header-buttons'>
  <img class="favorite-on hidden" src="assets/star-active.svg" alt="favorite on" data-type='favorite-button'>
  <img class="favorite-off" src="./assets/star.svg" alt="favorite off" data-type='favorite-button'>
  </button>
  <button class='header-buttonss'>
  <img class="delete-button" id=${ideaBoxArray[i].id} src="./assets/delete.svg" alt="favorite on" data-type='del-button'>
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
  console.log(event.target)
  for (i = 0; i < ideaBoxArray.length; i++) {
    if (ideaBoxArray[i].id === parseInt(event.target.id)) {
      ideaBoxArray.splice(i, 1)
    }
  }
  displayIdeaCard()  
}

// need a way to know which one we are adding
// bc rn if 3 are on the page it adds all 3 (bc it adds the entire array)
function saveIdea(event) {
   currentIdea = cardContainer
  console.log(event.target)
  if ('favorite-button' === event.target.dataset.type) {  
    savedIdeasArray.push(ideaBoxArray)
  } 
}



// function saveIdeatwo() {
//   for (var i =0; i < ideaBoxArray.length; i++) {
//     if (ideaBoxArray[i].id) = 
//   }
// }
