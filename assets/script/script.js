// Array to hold all of the books
let libraryArr = []

// Factory function for books.
const Book = (title, author, pages, type, read, nsfw) => {
    // Removes an entry from the library array, then refreshes the displayed cards.
    const deleteBook = (thisBook) => {
        if (thisBook == 0) {
            libraryArr.shift();
        } else if (thisBook != 0) {
            libraryArr.splice(thisBook, 1);
        };

        
        clearLibrary();
        displayLibrary();
    };

    const toggleRead = (thisBook) => {
        if (libraryArr[thisBook].read === true) {
            libraryArr[thisBook].read = false;
        } else if (libraryArr[thisBook].read === false) {
            libraryArr[thisBook].read = true;
        };
    
        clearLibrary();
        displayLibrary();
    };
    
    return {title, author, pages, type, read, nsfw, deleteBook, toggleRead}
};

function addBook(title, author, pages, type, read, nsfw) {
    let newBook = Book(title, author, pages, type, read, nsfw);
    libraryArr.push(newBook);
}


// Modal stuff
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector('.submit-btn');

addBtn.addEventListener('click', e => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', e => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target == modal) {
        modal.style.display = 'none'
    }
});

submitBtn.addEventListener('click', e => {
    const formTitle = document.querySelector('#title');
    const formAuthor = document.querySelector('#author');
    const formPages = document.querySelector('#pages');
    const formRead = document.querySelector('#read');
    const formNsfw = document.querySelector('#nsfw');
    const formType = document.querySelectorAll('input[name="type"]');

    let litType;
    for(i = 0; i < formType.length; i++) {
        if (formType[i].checked) {
            litType = formType[i].value
        }
    }

    addBook(formTitle.value, formAuthor.value, formPages.value, litType, formRead.checked, formNsfw.checked)
    clearLibrary();
    displayLibrary();
    modal.style.display = 'none'
})



// Loops through the container and removes all children elements.
function clearLibrary() {
    const container = document.querySelector('.container');
    let book = container.firstElementChild;
    
    while(book) {
        container.removeChild(book);
        book = container.firstElementChild;
    };
};

// Loops through each entry in the library to make cards and add them to the display
function displayLibrary() {
    libraryArr.forEach(book => {
        const container = document.querySelector('.container');
        const card = document.createElement('div');
        const cardHead = document.createElement('div')
        const cardDesc = document.createElement('div');
        const badges = document.createElement('div');
        const readBadge = document.createElement('div');
        const nsfwBadge = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const readBtn = document.createElement('button');
        
        // Creates the card header
        cardHead.classList.toggle('card-header');
        cardHead.textContent = book.title;
        
        // Creates the card description
        cardDesc.classList.toggle('card-description');
        cardDesc.textContent = `A ${book.type} by ${book.author}. ${book.pages} Pages.`;
        
        // Creates the two badges
        badges.classList.toggle('badges')
        readBadge.classList.toggle('badge');
        readBadge.classList.toggle('readBadge');
        if (book.read === true) {
            readBadge.classList.toggle('blue');
            readBadge.textContent = 'Read';
        } else if ( book.read === false) {
            readBadge.classList.toggle('orange');
            readBadge.textContent = 'Unread';
        };
        
        nsfwBadge.classList.toggle('badge');
        nsfwBadge.classList.toggle('nsfwBadge');
        if (book.nsfw === true) {
            nsfwBadge.classList.toggle('pink');
            nsfwBadge.textContent = 'NSFW';
        } else if ( book.nsfw === false) {
            nsfwBadge.classList.toggle('green');
            nsfwBadge.textContent = 'SFW';
        };
        
        // Creates the delete button
        deleteBtn.classList.toggle('delete-btn');
        deleteBtn.setAttribute('data-index', `${libraryArr.indexOf(book)}`);
        deleteBtn.textContent = 'Del'
        deleteBtn.addEventListener('click', e => {
            libraryArr[e.target.getAttribute('data-index')].deleteBook(parseInt(e.target.getAttribute('data-index')));
        })
        
        // Creates the read toggle button
        readBtn.classList.toggle('read-btn');
        readBtn.setAttribute('data-index', `${libraryArr.indexOf(book)}`);
        readBtn.textContent = 'R'
        readBtn.addEventListener('click', e => {
            libraryArr[e.target.getAttribute('data-index')].toggleRead(parseInt(e.target.getAttribute('data-index')));
        })
        
        // Appends all of the parts of the card, then adds the card to the container.
        card.classList.toggle('book-card');
        card.appendChild(cardHead);
        card.appendChild(cardDesc);
        card.appendChild(badges)
        badges.appendChild(readBadge);
        badges.appendChild(nsfwBadge);
        card.appendChild(readBtn)
        card.appendChild(deleteBtn);
        
        container.appendChild(card);
    });
};

addBook('samplebook1', 'author', '69', 'book', true, false)
addBook('samplebook2', 'author', '69', 'book', false, true)
addBook('samplebook3', 'author', '69', 'book', false, false)
displayLibrary();