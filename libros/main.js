let url = "https://api.myjson.com/bins/1h3vb3";
let books;
fetch(url)
    .then(data => data.json())
    .then(json => {
        books = json.books;
        printBooks(books);
    })
    .catch(error => alert(error));

function printBooks(books) {
    let template = '';
    books.forEach(book => {
        template += `<div class="flip-container">
                            <div class="flipper">
                                <div class="front">
                                    <!-- front content -->
                                    <img class="portada" src="${book.portada}"/>
                                </div>
                                <div class="back">
                                    <!-- back content -->    
                                    <p>${book.titulo}</p> 
                                    <p class="desc">${book.descripcion}</p>
                                    <a data-fancybox="gallery" href="${book.detalle}"><button>More Info</button></a>
                                </div>
                            </div>
                    </div>`;
    });
    document.getElementsByClassName("container")[0].innerHTML = template;
}
document.getElementById("input").addEventListener("keyup",()=>{
    let text=document.getElementById("input").value;
    searchBook(text);
});
function searchBook(string){
    let newBooks = books.filter(book=>{
        return book.titulo.includes(string)||book.descripcion.includes(string);
    });
    printBooks(newBooks);
}