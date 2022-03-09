// Array to hold all of the books
let libraryArr = []

const Book = (title, author, pages, type, read, nsfw) => {

    const createHeader = () => {
        const cardHead = document.createElement('div');
        cardHead.classList.toggle('card-header');
        cardHead.textContent = this.title;
        return cardHead;
    };

    const createDescription = () => {
        const cardDesc = document.createElement('div');
        cardDesc.classList.toggle('card-description');
        cardDesc.textContent = `A ${this.type} by ${this.author}. ${this.pages} Pages.`;
    };

    const createReadBadge = () => {
        const readBadge = document.createElement('div');
        readBadge.classList.toggle('badge');
        if (this.read === true) {
            readBadge.classList.toggle('blue');
            readBadge.textContent = 'Read';
        } else if ( this.read === false) {
            readBadge.classList.toggle('orange');
            readBadge.textContent = 'Unread';
        };
    };

    const createNsfwBadge = () => {
        const nsfwBadge = document.createElement('div');
        nsfwBadge.classList.toggle('badge');
        if (this.nsfw === true) {
            nsfwBadge.classList.toggle('pink');
            nsfwBadge.textContent = 'NSFW';
        } else if ( this.nsfw === false) {
            nsfwBadge.classList.toggle('green');
            nsfwBadge.textContent = 'SFW';
        };
    };

    const toggleRead = () => {
        if (this.read === true) {
            this.read = false;
        } else if ( this.read === false) {
            this.read = true;
        };
    };

    
    return {title, author, pages, type, read, nsfw, createHeader, createDescription, createReadBadge, createNsfwBadge, toggleRead}
};


function addBook(title, author, pages, type, read, nsfw) {
    let newBook = Book(title, author, pages, type, read, nsfw);
    libraryArr.push(newBook);
}

function deleteBook(thisBook) {
    if (thisBook === 0) {
        libraryArr.shift();
    } else if (thisBook !== 0) {
        libraryArr.splice(thisBook - 1, 1);
    };

    clearLibrary();
    displayLibrary();
};

addBook('samplebook1', 'author', '69', 'book', true, false)
addBook('samplebook2', 'author', '69', 'book', false, true)
addBook('samplebook3', 'author', '69', 'book', false, false)

function clearLibrary() {
    const container = document.querySelector('.container');
    let book = container.firstElementChild;

    while(book) {
        container.removeChild(book);
        book = container.firstElementChild;
    };
};

function displayLibrary() {
    libraryArr.forEach(book => {
        const container = document.querySelector('.container');
        const card = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const cardHead = document.createElement('div')
        const cardDesc = document.createElement('div');
        const readBadge = document.createElement('div');
        const nsfwBadge = document.createElement('div');

        // Creates the card header
        cardHead.classList.toggle('card-header');
        cardHead.textContent = book.title;

        // Creates the card description
        cardDesc.classList.toggle('card-description');
        cardDesc.textContent = `A ${book.type} by ${book.author}. ${book.pages} Pages.`;

        // Creates the two badges
        readBadge.classList.toggle('badge');
        if (book.read === true) {
            readBadge.classList.toggle('blue');
            readBadge.textContent = 'Read';
        } else if ( book.read === false) {
            readBadge.classList.toggle('orange');
            readBadge.textContent = 'Unread';
        };

        if (book.nsfw === true) {
            nsfwBadge.classList.toggle('pink');
            nsfwBadge.textContent = 'NSFW';
        } else if ( book.nsfw === false) {
            nsfwBadge.classList.toggle('green');
            nsfwBadge.textContent = 'SFW';
        };

        // Creates the delete button
        deleteBtn.classList.toggle('delete-btn');
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', e => {
            deleteBook(libraryArr.indexOf(book));
        })
        
        card.classList.toggle('book-card');
        card.setAttribute('id', `${libraryArr.indexOf(book)}`);
        card.appendChild(cardHead);
        card.appendChild(cardDesc);
        card.appendChild(readBadge);
        card.appendChild(nsfwBadge);
        card.appendChild(deleteBtn);
        
        container.appendChild(card);
    });
};

displayLibrary();