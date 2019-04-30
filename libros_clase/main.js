class Bookstore {
    constructor() {
        //here we decalre everything
        this.url = "https://api.myjson.com/bins/1h3vb3";
        this.books = [];
        this.searchValue = "";
        this.getData();
        this.inputSearch();
    }
    getData() {
        fetch(this.url)
            .then(data => data.json())
            .then((json)=> {
                this.books = json.books;
                this.printBooks(this.books);
            });
    }
    printBooks(books) {
        let template = ``;
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
    searchBook(string) {
        let newBooks = this.books.filter(book => {
            return book.titulo.includes(string) || book.descripcion.includes(string);
        });
        this.printBooks(newBooks);
    }
    inputSearch(){
        document.getElementById("input").addEventListener("keyup",()=>{
            let text = document.getElementById("input").value;
            this.searchBook(text);
        });
    }
}
//We create the instance of the class
let bs = new Bookstore;

//FilteredBooks: return this.books.filter(book => book.titulo.includes(this.searchValue));