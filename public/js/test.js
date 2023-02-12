
//used for storing needed info of props
//PROBABLY NEED TO ADD A CLASS TO THIS TOO!
class assetInfo {
    constructor(id, model, rotation, scale, oriPos, height){
        this.class      = "sandwichIngredient interactive";
        this.id         = id; 
        this.model      = model;
        this.rotation   = rotation; 
        this.scale      = scale;
        this.oriPos     = oriPos;
        this.height     = height;
    }
}

//list of props
const bread     = new assetInfo("breadIngred", "#betterBread_model", "0 0 0", "0.8 0.8 0.8", [0, 0, 0],  0.05);
const cheese    = new assetInfo("cheeseIngred", "#cheese_model", "0 0 0", "0.75 0.45 0.75", [0, 0, 0],  0.166);
const tomato    = new assetInfo("tomIngred", "#tomato_model", "0 0 0", "7.5 7.5 7.5", [0, 0, 0],  0.07);
const meat      = new assetInfo("meatIngred", "#meat_model", "0 0 -45", "0.002 0.002 0.002", [-0.3, -0.05, 0],  0.3);
const pizza     = new assetInfo("pizIngred", "#pizza_model", "0 0 0", "0.04 0.04 0.04", [0, 0, 0],  0.04);
const rat       = new assetInfo("ratIngred", "#rat_model", "90 0 0", "0.003 0.003 0.003", [0, 0, -0.2],  0.1);
const chicken   = new assetInfo("chickIngred", "#chicken_model", "0 0 0", "0.02 0.02 0.02", [0, 0.07, 0],  0.15);

let ingredList = [bread, cheese, tomato, meat, pizza, rat, chicken]

let curY = 0;               //Helps track the current height of the sandwich
let lastIngred = bread;     //defaulting prevIngred to bread //tracks last selected asset info
let cycleIngred = bread;    //variable to track previous asset on display info
let previous_asset = makeIngred(bread, 0);    //variable to track previous asset on display
let music = false;

//function returns creates and returns a random ingredient
function makeIngred(ingredInfo){
    
    let ingred = document.createElement("a-entity");    //will alwasy be making an a-entity type no matter what asset

    //setting attributes of bread model
    ingred.setAttribute("id", ingredInfo.id);
    ingred.setAttribute("scale", ingredInfo.scale);
    ingred.setAttribute("gltf-model", ingredInfo.model);
    ingred.setAttribute("rotation", ingredInfo.rotation);
    ingred.setAttribute("class", ingredInfo.class);

    //getting proper y position based off height of previous ingred, current ingred, and total height
    let yPos = (ingredInfo.height/2) + (lastIngred.height/2) + ingredInfo.oriPos[1] + curY;

    //setting the position of the bread based off of required tweaks
    ingred.setAttribute("position", {x:ingredInfo.oriPos[0], y:yPos, z:ingredInfo.oriPos[2]});

    return ingred;

}

window.onload = function(){

    let scene       = document.querySelector("a-scene");    //scene
    let btn_start   = document.getElementById("btn_start"); //button to start sandwich
    let btn_end     = document.getElementById("btn_end");   //button to finish sandwich

    let sandNum = 0;    //tracks number of items that make up the sandwich
    let added = 1;      //bool for when new ingredient has been added
    let makingSand = 0; //tracksi if sandwich is being made

    //represents group/parent of the sandwich and it's ingredients
    let sandwich = document.createElement("a-entity");  
    sandwich.setAttribute("id", "mainSandwich");
    sandwich.setAttribute("class", "interactive");
    sandwich.setAttribute("position", {x:3, y:1.1, z:0});
    sandwich.setAttribute("sound", "src: #eating_sound; on:click; volume:5;");
    scene.append(sandwich);

    let randIngredInfo = ingredList[Math.floor(Math.random() * 6)];   //get a random ingredient info
    let randIngredAsset = makeIngred(randIngredInfo);                 //create the selected ingredient

    //begin building sandwich or add ingredients to sandwich
    btn_start.addEventListener('click', function(){
        
        //when there is no sandwich made create the bread
        if(sandNum == 0){
            randIngredInfo = bread;
            randIngredAsset = makeIngred(randIngredInfo);
            
            //setup variables
            makingSand = 1;
            curY = 0;
            sandNum = 0;
        }

        //if there is no music playing then play some music
        if(!music){
            let musicEl = document.createElement("a-entity");
            musicEl.setAttribute("id", "musicPlayer");
            musicEl.setAttribute("sound", "src:#bg_music; autoplay:true; loop:true;");
            scene.append(musicEl);
            music = true;
        }

        //tracking when an ingredient has been added to the sandwich
        added = 1;
        sandNum++;

    });

    //finish the sandwich
    btn_end.addEventListener('click', function(){

        //add the last piece of bread
        let lastBread = makeIngred(bread, sandNum);
        sandwich.removeChild(sandwich.lastChild);
        sandwich.appendChild(lastBread);

        makingSand = 0; //turn of functions that make the sandwich

    });

    //deletes the created sandwich when clicked. This will be sort of like an "eating" action
    sandwich.addEventListener('click', function(){
        
        //verifiy that the sandwich isn't currently being constructed
        if(makingSand == 0){
            //delete all children of the sandwich group
            while(sandwich.firstChild){
                sandwich.removeChild(sandwich.firstChild);    
            }

            sandNum = 0; //reset sandwich number
        }

    });

    //cycles through sandwich ingredients
    setInterval(function(){

        //dont do anything if there is nothing in the sandwich
        if(!makingSand){
            return;
        }

        //add the ingredient when the user clicks the button
        if(added){

            added = 0;                                      //flip added
            randIngredAsset = makeIngred(randIngredInfo);   //create the selected ingredient
            sandwich.append(randIngredAsset);               //

            //determine the new current sandwhich height and store the current ingred info as lastIngred
            curY += (randIngredInfo.height / 2) + (lastIngred.height / 2);
            lastIngred = randIngredInfo;

        } else {
            sandwich.removeChild(sandwich.lastChild); //remove the ingredient
        }

        randIngredInfo = ingredList[Math.floor(Math.random() * 6)];   //get a random ingredient info
        randIngredAsset = makeIngred(randIngredInfo);                 //create the selected ingredient
        sandwich.append(randIngredAsset);                             //

    }, 250);
    
};