class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectange {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }
}

class QuadTree {
    constructor(boundry, n) {
        this.boundry = boundry;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    insert(point) {

        if (!this.boundry.contains(point)) {
            return;
        }



        if (this.points.length < this.capacity) {
            this.points.push(point);
            return;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            this.ne.insert(point);
            this.nw.insert(point);
            this.se.insert(point);
            this.sw.insert(point);
        }
    }

    subdivide() {
        let x = this.boundry.x;
        let y = this.boundry.y;
        let w = this.boundry.w;
        let h = this.boundry.h;

        let _nw = new Rectange(x + w / 2, y - h / 2, w / 2, h / 2);
        this.nw = new QuadTree(_nw, this.capacity);

        let _ne = new Rectange(x - w / 2, y - h / 2, w / 2, h / 2);
        this.ne = new QuadTree(_ne, this.capacity);

        let _se = new Rectange(x + w / 2, y + h / 2, w / 2, h / 2);
        this.se = new QuadTree(_se, this.capacity);

        let _sw = new Rectange(x - w / 2, y + h / 2, w / 2, h / 2);
        this.sw = new QuadTree(_sw, this.capacity);

        this.divided = true;
    }

    draw(ctx) {
        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.rect(this.boundry.x - this.boundry.w, this.boundry.y - this.boundry.h, this.boundry.w * 2, this.boundry.h * 2);
        ctx.stroke();

        if (this.divided) {
            this.nw.draw(ctx);
            this.ne.draw(ctx);
            this.sw.draw(ctx);
            this.se.draw(ctx);
        }

        for (let p of this.points) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
        }
        
    }
}