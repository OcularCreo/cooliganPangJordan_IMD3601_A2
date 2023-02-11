
//used for storing needed info of props
//PROBABLY NEED TO ADD A CLASS TO THIS TOO!
class assetInfo {
    constructor(id, model, rotation, scale, oriPos, height){
        this.class      = "sandwhichIngredient interactive";
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

let curY = 0;               //Helps track the current height of the sandwhich
let lastIngred = bread;     //defaulting prevIngred to bread //tracks last selected asset info
let cycleIngred = bread;    //variable to track previous asset on display info
let previous_asset = makeIngred(bread, 0);    //variable to track previous asset on display

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
    let btn_start   = document.getElementById("btn_start"); //button to start sandwhich
    let btn_end     = document.getElementById("btn_end");   //button to finish sandwhich

    let sandNum = 0;    //tracks number of items that make up the sandwhich
    let added = 1;      //bool for when new ingredient has been added
    let makingSand = 1; //tracksi if sandwhich is being made
    let eaten = 0;

    //represents group/parent of the sandwhich and it's ingredients
    let sandwhich = document.createElement("a-entity");  
    sandwhich.setAttribute("id", "mainSandwhich");
    sandwhich.setAttribute("class", "interactive");
    sandwhich.setAttribute("position", {x:3, y:1.1, z:0});
    sandwhich.setAttribute("sound", "src: #eating_sound; on:click;");
    scene.append(sandwhich);

    let randIngredInfo = ingredList[Math.floor(Math.random() * 6)];   //get a random ingredient info
    let randIngredAsset = makeIngred(randIngredInfo);                 //create the selected ingredient

    //begin building sandwhich or add ingredients to sandwhich
    btn_start.addEventListener('click', function(){
        
        
        if(sandNum == 0){
            randIngredInfo = bread;
            randIngredAsset = makeIngred(randIngredInfo);
            makingSand = 1;
            curY = 0;
        }

        added = 1;
        sandNum++;

    });

    //finish the sandwhich
    btn_end.addEventListener('click', function(){

        //add the last piece of bread
        let lastBread = makeIngred(bread, sandNum);
        sandwhich.removeChild(sandwhich.lastChild); //possibly remove this?
        sandwhich.appendChild(lastBread);

        sandNum = 0;
        makingSand = 0;

    });

    //deletes the created sandwhich when clicked. This will be sort of like an "eating" action
    sandwhich.addEventListener('click', function(){
        
        //verifiy that the sandwhich isn't currently being constructed
        if(makingSand == 0){
            //delete all children of the sandwhich group
            while(sandwhich.firstChild){
                sandwhich.removeChild(sandwhich.firstChild);    
            }
        }


    });

    //cycles through sandwhich ingredients
    setInterval(function(){

        //dont do anything if there is nothing in the sandwhich
        if(!sandNum){
            return;
        }

        //add the ingredient when the user clicks the button or if it's the first ingred (bread)
        if(added){

            added = 0;
            randIngredAsset = makeIngred(randIngredInfo);        //create the selected ingredient
            sandwhich.append(randIngredAsset);

            curY += (randIngredInfo.height / 2) + (lastIngred.height / 2);
            lastIngred = randIngredInfo;

        } else {
            sandwhich.removeChild(sandwhich.lastChild);
        }

        randIngredInfo = ingredList[Math.floor(Math.random() * 6)];   //get a random ingredient info
        randIngredAsset = makeIngred(randIngredInfo);        //create the selected ingredient
        sandwhich.append(randIngredAsset);

    }, 500);

    
};