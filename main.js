(()=>{"use strict";var e=function(e){return e.closest(".card").remove()},t=function(e){return e.classList.toggle("card__like-button_is-active")};function n(e,t,n,r,o){var c=t.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),a=c.querySelector(".card__title"),s=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button");return i.src=e.link,i.alt=e.name,a.textContent=e.name,s.addEventListener("click",(function(){return n(s)})),u.addEventListener("click",(function(){return r(u)})),i.addEventListener("click",(function(){return o(i)})),c}var r=function(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))};function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function i(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));o.textContent="",n.removeAttribute("disabled",""),t.classList.remove(r.inputErrorClass),n.classList.remove(r.inactiveButtonClass),o.classList.remove(r.errorClass)}(e,t,n,r):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-error"));o.textContent=t.validationMessage,n.setAttribute("disabled",""),t.classList.add(r.inputErrorClass),n.classList.add(r.inactiveButtonClass),o.classList.add(r.errorClass)}(e,t,n,r)}function a(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.validity.valid||(n.value=""),i(e,n,r,t)}))}var s,u=document.querySelector("#card-template").content,l=document.querySelector(".places__list"),d=document.querySelector(".profile__title"),p=document.querySelector(".profile__description"),m=document.querySelectorAll(".popup"),v=document.querySelector(".profile__edit-button"),f=document.querySelector(".popup_type_edit"),_=document.forms["edit-profile"],y=_.elements.name,S=_.elements.description,k=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),L=document.forms["new-place"],b=L.elements["place-name"],E=L.elements.link,C=document.querySelector(".popup_type_image"),g=C.querySelector(".popup__image"),h=C.querySelector(".popup__caption"),x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function j(e){g.src=e.src,g.alt=e.alt,h.textContent=e.alt,o(C)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){l.append(n(r,u,e,t,j))})),m.forEach((function(e){!function(e){e.classList.add("popup_is-animated")}(e),function(e){e.addEventListener("click",(function(t){(t.target===e||t.target.classList.contains("popup__close"))&&c(e)}))}(e)})),v.addEventListener("click",(function(e){y.value=d.textContent,S.value=p.textContent,a(_,x),o(f)})),_.addEventListener("submit",(function(e){var t,n,r,o;e.preventDefault(),t=d,n=p,r=y.value,o=S.value,t.textContent=r,n.textContent=o,c(f)})),k.addEventListener("click",(function(e){a(L,x),o(q)})),L.addEventListener("submit",(function(r){r.preventDefault(),function(e,t,n,r,o,c,i,a){if(e&&t){var s={name:e,link:t};n.prepend(o(s,r,c,i,a))}}(b.value,E.value,l,u,n,e,t,j),L.reset(),c(q)})),s=x,document.querySelectorAll(s.formSelector).forEach((function(e){var t=e.querySelectorAll(s.inputSelector),n=e.querySelector(s.submitButtonSelector);t.forEach((function(t){!function(e,t,n,r){t.addEventListener("input",(function(o){i(e,t,n,r)}))}(e,t,n,s)}))}))})();