const myLibrary = [];

const display = document.querySelector("#display");
const author = document.getElementById("author");
const pageNum = document.getElementById("pages");
const bookTitle = document.getElementById("title");

const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const pageError = document.querySelector("#page-error");

const form = document.querySelector("form");

const readCheckbox = document.getElementById("read");
const libraryBook = document.querySelector(".library-card");

bookTitle.addEventListener("input", function (event) {
  if (bookTitle.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    formValidation(bookTitle);
  }
});

author.addEventListener("input", function (event) {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    formValidation(author);
  }
});

pageNum.addEventListener("input", function (event) {
  if (pageNum.validity.valid) {
    pageError.textContent = "";
    pageError.className = "error";
  } else {
    formValidation(pageNum);
  }
});

//Listen for submit button and append content to display
form.addEventListener("submit", (e) => {
  if (!bookTitle.validity.valid) {
    formValidation(bookTitle);
    e.preventDefault();
  } else if (!author.validity.valid) {
    formValidation(author);
    e.preventDefault();
  } else if (!pageNum.validity.valid) {
    formValidation(pageNum);
    e.preventDefault();
  } else {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numPages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    if (readCheckbox.checked == false) {
      read = "Not Read Yet";
    }
    const newBook = new Book(title, author, numPages, read);
    addBookToLibrary(newBook);
    form.reset();
  }
});

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  info() {
    let string = `${this.title},
        ${this.author},
        ${this.numPages} pages,
        ${this.read}`;

    return string;
  }

  toggleRead(indexPlace) {
    if (myLibrary[indexPlace].read == "Not Read Yet") {
      myLibrary[indexPlace].read = "read";
    }
    displayLibrary();
  }
}

//Adds book info to array and displays it to screen.
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  displayLibrary();
}

//Parses Array and creates card for display.
function displayLibrary() {
  display.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    //Create Card and Buttons
    let card = document.createElement("div");
    let removeBtn = document.createElement("button");
    let readBtn = document.createElement("button");
    card.classList.add("library-card");

    //Create Remove Button
    removeBtn.classList.add("remove-button");
    removeBtn.innerText = "Remove";
    removeBtn.value = i;

    //Create Read Button
    readBtn.classList.add("read-button");
    readBtn.innerText = "Read";
    readBtn.value = i;

    //Adds Book Content and
    card.innerHTML = myLibrary[i].info();
    card.setAttribute("array-place", i);
    display.appendChild(card);
    card.appendChild(removeBtn);
    card.appendChild(readBtn);

    //Listen for removal of Card from screen
    removeBtn.addEventListener("click", () => {
      let bookValue = card.getAttribute("array-place");
      if (removeBtn.value == bookValue) {
        removeCard(bookValue);
      }
    });

    readBtn.addEventListener("click", () => {
      let bookValue = card.getAttribute("array-place");
      if (readBtn.value == bookValue) {
        myLibrary[bookValue].toggleRead(bookValue);
      }
    });
  }
}

//Removes card from Display
function removeCard(indexPlace) {
  myLibrary.splice(indexPlace, 1);
  displayLibrary();
}

const formValidation = (item) => {
  const itemName = item.getAttribute("name");

  if (itemName === "title") {
    if (item.validity.valueMissing) {
      titleError.textContent = "You need to enter a title";
    } else if (item.validity.patternMismatch) {
      titleError.textContent = "Item entered needs to be a title";
    }
    titleError.className = "error active";
  } else if (itemName === "author") {
    console.log(itemName);
    if (item.validity.valueMissing) {
      authorError.textContent = "You need to enter an author";
    } else if (item.validity.patternMismatch) {
      authorError.textContent = "Item entered needs to be author's name";
    }
    author.className = "error active";
  } else if (itemName === "pages") {
    console.log(itemName);
    if (item.validity.valueMissing) {
      pageError.textContent = "You need to enter a page number";
    } else if (item.validity.typeMismatch) {
      pageError.textContent = "You need to enter a number!";
    }
    pageError.className = "error active";
  }
};
