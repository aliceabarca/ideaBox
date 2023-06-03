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
bottomBox.addEventListener('click', handlesFavoriting)
// bottomBox.addEventListener('click', removeIdea)




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
  /*
    Indent all this HTML so it's easier to read
    Also, you don't need two img tags for the favorite star use JS to replace the img src
  */
  cardContainer.innerHTML += `
  <div class='idea-cards'>
  <div class='card-header-main'>
  <header class='card-header'>
  <button class='header-buttons'>
  <img class="favorite-star off" src="./assets/star.svg" alt="favorite off" data-type='favorite-button'>
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

function handlesFavoriting(event, ideaId) {
  var starElement = event.target.parentElement;
  var isFavorite = starElement.classList.contains('off');

  // if (isFavorite) {
  //   // Remove from favorites
  //   starElement.src = './assets/star.svg';
  //   starElement.classList.remove('off');
  //   deleteIdea(ideaId);
  // } else if{
    if (isFavorite){
    // Add to favorites
    starElement.isFavorite = true;
    starElement.src = './assets/star-active.svg';
    starElement.classList.add('on');
    saveIdea(ideaId);
    removeIdea(ideaId);
  }
}

/*
  When I click on either 'star' or 'delete' img tag deleteIdea and saveIdea both log the event.
  How can you leverage the data-type so you only log it's respective function?
    - If I click on the 'star' img only 'saveIdea' should log
    - If I click on the 'delete' img only 'deleteIdea' should log
*/

function deleteIdea(event) {
  console.log(event.target)
  for (i = 0; i < ideaBoxArray.length; i++) {
    if (ideaBoxArray[i].id === parseInt(event.target.id)) {
      ideaBoxArray.splice(i, 1)
    } else {
      handlesFavoriting()
    }
  }
  displayIdeaCard()
}

// need a way to know which one we are adding
// bc rn if 3 are on the page it adds all 3 (bc it adds the entire array)
// function saveIdea(event) {
//    currentIdea = cardContainer
//   console.log(event.target)
//   if ('favorite-button' === event.target.dataset.type) {
//     savedIdeasArray.push(ideaBoxArray)
//   }
// }

// function saveIdea(event, ideaId) {
//   if ('favorite-button' === event.target.dataset.type) {
//     savedIdeasArray.push(ideaId);
//   }
//   console.log(ideaId)
// }


// function saveIdeatwo() {
//   for (var i =0; i < ideaBoxArray.length; i++) {
//     if (ideaBoxArray[i].id) =
//   }
// }

function removeIdea(ideaId) {
  const index = ideaBoxArray.findIndex((idea) => idea.id === ideaId);
  if (index !== -1) {
    ideaBoxArray.splice(index, 1);
  }
}

function saveIdea(ideaId) {
  const idea = ideaBoxArray.find((idea) => idea.id === ideaId);
  if (idea) {
    savedIdeasArray.push(idea);
  }
  // handlesFavoriting();
}


/*
  Main Suggestion:
  For favoriting a card/star, have a function that 'handlesFavoriting'
    - When favoriting
      - if your class name is 'favorite-star' and 'off'
        - update the image src to the active star
        - set the class name to 'on'
        - invoke a function that will 'saveIdea' to your 'savedIdeasArray'
          - will need to pass the idea id to this function
      - if your class name is 'favorite-star' and 'on'
        - update the image src to the regular star
        - set the class name to 'off'
        - invoke a function that will 'removeIdea' from 'savedIdeasArray'
          - will need to pass the idea id to this function

    - HINT: Look at how you're setting the id on the delete img tag to pass your 'save/removeIdea' function

    These are suggestions - you peeps know your code best ^.^
*/
