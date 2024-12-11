
let NextButton = document.getElementById("NextBtn");
let PreviousButton = document.getElementById("PreviousBtn");
let CardContainer = document.getElementById("CardContainer");

let NumbersOfItems = 16;
let firstDisplay = 0;
let lastDisplay = firstDisplay + NumbersOfItems;
let Results;

let SearchInput = document.getElementById("SearchInput");
let ShowAccount = document.getElementById("ShowAccount")

const urlDeLaFenetre = window.location.search;
const lesParametresGet = new URLSearchParams(urlDeLaFenetre);
const Value = lesParametresGet.get("Search");
console.log(Value)




async function SearchShoes() {
    lastDisplay = firstDisplay + NumbersOfItems;
    firstDisplay = 0;
    try {
        const res = await fetch("../bdd.json");
        const json = await res.json();
        Results = json;
        console.log(Results)
    } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON", error);
    }
}

function ShowShoes(){
    CardContainer.innerHTML = ``;
        for (let i = firstDisplay; i < lastDisplay; i++){
        let Card = document.createElement("div");
        Card.id = i;
        Card.innerHTML = 
        `<div class="CardImgDiv">
                <img src="../Image/AIR-JORDAN-1-MID-SE.webp" alt="Image Card">
            </div>
            <p class="CardTitre">${Results[i].nom}</p>
            <p class="CardDescription">${Results[i].description}<br><span class="TextNormal">${Results[i].prix} €</span></p>
        </div>`;
        Card.className = "Card";
        CardContainer.appendChild(Card);
    }
}

window.onload = async () => {
    if(Value == null){
        await SearchShoes();
        ShowShoes(); 
    }else {
        await SearchBar();
    }
}

PreviousButton.addEventListener('click', () =>{
    if (firstDisplay != 0){
        firstDisplay -= NumbersOfItems;
        lastDisplay -= NumbersOfItems;
        ShowShoes();
    }
});

NextButton.addEventListener('click', () =>{
    if (lastDisplay < Results.length){
        firstDisplay += NumbersOfItems;
        lastDisplay += NumbersOfItems;
        ShowShoes(); 
    }
});

// SearchInput.addEventListener("keyup", SearchBar)

async function SearchBar(e) {
    let searchString = Value.toLowerCase().replace(/\s/g, "");
    CardContainer.innerHTML = "";
    fetch ("../bdd.json")
    .then (data => {
        if (data.ok){
            return data.json();
        }else if (data.status === 500){

            alert("Ce Pokémon n'existe pas. Veuillez rechercher un pokémon valide. Merci. bien cordialement, l'équipe de toute l'AFEC Dax. Joyeux Noel, Hanouka, joyeuse Thanks Giving, Pâques, St Valentin. Bon carnaval de RIO !!!")
        }
    })
   
    .then (json => {
        Results = json.filter((element) => {
            return(element.nom.toLowerCase().includes(searchString.toLowerCase()));
        });
        lastDisplay = Results.length;
        firstDisplay = 0;
        console.log(Results)
        ShowShoes();
    })
    .catch ((error) => console.error("Visiblement ca ne fonctionne pas", error))  
}