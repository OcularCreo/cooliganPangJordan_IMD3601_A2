window.onload = function(){
    let scene = document.querySelector("a-scene");
    let btn = document.getElementById("btn");

    //sandwhich group
    let sandwhich = document.createElement("a-entity");
    sandwhich.setAttribute("id", "mainSandwhich");
    sandwhich.setAttribute("position", {x:3, y:1.1, z:0});
    scene.append(sandwhich);
    
    //current top height of the sandwhich
    let curX = 0; 
    let curY = 0; 
    let curZ = 0;
    
    


    let sandNum = 0; //tracks number of items that make up the sandwhich

    //Add topping to sandwhich
    btn.addEventListener('click', function(){
       
        let toppings = ["a-box", "a-cylinder"];
        let ingred = 0;

        if(sandNum == 0){
            //Creating the bottom bread thing
            ingred = document.createElement("a-box");
            
            //standard bottom bread size
            ingred.setAttribute("width", 0.75);
            ingred.setAttribute("height", 0.1);
            ingred.setAttribute("depth", 0.75);

        } else {

            let idx = Math.round(Math.random() * 1);
            console.log(idx);
            console.log(toppings[idx]);
            ingred = document.createElement(toppings[idx]);

            //standard bottom bread size
            ingred.setAttribute("width", 0.75);
            ingred.setAttribute("height", 0.1);
            ingred.setAttribute("depth", 0.75);

        }

        ingred.setAttribute("position", {x:0, y:curY, z:0});

        sandwhich.appendChild(ingred);
        curY += 0.1;
        sandNum++;

    });
    
};

setInterval(function(){

}, milliseconds);

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


