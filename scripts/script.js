import initialCards from "../scripts/initialCards.js";

let cardsArray = initialCards.map((item) => item);


let lastId = 0;

function getNewCardId(){
  return ++lastId;
}
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function checkClickCard(elem){
  elem.addEventListener('click',zoomCard);
}
function zoomCard(){
  let zoom_image=document.querySelector(".zoom-image");
  zoom_image.src=this.src;
  modal.style.display = "block";
}
function createEventLForDelete(elem){
  elem.addEventListener('click', removeParent);
}

//////////////////
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
function createCard(data)
{
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLink = cardElement.querySelector('.card__image');
  cardLink.src = data.link;
  cardLink.alt = data.name;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;
  cards.append(cardElement); 
  const buttonDelete = cardElement.querySelector('.card__remove');
  createEventLForDelete(buttonDelete);
  checkClickCard(cardLink);
}

cardsArray.forEach(card => {
  createCard(card);
});

function AddNewCard(data)
{
  cardsArray.push(data);
  createCard(data);
  console.log(cardsArray);
}


const nn = 'Девушка за роялем';
const ll = 'https://i.pinimg.com/564x/8f/62/20/8f6220fa0ed72cd90f438d21bcf09cbc.jpg';


AddNewCard({name:nn, link:ll});

console.log(cardsArray);

let buttonAddImage = document.querySelector('.popup__button');
buttonAddImage.addEventListener('click', ()=>{
  const name = document.querySelector('#popup__input_title').value;
  const link = document.querySelector('#popup__input_link').value;
  AddNewCard({name:name, link:link});
});


let buttonProfile = document.querySelector('.profile__button');
console.log(`Значение button = ${buttonProfile}`);
function showClick() {
  console.log(`Имя = ${profileName.value}\nО себе = ${profileAbout.value}`);
}
buttonProfile.addEventListener('click', showClick);
let profileImage = document.querySelector('.profile__image');
function ShowImage(){
  if(profileImage.classList.contains('profile__image_unvisiable')){
    profileImage.classList.remove('profile__image_unvisiable');
  }
  else {
    profileImage.classList.add('profile__image_unvisiable');
  }
}
function imageExists(image_url){
  var http = new XMLHttpRequest();
  http.open('HEAD', image_url, false);
  http.send();
  return http.status != 404;
}

const formElement = document.getElementById('form1');
var list = [];
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); 
  const name = formData.get('popupTitle'); 
  const link = formData.get('popupLink');
  if(imageExists(link) && link != "" && name != ""){
    createCard({name: name, link: link});
  } 
});

function deleteFromCards(id){
  cardsArray.forEach(function(card, index) {
    if(card.id === id){
      cardsArray.splice(index, 1);
    }
  });
}
function removeParent(){
  let revDiv = this.parentElement;
  revDiv.remove();
  deleteFromCards(this.parentElement.id);
}