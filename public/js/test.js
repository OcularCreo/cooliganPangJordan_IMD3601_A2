window.onload = function(){
    let scene = document.querySelector("a-scene");
    let btn = document.getElementById("btn");

    btn.addEventListener('click', function(){
        let box = document.createElement("a-box");

        let xPos = Math.round(Math.random() * 10);
        let zPos = Math.round(Math.random() * 10);

        let position = [xPos, 5, zPos];

        box.setAttribute("position", {x:xPos, y:2, z:zPos});
        box.setAttribute("id", "test");

        scene.append(box);

        console.log("Box Created");
        console.log(xPos);

    });
    
};




