let apiUrl = "https://pixabay.com/api/"
let apiKey = "42130475-722c6d95dfe4cd0d32e86b59d"

async function FetchPictures(){
    let url = `${apiUrl}?key=${apiKey}`

    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
}

FetchPictures();