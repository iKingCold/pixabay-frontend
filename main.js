let apiUrl = "https://pixabay.com/api/"
let apiKey = "42130475-722c6d95dfe4cd0d32e86b59d"
let searchBar = document.querySelector("#search");
let selectedColor = document.querySelector("#colors");
let form = document.querySelector("#search-form");
let containerDiv = document.querySelector(".container");

form.addEventListener("submit", event => {
    event.preventDefault();

    FetchPictures();
})

async function FetchPictures(){
    let url = `${apiUrl}?key=${apiKey}&q=${searchBar.value}&colors=${selectedColor.value}`;

    let response = await fetch(url);
    let result = await response.json();

    DisplayPictures(result);

    console.log(result);
}

function DisplayPictures(result){
    containerDiv.textContent = '';
    
    for(let i = 0; i < 10; i++){
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


/*
Alla API queries.
q	str	A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.
Example: "yellow+flower"

lang	str	Language code of the language to be searched in.
Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh
Default: "en"

id	str	Retrieve individual images by ID.
image_type	str	Filter results by image type.
Accepted values: "all", "photo", "illustration", "vector"
Default: "all"

orientation	str	Whether an image is wider than it is tall, or taller than it is wide.
Accepted values: "all", "horizontal", "vertical"
Default: "all"

category	str	Filter results by category.
Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, 
religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

min_width	int	Minimum image width.
Default: "0"

min_height	int	Minimum image height.
Default: "0"

colors	str	Filter images by color properties. A comma separated list of values may be used to select multiple properties.
Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"

editors_choice	bool	Select images that have received an Editor's Choice award.
Accepted values: "true", "false"
Default: "false"

safesearch	bool	A flag indicating that only images suitable for all ages should be returned.
Accepted values: "true", "false"
Default: "false"

order	str	How the results should be ordered.
Accepted values: "popular", "latest"
Default: "popular"

page	int	Returned search results are paginated. Use this parameter to select the page number.
Default: 1

per_page	int	Determine the number of results per page.
Accepted values: 3 - 200
Default: 20

callback	string	JSONP callback function name

pretty	bool	Indent JSON output. This option should not be used in production.
Accepted values: "true", "false"
Default: "false"
*/