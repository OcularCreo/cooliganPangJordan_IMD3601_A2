
//used for storing needed info of props
class assetInfo {
    constructor(id, model, rotation, scale, oriPos, height){
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
const cheese    = new assetInfo("cheeseIngred", "#cheese_model", "0 0 0", "0.75 0.45 0.75", [0, 0, 0],  0.167);
const tomato    = new assetInfo("tomIngred", "#tomato_model", "0 0 0", "7.5 7.5 7.5", [0, 0, 0],  0.07);
const meat      = new assetInfo("meatIngred", "#meat_model", "0 0 -45", "0.002 0.002 0.002", [-0.3, -0.05, 0],  0.3);
const pizza     = new assetInfo("pizIngred", "#pizza_model", "0 0 0", "0.04 0.04 0.04", [0, 0, 0],  0.04);
const rat       = new assetInfo("ratIngred", "#rat_model", "90 0 0", "0.003 0.003 0.003", [0, 0, -0.2],  0.1);
const chicken   = new assetInfo("chickIngred", "#chicken_model", "0 0 0", "0.02 0.02 0.02", [0, 0.07, 0],  0.15);

let ingredList = [bread, cheese, tomato, meat, pizza, rat, chicken]

let curY = 0;               //Helps track the current height of the sandwhich
let lastIngred = bread;     //defaulting prevIngred to bread //tracks last selected asset info
let cycleIngred = bread;    //variable to track previous asset on display info
let previewIngred_asset;    //variable to track previous asset on display

//function returns creates and returns a random ingredient
function makeIngred(ingredInfo, sandNum){
    
    let ingred = document.createElement("a-entity");    //will alwasy be making an a-entity type no matter what asset

    //setting attributes of bread model
    ingred.setAttribute("id", ingredInfo.id);
    ingred.setAttribute("scale", ingredInfo.scale);
    ingred.setAttribute("gltf-model", ingredInfo.model);
    ingred.setAttribute("rotation", ingredInfo.rotation);

    //getting proper y position based off height of previous ingred, current ingred, and total height
    let yPos = (ingredInfo.height/2) + (lastIngred.height/2) + ingredInfo.oriPos[1] + curY;

    //special case for setting the first bread height
    if(sandNum == 0){
        ingred.setAttribute("position", {x:bread.oriPos[0], y:bread.height/2, z:bread.oriPos[2]});
        //curY = bread.height/2;
    } else {
        //setting the position of the bread based off of required tweaks
        ingred.setAttribute("position", {x:ingredInfo.oriPos[0], y:yPos, z:ingredInfo.oriPos[2]});
    }

    console.log(lastIngred.height);

    return ingred;

}

window.onload = function(){

    let scene = document.querySelector("a-scene");
    let btn = document.getElementById("btn");

    //sandwhich group
    let sandwhich = document.createElement("a-entity");
    sandwhich.setAttribute("id", "mainSandwhich");
    sandwhich.setAttribute("position", {x:3, y:1.1, z:0});
    scene.append(sandwhich);

    let sandNum = 0; //tracks number of items that make up the sandwhich
    let added = 1;  //bool for when new ingredient has been added

    //Add topping to sandwhich
    btn.addEventListener('click', function(){

        if(sandNum == 0){

            //make the first ingredient (should be the bottom piece of bread)
            let firstBread = makeIngred(bread, sandNum); 
            sandwhich.appendChild(firstBread);

        }
        
        added = 1;
        sandNum++;

    });

    //cycles through sandwhich ingredients
    setInterval(function(){
        
        let randomIngred = ingredList[Math.round(Math.random() * 6)];   //get a random ingredient info
        previewIngred_asset = makeIngred(randomIngred, sandNum);        //create the selected ingredient

        //add the ingredient when the user clicks the button or if it's the first ingred (bread)
        if(added && (sandNum > 0)){
            sandwhich.append(previewIngred_asset);
            added = 0;

            //first situation for adding first ingredient
            if(sandNum == 1){
                
                console.log("ENTERED 0001");
                curY = bread.height/2;
            } else {
                console.log(" -- ENTERED NEW --");
                
                lastIngred = cycleIngred;
                curY += (randomIngred.height / 2) + (lastIngred.height / 2);
            }

        }
        //when an ingredient hasn't been chosen, cycle through the ingredients
        else if(!added){

            sandwhich.removeChild(sandwhich.lastChild);
            sandwhich.append(previewIngred_asset);
            cycleIngred = randomIngred;
        }
        

    }, 300);

    
};