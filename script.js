console.log("JS is connected");
let tbrBooks = [];
const csvUpload = document.getElementById("csvUpload");
const shuffleButton = document.getElementById("shuffleButton");


if (csvUpload) {
    csvUpload.addEventListener("change", function (event) {
        console.log("CSV upload detected!");

        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,

            complete: function (results) {
                tbrBooks = results.data
                    .filter(book =>
                        book["Exclusive Shelf"]?.trim() === "to-read"
                    )
                    .map(book => ({
                        title: book["Title"]?.trim(),
                        author: book["Author"]?.trim()
                    }))
                    .filter(book => book.title);

                console.log(tbrBooks);

                shuffleButton.disabled = tbrBooks.length === 0;

                console.log(
                    "Shuffle button enabled:",
                    !shuffleButton.disabled
                );
            }
        });
    });
}

if (shuffleButton) {
    shuffleButton.addEventListener("click", function () {

        const randomIndex = Math.floor(
            Math.random() * tbrBooks.length
        );

        const chosenBook = tbrBooks[randomIndex];

        localStorage.setItem(
    "chosenBook",
    JSON.stringify(chosenBook)
        );

        window.location.href = "results.html";

    });
}


const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");

if (bookTitle && bookAuthor) {

    const savedBook = localStorage.getItem("chosenBook");
    const chosenBook = JSON.parse(savedBook);

    bookTitle.textContent = chosenBook.title;
    bookAuthor.textContent = chosenBook.author;

}