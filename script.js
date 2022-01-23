const myLibrary = []

const display = document.querySelector('#display');
const newBook = document.querySelector('#new-button');
const form = document.querySelector('form');
const readCheckbox = document.getElementById("read");
const libraryBook = document.querySelector('.library-card')
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
    const newBook = new Book(title, author, numPages, read)
    addBookToLibrary(newBook)
    form.reset()  
});
class Book {
    constructor(title, author, numPages, read)  {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.read = read;
    }

    info() {
        let string = `${this.title},
        ${this.author},
        ${this.numPages} pages,
        ${this.read}`

        return string;
    }

    toggleRead(indexPlace) {
        if (myLibrary[indexPlace].read == "Not Read Yet") {
            myLibrary[indexPlace].read = "read";
        }
        displayLibrary();
    }
}
//Basic Book Constructor
//function book(title, author, numPages, read) {
//    this.title = title
//    this.author = author
//    this.numPages = numPages
//    this.read = read
//}

//Prototype Function that displays book content as a string.
//book.prototype.info = function() {
//
//    let string = `${this.title}, 
//    ${this.author}, 
//    ${this.numPages} pages,
//    ${this.read} `
//    
//    return string
//}

//book.prototype.toggleRead = function(indexPlace) {
//    if (myLibrary[indexPlace].read == "Not Read Yet") {
//        myLibrary[indexPlace].read = "Read"
//    }
//    displayLibrary()
//}



//Adds book info to array and displays it to screen.
function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    displayLibrary()
}

//Parses Array and creates card for display.
function displayLibrary() {
    display.innerHTML = ''
        for (let i = 0; i < myLibrary.length; i++) {

            //Create Card and Buttons
            let card = document.createElement("div")
            let removeBtn = document.createElement("button")
            let readBtn = document.createElement("button")
            card.classList.add("library-card")

            //Create Remove Button
            removeBtn.classList.add("remove-button")
            removeBtn.innerText = 'Remove'
            removeBtn.value = i

            //Create Read Button
            readBtn.classList.add("read-button")
            readBtn.innerText = "Read"
            readBtn.value = i

            //Adds Book Content and 
            card.innerHTML = myLibrary[i].info()
            card.setAttribute("array-place", i)
            display.appendChild(card)
            card.appendChild(removeBtn)
            card.appendChild(readBtn)
            
            //Listen for removal of Card from screen
            removeBtn.addEventListener('click',  ()=> {
                let bookValue = card.getAttribute('array-place')
                if (removeBtn.value == bookValue) {
                    removeCard(bookValue)
                }
            })

            readBtn.addEventListener('click', ()=> {
                let bookValue = card.getAttribute('array-place')
                if (readBtn.value == bookValue) {
                    myLibrary[bookValue].toggleRead(bookValue)
                }
            })
    }
}

//Removes card from Display
function removeCard(indexPlace) {
    myLibrary.splice(indexPlace, 1)
    displayLibrary()
}

