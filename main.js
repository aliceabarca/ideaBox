// query selectors:

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var bottomBox = document.querySelector('.bottom-box');
var topBox = document.querySelector('.top-box');
var inputForm = document.querySelector('.input-form');

// event listener:

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
}
);

bodyInput.addEventListener('input', emptyInputs);
titleInput.addEventListener('input', emptyInputs)
inputForm.addEventListener('submit', emptyInputs)

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
bottomBox.innerHTML += `
<div class='idea-cards'>
<p class='card-header'>
<button class='favoriteCardButton'></button> <br>
<button class="deleteIdeaButton"></button> <br>
</p>
<p class="card-title" >
  <strong>${titleInput.value}</strong>
</p>
<p class="card-body">
  <strong>${bodyInput.value}</strong>
</p>
//<div class ="card-footer">/////
//<img class="" src="" alt="">////
//<div class="comment">Comment</div>////
</div>
`
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



//create assests folder//////