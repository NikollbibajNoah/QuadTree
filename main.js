const container = document.querySelector(".container");

const width = 400;
const height = 400;
let isMouseDown = false;

//Canvas Element
let canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

container.appendChild(canvas);


///Quadtree
const points = 4;

let boundry = new Rectange(200, 200, 200, 200);
let qt = new QuadTree(boundry, points);
console.log(qt);

/*
for (let i = 0; i < 500; i++) {
    let p = new Point(Math.random() * width, Math.random() * height);
    qt.insert(p);
}*/

canvas.addEventListener('mousedown', () => {isMouseDown = true;});

canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
        
    const box = canvas.getBoundingClientRect();

    let posX = e.clientX - box.x;
    let posY = e.clientY - box.y;

    for (let i = 0; i < 5; i++) {
        function fromRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        let p = new Point(posX + fromRandom(-5, 5), posY + fromRandom(-5, 5));
        qt.insert(p);
    }
    

    qt.draw(ctx);
});

canvas.addEventListener('mouseup', () => {isMouseDown = false;});