// create a button with specific classes and click handler
const createBtn = (classes, clickHandler) => {
    const btn = document.createElement("button");
    btn.classList.add(classes.shift());

    const icon = document.createElement("i");
    icon.classList.add(...classes);
    icon.style.color = '#ffffff';

    btn.appendChild(icon);
    btn.addEventListener("click", clickHandler);
    return btn;
}

// remove a todo card
const removeCard = (event) => {
    const btn = event.target;
    const cardDiv = btn.closest(".item-card");
    cardDiv.parentNode.remove();
    itemCount--;
    localStorage.setItem("itemCount", itemCount);

}

// edit a todo card
const editCard = (event) => {
    const btn = event.target;
    const cardDiv = btn.closest(".item-card");

    const p = cardDiv.querySelector("p");
    const cardValue = p.textContent;

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = cardValue;

    const cancel = createBtn(["cancel", "fa-solid", "fa-x"], () => {
        cancelEdit(cardValue, cardDiv);
    });
    const confirm = createBtn(["confirm", "fa-solid", "fa-check"], () => {
        confirmEdit(cardDiv);
    });

    cardDiv.querySelector(".edit").replaceWith(cancel);
    cardDiv.querySelector(".delete").replaceWith(confirm);

    cardDiv.querySelector("p").replaceWith(inputElement);

    inputElement.focus();
}

// cancel editing a todo card
const cancelEdit = (cardValue, cardDiv) => {
    const p = document.createElement('p');
    p.textContent = cardValue;

    const editBtn = createBtn(["edit", "fa-solid", "fa-pen-to-square"], editCard);
    const deleteBtn = createBtn(["delete", "fa-solid", "fa-trash"], removeCard);

    cardDiv.querySelector("input").replaceWith(p);
    cardDiv.querySelector(".cancel").replaceWith(editBtn);
    cardDiv.querySelector(".confirm").replaceWith(deleteBtn);
}

// confirm editing a todo card
const confirmEdit = (cardDiv) => {
    const input = cardDiv.querySelector("input");
    const p = document.createElement('p');
    p.textContent = input.value;

    const editBtn = createBtn(["edit", "fa-solid", "fa-pen-to-square"], editCard);
    const deleteBtn = createBtn(["delete", "fa-solid", "fa-trash"], removeCard);

    cardDiv.querySelector("input").replaceWith(p);
    cardDiv.querySelector(".cancel").replaceWith(editBtn);
    cardDiv.querySelector(".confirm").replaceWith(deleteBtn);
}

// add new todo card
const addTodo = () => {
    const ul = document.querySelector("ul");
    const todo = document.querySelector(".todo");
    let inputValue = todo.value;

    const li = document.createElement("li");
    const newCard = document.createElement("div");
    newCard.classList.add("item-card", `item${itemCount}`);

    const p = document.createElement("p");
    p.textContent = inputValue;

    const editBtn = createBtn(["edit", "fa-solid", "fa-pen-to-square"], editCard);
    const deleteBtn = createBtn(["delete", "fa-solid", "fa-trash"], removeCard);

    newCard.appendChild(p);
    newCard.appendChild(editBtn);
    newCard.appendChild(deleteBtn);

    li.appendChild(newCard);
    ul.appendChild(li); 

    console.log(ul.innerHTML);
    todo.value = "";
    itemCount++;

    localStorage.setItem("itemCount", itemCount);
    localStorage.setItem("cards", ul.innerHTML);
}

window.onload = () => {
    itemCount = localStorage.getItem("itemCount") || 1;
    const ul = document.querySelector("ul");
    ul.innerHTML = localStorage.getItem("cards");

    ul.querySelectorAll('.edit').forEach(editButton => {
        editButton.addEventListener('click', editCard);
    });

    ul.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', removeCard);
    });
};


let itemCount;
document.querySelector(".submit").addEventListener("click", addTodo);


