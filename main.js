// query selectors
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');


// event listener
saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
}
);

// global variables
var currentIdea;
var ideaBoxArray = [];

// functions

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
return currentIdea
}