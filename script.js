let myLibrary = []

const display = document.querySelector('#display');
const newBook = document.querySelector('#new-button');
const form = document.querySelector('form');
let readCheckbox = document.getElementById("read");
let libraryBook = document.querySelector('.library-card')
newBook.addEventListener('click', addBookToLibrary);


//Listen for submit button and append content to display
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

//Basic Book Constructor
function book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

//Prototype Function that displays book content as a string.
book.prototype.info = function() {
    let string = `${this.title} 
    by ${this.author}, 
    ${this.numPages} pages, 
    ${this.read}`
    
    return string
}

//Adds book info to array and displays it to screen.
function addBookToLibrary(newBook) {
    let userInput = newBook
    myLibrary.push(userInput.info())
    displayLibrary()
}

//Parses Array and creates card for display.
function displayLibrary() {
    display.innerHTML = ''
        for (let i = 0; i < myLibrary.length; i++) {
            let card = document.createElement("div")
            let removeBtn = document.createElement("button")
            card.classList.add("library-card")
            removeBtn.classList.add("remove-button")
            removeBtn.innerText = 'Remove'
            removeBtn.value = i
            card.innerHTML = myLibrary[i]
            card.setAttribute("array-place", i)
            display.appendChild(card)
            card.appendChild(removeBtn)
    
            removeBtn.addEventListener('click',  (e)=> {
                let bookValue = card.getAttribute('array-place')
                console.log(bookValue)
                if (removeBtn.value == bookValue) {
                    removeCard(bookValue)
                }
            })
    }
}

function removeCard(indexPlace) {
    myLibrary.splice(indexPlace, 1)
    console.log(myLibrary)
    displayLibrary()
}
