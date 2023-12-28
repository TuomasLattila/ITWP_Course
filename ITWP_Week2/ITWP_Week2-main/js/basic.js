const submitButton = document.getElementById("submit-data")
const emptyButton = document.getElementById("empty-table")

let tableBody = document.getElementById("tableBody")
let newUsername = document.getElementById("input-username")
let newEmail = document.getElementById("input-email")
let newAddress = document.getElementById("input-address")
let adminCB = document.getElementById("input-admin")
let picture = document.getElementById("input-image")

userEditVerification = 0

let users = []

submitButton.addEventListener("click", () => {

    users.forEach(user => {
        if (user.username == newUsername.value) {
            user.email = newEmail.value
            user.address = newAddress.value
            user.admin = adminCB.checked
            user.pictureFile = picture.files[0]
            userEditVerification = 1
        }
    });

    if (userEditVerification == 0) {
        users.push({username: newUsername.value, email: newEmail.value, address: newAddress.value, admin: adminCB.checked, pictureFile: picture.files[0]})
    }
    
    updateTable(users)

    newUsername.value = ""
    newEmail.value = ""
    newAddress.value = ""
    adminCB.checked = false
    picture.value = ""
})

emptyButton.addEventListener("click", () => {
    emptyTable()
    while(users.length > 0) {
        users.pop()
    }
})

function updateTable(users) {
    emptyTableExceptTestRows()
    users.forEach(user => {
        let tableRow = document.createElement("tr")

        let tableColumn1 = document.createElement("td")
        tableColumn1.innerText = user.username
        tableRow.appendChild(tableColumn1)

        let tableColumn2 = document.createElement("td")
        tableColumn2.innerText = user.email
        tableRow.appendChild(tableColumn2)

        let tableColumn3 = document.createElement("td")
        tableColumn3.innerText = user.address
        tableRow.appendChild(tableColumn3)

        let tableColumn4 = document.createElement("td")
        if (user.admin == true)    {
            tableColumn4.innerText = "X"
        } else  {
            tableColumn4.innerText = "-"
        }
        tableRow.appendChild(tableColumn4)

        if (user.pictureFile != null)   {
            let tableColumn5 = document.createElement("td")
            let img = document.createElement("img")
            img.width = "64"
            img.height = "64"
            img.src = URL.createObjectURL(user.pictureFile)
            tableColumn5.appendChild(img)
            tableRow.appendChild(tableColumn5)
        }
    
        tableBody.appendChild(tableRow)

        userEditVerification = 0
    });
}

function emptyTableExceptTestRows()   {
    while(tableBody.hasChildNodes())  {
        if(tableBody.lastChild == document.getElementById("testRow3"))  {
            break
        } else  {
            tableBody.removeChild(tableBody.lastChild)
        }
    }
}

function emptyTable()   {
    while(tableBody.hasChildNodes())  {
        tableBody.removeChild(tableBody.firstChild)
    }
}

