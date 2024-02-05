let apiUrl = "https://pixabay.com/api/"
let apiKey = "42130475-722c6d95dfe4cd0d32e86b59d"
let searchBar = document.querySelector("#search");
let selectedColor = document.querySelector("#colors");
let form = document.querySelector("#search-form");
let containerDiv = document.querySelector(".container");
let previousButton = document.querySelector("#previous-button");
let nextButton = document.querySelector("#next-button");
let currentPage = 1;
let picturesPerPage = 10;
let remainingPictures;
let originalSearch = ""; //Initerar en tom variabel som kommer spara det initiella sökvärdet. Motverkar bugg vid sid-byte. 
let originalColorSearch = "";
let showButtons = document.querySelector(".buttons");

form.addEventListener("submit", async event => {
    event.preventDefault();
    originalSearch = searchBar.value;
    originalColorSearch = selectedColor.value;
    currentPage = 1;
    await FetchPictures();
    showButtons.style.display = "flex";
})

nextButton.addEventListener("click", () => {
    currentPage++;
    FetchPictures();
});

previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        FetchPictures();
    }
});

async function FetchPictures(){
    let url = `${apiUrl}?key=${apiKey}&q=${originalSearch}&colors=${originalColorSearch}&page=${currentPage}&per_page=${picturesPerPage}`;

    let response = await fetch(url);
    let result = await response.json();
    let totalHits = result.totalHits;

    if(currentPage > 1){
        previousButton.disabled = false; 
    }
    else{
        previousButton.disabled = true;
    }
    if(currentPage * picturesPerPage >= totalHits){
        nextButton.disabled = true;
        remainingPictures = totalHits - ((currentPage - 1) * picturesPerPage); //Sätter remainingPictures till det överblivna när det inte finns (10) bilder att visa. 
    }
    else{
        nextButton.disabled = false;
        remainingPictures = picturesPerPage; //Sätter remainingPictures till picturesPerPage (10), när det antalet finns tillgängligt. 
    }

    DisplayPictures(result);
}

function DisplayPictures(result){
    containerDiv.textContent = '';

    for(let i = 0; i < remainingPictures; i++){ //Använder remainingPictures för att undvika onödiga iterationer. 
        let picture = result.hits[i].webformatURL;
        let author = result.hits[i].user;
        let tags = result.hits[i].tags;

        let imageDiv = document.createElement("div")
        let image = document.createElement("img");
        let tagsText = document.createElement("h2");
        let authorText = document.createElement("h3");
        
        image.src = picture;
        tagsText.textContent = tags;
        authorText.textContent = `Taken by: ${author}`;
        
        containerDiv.append(imageDiv);
        imageDiv.append(image, tagsText, authorText);
    }
}