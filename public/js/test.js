
//used for storing needed info of props
class assetProp {
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
const bread     = new assetProp("breadIngred", "#betterBread_model", "0 0 0", "0.8 0.8 0.8", [0, 0.0, 0],  0.08);
const cheese    = new assetProp("cheeseIngred", "#cheese_model", "0 0 0", "0.75 0.45 0.75", [0, 0, 0],  0.23);
const tomato    = new assetProp("tomIngred", "#tomato_model", "0 0 0", "7.5 7.5 7.5", [0, 0, 0],  0.07);
const meat      = new assetProp("meatIngred", "#meat_model", "0 0 -45", "0.002 0.002 0.002", [-0.3, -0.05, 0],  0.3);
const pizza     = new assetProp("pizIngred", "#pizza_model", "0 0 0", "0.04 0.04 0.04", [0, 0, 0],  0.04);
const rat       = new assetProp("ratIngred", "#rat_model", "90 0 0", "0.003 0.003 0.003", [0, 0, -0.2],  0.1);
const chicken   = new assetProp("chickIngred", "#chicken_model", "0 0 0", "0.02 0.02 0.02", [0, 0.07, 0],  0.17);

let ingredList = [bread, cheese, tomato, meat, pizza, rat, chicken]

let curY = 0;           //Helps track the current height of the sandwhich
let lastIngred = bread; //defaulting prevIngred to bread
let previewIngred = bread;

//function returns creates and returns a random ingredient
function randIngred(){
    let ingredIdx = Math.round(Math.random() * 6);      //always get a random number for random asset thing
    let ingred = document.createElement("a-entity");    //will alwasy be making an a-entity type no matter what asset

    let asset = ingredList[ingredIdx]; //get the ingredient that was chosen at random

    //setting attributes of bread model
    ingred.setAttribute("id", asset.id);
    ingred.setAttribute("scale", asset.scale);
    ingred.setAttribute("gltf-model", asset.model);
    ingred.setAttribute("rotation", asset.rotation);

    //getting proper y position based off height of previous ingred, current ingred, and total height
    let yPos = (asset.height/2) + (lastIngred.height/2) + asset.oriPos[1] + curY;
    //curY = yPos;

    //setting the position of the bread based off of required tweaks
    ingred.setAttribute("position", {x:asset.oriPos[0], y:yPos, z:asset.oriPos[2]});
    previewIngred = asset; //save the asset for the next ingredient

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

    //Add topping to sandwhich
    btn.addEventListener('click', function(){
       
        let ingredIdx = Math.round(Math.random() * 6);      //always get a random number for random asset thing
        let ingred = document.createElement("a-entity");    //will alwasy be making an a-entity type no matter what asset

        if(sandNum == 0){
            
            //setting attributes of bread model
            ingred.setAttribute("id", bread.id);
            ingred.setAttribute("scale", bread.scale);
            ingred.setAttribute("gltf-model", bread.model);
            ingred.setAttribute("rotation", bread.rotation);

            //setting the position of the bread based off of required tweaks
            ingred.setAttribute("position", {x:bread.oriPos[0], y:bread.height/2, z:bread.oriPos[2]});

            sandwhich.appendChild(ingred);
            curY = bread.height/2;
            console.log(curY);

        } else {
            
            lastIngred = previewIngred;
            console.log(lastIngred);
            sandNum++;
            //update current y
            //some reason it's stopping

        }

        
        sandNum++;

    });

    //cycles through sandwhich ingredients
    setInterval(function(){

        //verify that there is bread on the table
        if(sandNum == 1){
            previewIngred = randIngred();
            sandwhich.append(previewIngred);
            sandNum++;

        } else if(sandNum > 1){
            
            let foo = 2

            //if(sandNum == sandwhich.children.length)

            if(foo == 0){
                sandwhich.removeChild(sandwhich.lastChild);
            }
            previewIngred = randIngred(); 
            sandwhich.append(previewIngred);

            //issue with returning class object and element object
            //held within previewIngred and lastIngred
            //might need to make another variable
        }
        

    }, 1000);

    
};

/*
setInterval(function(){

}, milliseconds);

*/

/*btn.addEventListener('click', function(){
        let box         = document.createElement("a-box");
        let sandwhich   = document.createElement("a-entity");

        let xPos = Math.round(Math.random() * 10);
        let zPos = Math.round(Math.random() * 10);

        let position = [xPos, 5, zPos];

        box.setAttribute("position", {x:xPos, y:2, z:zPos});
        box.setAttribute("id", "test");

        sandwhich.appendChild(box);
        scene.append(sandwhich);

        console.log("Box Created");
        console.log(xPos);

    });*/


