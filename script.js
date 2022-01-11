let myLibrary = []

const display = document.querySelector('#display');
const newBook = document.querySelector('#new-button');
const form = document.querySelector('form');
let readCheckbox = document.getElementById("read")

newBook.addEventListener('click', addBookToLibrary);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let numPages = document.getElementById("pages").value
    let read = document.getElementById("read").value
    if (readCheckbox.checked == false) {
        read = "Not Read Yet"
    }
    const newBook = new book(title, author, numPages, read)
    addBookToLibrary(newBook)
    form.reset()  
});

function book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

book.prototype.info = function() {
    let string = `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read}`
    return string
}

function addBookToLibrary(newBook) {
    let userInput = newBook
    myLibrary.push(userInput.info())
    displayLibrary()
    
}

function displayLibrary() {
    display.innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("li")
        card.innerHTML = myLibrary[i]
        display.appendChild(card)
    }

}