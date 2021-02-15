//Elements
const image = document.getElementById("rpgImage");
const playerChoiceText = document.getElementById("playerChoiceText");
const shipsText = document.getElementById("shipsText");
const chuckMessageLabel = document.getElementById("chuckMessageLabel");
const chuckImg = document.createElement("img");
const resultPlayerName = document.getElementById("playerName");
const charactertImg = document.getElementById("charactertImg")
const resultShipType = document.getElementById("shipType");
const message = document.getElementById("message");
message.style.display = "none";

//Variables
let shipIndex = 0;
let imgIn = 0;
let playerIndex = 0;
let playerLength = 0;
let shipLength = 0;
let nameData = {};
let shipData = {};
let characterImage = {};

//Event Listners

const img1Minus = document.getElementById("img1Minus").addEventListener("click", function(){
    imgIn -= 1;
    callFunctions()
})
const img1Plus =  document.getElementById("img1Plus").addEventListener("click", function(){
    imgIn += 1;
    callFunctions()
});
const playerChoiceMinus =  document.getElementById("playerChoiceMinus").addEventListener("click", function(){
    if(playerIndex == 0 ){
        playerIndex =0;
    }else playerIndex-=1;
    callFunctions()
});
const playerChoicePlus =  document.getElementById("playerChoicePlus").addEventListener("click", function(){
    if(playerIndex < (playerLength - 1) ){
        playerIndex += 1;
    }
    callFunctions()
});
const shipsMinus =  document.getElementById("shipsMinus").addEventListener("click", function(e){
    
    if(shipIndex == 0 ){
        shipIndex =0;
    }else shipIndex-=1;
    console.log("minus")
    callFunctions()
});
const shipsPlus =  document.getElementById("shipsPlus").addEventListener("click", function(e){
    
    if(shipIndex < (shipLength - 1) ){
        shipIndex += 1;
    } console.log(shipIndex)
    callFunctions()
});
const done =  document.getElementById("done").addEventListener("click", ()=>{

    message.style.display = "grid";
})

//Axios Get Requests
async function getData(){  
    try{
        const marioData = await axios.get("https://www.amiiboapi.com/api/amiibo/ ");
        const ships = await axios.get("https://swapi.dev/api/starships/");
        const playerChoice = await axios.get("https://swapi.dev/api/people/");
        const location = await axios.get("https://rickandmortyapi.com/api/location");
        
        //Set Global Gariable variables
        characterImage = marioData.data.amiibo;
        shipData = ships.data.results;
        nameData = playerChoice.data.results;          
        playerLength = nameData.length;
        shipLength = shipData.length;
        console.log(playerLength);

        //Call functions
        getImage(characterImage[imgIn].image);
        getplayerChoice(nameData[playerIndex].name);
        getships(shipData[shipIndex]);

        console.log("This is just to see How many times Axios is does a request")
    }
    catch(error){
        console.log(error);
    }
}
async function getJoke(){
    try {
        const message = await axios.get("https://api.chucknorris.io/jokes/random?category=dev")
        getMessage(message.data)
    
    } catch (error) {
        console.log(error)
    }
   
}

getData()
getJoke()

function callFunctions(){

    getImage(characterImage[imgIn].image)
    getplayerChoice(nameData[playerIndex].name)
    getships(shipData[shipIndex]);
    getJoke()
}
function getImage(data){
    console.log(data)
    image.src = data
    charactertImg.src = data    
}
function getplayerChoice(data){

    console.log(data)
    playerChoiceText.textContent = data;
    resultPlayerName.innerHTML="<b>Name: </b>" + `${data}` ;
}
function getships(data){
    console.log(data)
    shipsText.textContent = `Your ship is a ${data.name} made by ${data.manufacturer}`;
    resultShipType.innerHTML= "<b>Vhicle: </b>" + `${data.name}` + "<br>"+ "<b>Made by:</b> "+` ${data.manufacturer}`;
}
function getMessage(data){
    console.log(data)
    chuckMessageLabel.innerHTML= "<b>Joke: </b>" + `${data.value}`;
    chuckImg.src = data.icon_url;
    chuckImg.id="resultImg";
    chuckMessageLabel.append(chuckImg);
}