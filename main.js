// query selectors:

var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('#input-1');
var bodyInput = document.querySelector('#input-2');
var bottomBox = document.querySelector('.bottom-box');
var topBox = document.querySelector('.top-box');

// event listener:

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  createIdeaObject(titleInput.value, bodyInput.value)
}
);

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
//<img class="+" src="assets/comment.svg" alt="plus sign">////
//<div class="comment">Comment</div>////
</div>
`
titleInput.value = ''
bodyInput.value = ''
return currentIdea
}
//create assests folder//////