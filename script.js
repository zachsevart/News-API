const apiKey = "da03b35bc92247e79711103d40fa5e6f";

const cardNews = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
async function fetchNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;



    } catch(error){
        console.error("Error fetching news", error);
        return [];
    }
        
}

searchButton.addEventListener('click', async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)

        }catch(error){
            console.log("Error fetching news by query", error)
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;



    } catch(error){
        console.error("Error fetching news", error);
        return [];

    }
}


function displayBlogs(articles){
    cardNews.innerHTML = ""
    articles.forEach((article) =>{
        const blogCard = document.createElement("div")
        blogCard.classList.add("card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 50? article.title.slice(0, 50) + "...." : article.title
    title.textContent = truncatedTitle;   
        const description = document.createElement("p")
        const truncatedDescription = article.description.length > 200? article.description.slice(0,200) + "...." : article.description
    description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank")
        })
        cardNews.appendChild(blogCard);

    })
    

}



(async () => {
    try{
        const articles = await fetchNews();
        displayBlogs(articles);

    } catch(error){
        console.error("Error fetching news", error);
        return [];
    
    }



})();



