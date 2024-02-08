const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pageCount = document.querySelector('#page-count');
const display = document.querySelector('.library');
const bookStatus = document.querySelector('#status');
const addBookBtn = document.querySelector('#addbook');

const library = [];

class Book {
    constructor(title, author, pages = "-", status = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
    read() {
        if (this.status === false) {
            this.status = true;
        } else {
            this.status = false;
        }
    }
}

bookStatus.addEventListener('click', () => {
    bookStatus.classList.toggle('pressed');
});

function getBookStatus() {
    if (bookStatus.className === 'pressed') {
        return true;
    }
    return false;
}

function isRequiredFilled() {
    return title.value.length != 0 && author.value.length != 0 && pageCount.value.length != 0;
}

function resetFields() {
    title.value = '';
    author.value = '';
    pageCount.value = '';
    if (bookStatus.className === 'pressed') {
        bookStatus.removeAttribute('class', 'pressed');
    }
}

addBookBtn.addEventListener('click', () => {
    if (!isRequiredFilled()) {
        return alert('Please fill required fields!');
    }
    const newBook = new Book(title.value, author.value, pageCount.value, getBookStatus());
    library.push(newBook);
    resetFields();
    displayBooks(library);
});

function resetDisplay() {
    display.replaceChildren();
}

function displayBooks(bookArray) {
    resetDisplay();
    bookArray.forEach(book => {
        const card = document.createElement('div');
        card.setAttribute('class', 'text');

        const cardTitle = document.createElement('p');
        cardTitle.setAttribute('class', 'heading');
        cardTitle.textContent = book.title;

        const cardAuthor = document.createElement('p');
        cardAuthor.setAttribute('class', 'author');
        cardAuthor.textContent = `by ${book.author}`;

        const cardPages = document.createElement('p');
        cardPages.setAttribute('class', 'pages');
        cardPages.textContent = `${book.pages} pages`;

        const cardStatus = document.createElement('p');
        cardStatus.setAttribute('class', 'bookstatus');
        cardStatus.textContent = `Finished: ${book.status}`;

        const controls = document.createElement('div');
        controls.setAttribute('class', 'control');

        const changeStatus = document.createElement('button');
        changeStatus.textContent = 'Read/Unread this book';
        changeStatus.setAttribute('class', 'statuschange');
        changeStatus.addEventListener('click', () => {
            book.read();
            displayBooks(library);
        });

        const deleteBook = document.createElement('button')
        deleteBook.textContent = 'Remove this book';
        deleteBook.setAttribute('class', 'deletion');
        deleteBook.addEventListener('click', () => {
            library.splice(library.indexOf(book), 1);
            displayBooks(library);
        });

        controls.append(changeStatus, deleteBook)
        card.append(cardTitle, cardAuthor, cardPages, cardStatus, controls);
        display.appendChild(card);
    });
}