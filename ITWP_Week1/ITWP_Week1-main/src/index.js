let randomText = [
  "djfhjds",
  "difhudf",
  "dnjifdbia",
  "jsnaf",
  "dksan",
  "djafib",
];

/*Test if the document state is ready and excecutes the code on click*/
if (document.readyState !== "loading") {
  console.log("Document ready");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready after loading");
    initializeCode();
  });
}

function initializeCode() {
  /*buttons*/
  const printButton = document.getElementById("my-button");
  const addButton = document.getElementById("add-data");
  /*other elements*/
  const data = document.getElementById("data");
  const headerText = document.getElementById("headerText");
  const messageArea = document.getElementById("message");

  printButton.addEventListener("click", function () {
    console.log("hello world");
    headerText.innerText = "My notebook";
  });

  addButton.addEventListener("click", function () {
    let newText = document.createElement("li");

    if (messageArea.value == "") {
      if (randomText.length > 0) {
        newText.innerText = randomText.pop();
      } else {
        newText.innerText = "No more random text left";
      }
    } else {
      newText.innerText = messageArea.value;
    }
    data.appendChild(newText);
  });
}
