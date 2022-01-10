let myLibrary = []

function book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

book.prototype.info = function() {
    let string = `${title} by ${author}, ${numPages}, ${read}`
    return string
}

function addBookToLibrary() {
    let bookName = prompt("Please enter a book title:")
    let bookAuthor = prompt("Please enter an Author Name", "Author")
    let bookPages = prompt("Please enter how many pages there are:", "Pages")
    let isRead = prompt("Have you read this book yet?", "Read")
    let userInput = new book(bookName, bookAuthor, bookPages, isRead)
    myLibrary.push(userInput)
    
}

addBookToLibrary();
console.log(myLibrary);