// query selectors
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');


// event listener
saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  captureIdea;
}
);

// global variables

var ideaBoxArray = [];

// functions

function captureIdea(title, body) {
  var ideaBox = {
    title: title,
    body: body,
    id: Date.now()
  }
  return ideaBox;
}

function createIdeaObject() {
ideaBox.title = titleInput.value
ideaBox.body = bodyInput.value
console.log('hello')
ideaBoxArray.push(ideaBox);
}