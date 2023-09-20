
const addBookBtn = document.getElementById("newBookBtn");
const formDiv = document.getElementById("formDiv");
addBookBtn.addEventListener("click", () => {
    formDiv.style.display = "block";
});
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");
cancelBtn.addEventListener("click", () => {
    formDiv.style.display = "none";
    bookForm.reset();
});

const cards = document.getElementById("cards");

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function handleSubmit(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;
    
    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("isRead").checked = false;


    formDiv.style.display = "none";

    displayBooks();

    console.log(myLibrary);
}


bookForm.addEventListener("submit", handleSubmit);

// Function to display all books as cards
function displayBooks() {
    const bookList = document.getElementById("bookList");
  
    bookList.innerHTML = "";
  
    myLibrary.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      const shareButton = document.createElement("button");
      shareButton.classList.add("like-button");
      shareButton.innerHTML = '<i class="fas fa-share"></i>';

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML='<i class="fas fa-trash-alt"></i>';
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        
        card.remove();
        
        myLibrary.splice(index, 1);
      });

      const likeButton = document.createElement("button");
      likeButton.classList.add("like-button");
      likeButton.innerHTML = '<i class="far fa-heart"></i>';
      let isLiked = false; // Initialize as unliked

      likeButton.addEventListener("click", () => {
        // Toggle the like state
        isLiked = !isLiked;

        // Change the heart icon color based on the like state
        if (isLiked) {
          likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
          likeButton.innerHTML = '<i class="far fa-heart"></i>';
        }
      });
  
      const titleElement = document.createElement("h3");
      titleElement.textContent = `Title: ${book.title}`;
  
      const authorElement = document.createElement("p");
      authorElement.textContent = `Author: ${book.author}`;
  
      const pagesElement = document.createElement("p");
      pagesElement.textContent = `Pages: ${book.pages}`;
  
      const isReadCheckbox = document.createElement("input");
      isReadCheckbox.type = "checkbox";
      isReadCheckbox.checked = book.isRead;
      isReadCheckbox.addEventListener("change", () => {
        // Update the isRead property of the corresponding book object
        library[index].isRead = isReadCheckbox.checked;
      });
  
      const isReadLabel = document.createElement("label");
      isReadLabel.textContent = "Is read?  ";
      isReadLabel.appendChild(isReadCheckbox);
      
      const divElement = document.createElement("div");
      divElement.classList.add("buttons");
      divElement.appendChild(shareButton);
      divElement.appendChild(likeButton);
      divElement.appendChild(deleteButton);


      card.appendChild(titleElement);
      card.appendChild(authorElement);
      card.appendChild(pagesElement);
      card.appendChild(isReadLabel);
      card.appendChild(divElement);

      bookList.appendChild(card);
    });
}
  
  
