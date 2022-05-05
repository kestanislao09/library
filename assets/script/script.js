// Book class
const Book = class {
    constructor(title, author, pages, type, read, nsfw) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this. type = type;
        this.read = read;
        this.nsfw = nsfw;
    }

    deleteBook(thisBook) {
        Library.delete(thisBook);
        Display.reloadLibrary(Library.libraryArr);
    }

    toggleRead() {
        let current = this.read;

        this.read = !current;
        Display.reloadLibrary(Library.libraryArr);
    }
}

const Library = class {
    constructor() {}

    static libraryArr = [];

    static delete(index) {
        if (index === 0) {
            this.libraryArr.shift();
        } else if (index !== 0) {
            this.libraryArr.splice(index, 1);
        }
    }

    static addBook(info) {
        let newBook = new Book(...info);
        this.libraryArr.push(newBook);
    }
}

const Display = class {
    constructor() {}

    static clearLibrary() {
        const container = document.querySelector('.container');
        let book = container.firstElementChild;

        while(book) {
            container.removeChild(book);
            book = container.firstElementChild;
        }
    }

    static loadLibrary(arr) {
        const container = document.querySelector('.container');

        arr.forEach((book, i) => {
            const card = document.createElement('div');
 
            card.classList.toggle('book-card');
            card.appendChild(this.createHead(book.title));
            card.appendChild(this.createDesc(book.type, book.author, book.pages));
            card.appendChild(this.createBadges(book.read, book.nsfw));
            card.appendChild(this.createReadBtn(book.read, i));
            card.appendChild(this.createDelBtn(i));

            container.appendChild(card);
        })
    }

    static reloadLibrary(arr) {
        this.clearLibrary();
        this.loadLibrary(arr);
    }

    static createHead(title) {
        const cardHead = document.createElement('div')

        cardHead.classList.toggle('card-header');
        cardHead.textContent = title;

        return cardHead;
    }

    static createDesc(type, author, pages) {
        const cardDesc = document.createElement('div')

        cardDesc.classList.toggle('card-description');
        cardDesc.textContent = `A ${type} by ${author}. ${pages} Pages.`;

        return cardDesc;
    }

    static createBadges(read, nsfw) {
        const badges = document.createElement('div')
        const readBadge = document.createElement('div')
        const nsfwBadge = document.createElement('div')

        readBadge.classList.toggle('badge');
        readBadge.classList.toggle('readBadge');
        if (read === true) {
            readBadge.classList.toggle('blue');
            readBadge.textContent = 'Read';
        } else if (read === false) {
            readBadge.classList.toggle('orange');
            readBadge.textContent = 'Unread';
        };

        nsfwBadge.classList.toggle('badge');
        nsfwBadge.classList.toggle('nsfwBadge');
        if (nsfw === true) {
            nsfwBadge.classList.toggle('pink');
            nsfwBadge.textContent = 'NSFW';
        } else if (nsfw === false) {
            nsfwBadge.classList.toggle('green');
            nsfwBadge.textContent = 'SFW';
        };

        badges.appendChild(readBadge);
        badges.appendChild(nsfwBadge);

        return badges;
    }

    static createDelBtn(i) {
        const deleteBtn = document.createElement('button');
        
        deleteBtn.classList.toggle('delete-btn');
        deleteBtn.setAttribute('data-index', `${i}`);
        deleteBtn.textContent = 'Del'
        deleteBtn.addEventListener('click', e => {
            Library.libraryArr[e.target.getAttribute('data-index')].deleteBook(parseInt(e.target.getAttribute('data-index')));
        })

        return deleteBtn
    }

    static createReadBtn(i) {
        const readBtn = document.createElement('button');

        readBtn.classList.toggle('read-btn');
        readBtn.setAttribute('data-index', `${i}`);
        readBtn.textContent = 'R'
        readBtn.addEventListener('click', e => {
            Library.libraryArr[e.target.getAttribute('data-index')].toggleRead(parseInt(e.target.getAttribute('data-index')));
        })

        return readBtn
    }

    static closeModal() {
        const formTitle = document.querySelector('#title');
        const formAuthor = document.querySelector('#author');
        const formPages = document.querySelector('#pages');
        const formRead = document.querySelector('#read');
        const formNsfw = document.querySelector('#nsfw');
        const formType = document.querySelectorAll('input[name="type"]');

        modal.style.display = 'block';
        formTitle.value = '';
        formAuthor.value = '';
        formPages.value = '';
        formRead.checked = false;
        formNsfw.checked = false;
        formType.forEach(type => {type.checked = false});
    }

    static {
        // Modal stuff
        const modal = document.querySelector('.modal');
        const addBtn = document.querySelector('.add-btn');
        const closeBtn = document.querySelector('.close-btn');
        const submitBtn = document.querySelector('.submit-btn');

        addBtn.addEventListener('click', e => {
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', e => {
            this.closeModal();
        });

        window.addEventListener('click', e => {
            if (e.target == modal) {
                Display.closeModal();
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

            formType.forEach(type => {
                if (type.checked) {
                    litType = type.value;
                }
            })

            let newBookInfo = [formTitle.value, formAuthor.value, formPages.value, litType, formRead.checked, formNsfw.checked]

            Library.addBook(newBookInfo)
            this.reloadLibrary(Library.libraryArr)
            modal.style.display = 'none'
        });
    }
}


Library.addBook(['samplebook1', 'author', '69', 'book', true, false])
Library.addBook(['samplebook2', 'author', '69', 'book', false, true])
Library.addBook(['samplebook3', 'author', '69', 'book', false, false])

Display.reloadLibrary(Library.libraryArr);
