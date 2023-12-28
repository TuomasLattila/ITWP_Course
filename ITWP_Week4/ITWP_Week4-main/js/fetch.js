//fetch data from the API

const inputText = document.getElementById("input-show")
const btnSearch = document.getElementById("submit-data")
const body = document.getElementById("template-area")

btnSearch.addEventListener("click", getShows)

async function getShows()  {
    try {
        event.preventDefault();
        const url = "https://api.tvmaze.com/search/shows?q=" + inputText.value
        const showsPromise = await fetch(url)
        const showsJSON = await showsPromise.json()
        
        //console.log(showsJSON)

        removeOldShows()
        showsJSON.forEach(show => {
            buildTemplate(show)
        });
    }
    catch (error)   {
        console.log(error)
    }

}

function buildTemplate(show)    {
    let div1 = document.createElement('div')
    div1.classList.add('show-data')
    let div2 = document.createElement('div')
    div2.classList.add('show-info')

    let img = document.createElement('img')
    let title = document.createElement('h1')
    let summary = document.createElement('p')

    title.innerText = show.show.name
    summary.innerHTML = show.show.summary
    if (show.show.image != null)    {
        img.src = show.show.image.medium
    }
    img.alt = "no img found"

    div2.appendChild(title)
    div2.appendChild(summary)
    div1.appendChild(img)
    div1.appendChild(div2)

    body.appendChild(div1)
}

function removeOldShows()   {
    var oldShows = document.querySelectorAll('div.show-data')
    oldShows.forEach(show => {
        show.remove()
    })
}