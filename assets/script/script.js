// Array to hold all of the books
let libraryArr = []

const NewBook = (title, author, pages, typeOfLit, read, nsfw) => {
    const getTitle = () => title;
    const getAuthor = () => author;
    const getType = () => typeOfLit;
    const isRead = () => read;
    const isNSFW = () => nsfw;

    const toggleRead = () => {
        if (read === true) {
            read = false;
        } else if ( read === false) {
            read = true;
        };
    };

    const deleteBook = () => {
        let thisBook = libraryArr.indexOf(this);

        if (thisBook === 0) {
            libraryArr.shift();
        } else if (thisBook !== 0) {
            libraryArr.splice(thisBook - 1, 1)
        };
    };

    return {getTitle, getAuthor, getType, isRead, isNSFW, toggleRead, deleteBook}
};