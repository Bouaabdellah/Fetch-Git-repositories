// main variable 
let inputRepose = document.querySelector(".get-repos input"),
buttonRepose = document.querySelector(".get-repos span"),
dataRepose = document.querySelector(".show-data");

buttonRepose.onclick = function(){
    getRepose();
}
function getRepose(){
    if (inputRepose.value === ""){
    dataRepose.innerHTML = `<span>User name can 't be empty</span>`;
    }
    else{
        fetch(`https://api.github.com/users/${inputRepose.value}/repos`)
        .then((res) => {return res.json()})
        .then((data) => displayData(data)).catch((err) => {
            notfound()});
    }
}
function displayData(data){
    dataRepose.innerHTML = "";
    data.forEach(value =>{
        // add the name of repose
        let dataContainer = document.createElement("div");
        let textName = document.createTextNode(`${value.name}`);
        dataContainer.appendChild(textName);
        // add its url
        let smallContainer = document.createElement("div");
        let url = document.createElement("a");
        url.target = "_blank";
        url.href = `https://github.com/${inputRepose.value}/${value.name}`;
        let urlText = document.createTextNode("visite");
        url.appendChild(urlText);
        smallContainer.appendChild(url);
        // add its stars
        let stars = document.createElement("span"),
        starsText = document.createTextNode(`Stars : ${value.stargazers_count}`);
        stars.appendChild(starsText);
        smallContainer.appendChild(stars);
        dataContainer.appendChild(smallContainer);
        // add to the show data
        dataRepose.appendChild(dataContainer);
    })
};
function notfound(){
    let notFoundText = document.createTextNode(`${inputRepose.value} name don 't exist, try again`);
    dataRepose.appendChild(notFoundText);
}
// ElzeroWebSchool