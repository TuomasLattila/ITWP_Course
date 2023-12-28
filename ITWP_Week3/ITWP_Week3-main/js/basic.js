const tableBody = document.getElementById("tableBody")
let counter = 0
let employment = []

fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065')
    .then(res => res.json())
    .then(data1 => {
        employment = data1.dataset.value
    })

fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff')
    .then(response => response.json())
    .then(data => {
        Object.keys(data.dataset.dimension.Alue.category.label).forEach((key) => {
            
            let tr = document.createElement("tr")
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            let td3 = document.createElement("td")
            let td4 = document.createElement("td")            

            td1.innerText = data.dataset.dimension.Alue.category.label[key]
            td2.innerText = data.dataset.value[counter]
            td3.innerText = employment[counter]
            td4.innerText = ((employment[counter]/data.dataset.value[counter])*100).toFixed(2) + "%"

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            
            if (employment[counter]/data.dataset.value[counter] > 0.45)   {
                tr.style.backgroundColor = "#abffbd"
            }
            if(employment[counter]/data.dataset.value[counter] < 0.25)  {
                tr.style.backgroundColor = "#ff9e9e"
            }

            tableBody.appendChild(tr)
            counter++
        });
    })
    .catch(error => console.log(error));