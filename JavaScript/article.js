
let NextButton = document.getElementById("NextBtn");
let PreviousButton = document.getElementById("PreviousBtn");
let CardContainer = document.getElementById("CardContainer");

let NumbersOfItems = 16;
let FirstDisplay = 0;
let LastDisplay = firstDisplay + NumbersOfItems;
let Results;

let SearchInput = document.getElementById("SearchInput");
let ShowAccount = document.getElementById("ShowAccount")

const UrlDeLaFenetre = window.location.search;
const LesParametresGet = new URLSearchParams(UrlDeLaFenetre);
const Value = LesParametresGet.get("Search");
console.log(Value)




async function SearchShoes() {
    LastDisplay = FirstDisplay + NumbersOfItems;
    FirstDisplay = 0;
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
        for (let i = FirstDisplay; i < LastDisplay; i++){
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
    if (FirstDisplay != 0){
        FirstDisplay -= NumbersOfItems;
        LastDisplay -= NumbersOfItems;
        ShowShoes();
    }
});

NextButton.addEventListener('click', () =>{
    if (LastDisplay < Results.length){
        FirstDisplay += NumbersOfItems;
        LastDisplay += NumbersOfItems;
        ShowShoes(); 
    }
});

// SearchInput.addEventListener("keyup", SearchBar)

async function SearchBar(e) {
    let SearchString = Value.toLowerCase().replace(/\s/g, "");
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
            return(element.nom.toLowerCase().includes(SearchString.toLowerCase()));
        });
        LastDisplay = Results.length;
        FirstDisplay = 0;
        console.log(Results)
        ShowShoes();
    })
    .catch ((error) => console.error("Visiblement ca ne fonctionne pas", error))  
}