let myLibrary = []

function book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

book.prototype.info = function() {
    let string = `${this.title} by ${this.author}, ${this.numPages}, ${this.read}`
    return string
}

function addBookToLibrary() {
    let bookName = prompt("Please enter a book title:")
    let bookAuthor = prompt("Please enter an Author Name", "Author")
    let bookPages = prompt("Please enter how many pages there are:", "Pages")
    let isRead = prompt("Have you read this book yet?", "Read")
    let userInput = new book(bookName, bookAuthor, bookPages, isRead)
    myLibrary.push(userInput.info())
    
}

function displayLibrary() {

}

addBookToLibrary();
console.log(myLibrary);