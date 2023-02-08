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

    //Add topping to sandwhich
    btn.addEventListener('click', function(){
       
        //Creating the bottom bread thing
        let bottomBread = document.createElement("a-box");
        
        //standard bottom bread size
        bottomBread.setAttribute("width", 0.5);
        bottomBread.setAttribute("height", 0.1);
        bottomBread.setAttribute("depth", 0.5);

        sandwhich.appendChild(bottomBread);

    });


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
    
};




