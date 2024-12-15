'use client'

import dynamic from 'next/dynamic'
import useDeviceSize from './useDeviceSize';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { useRef } from 'react';

export default function HeroSketchWrapper() {
    const [width, height] = useDeviceSize();
    const canvasParentRef = useRef(null);
    const sketch = (p5) => {
        let sq1Pos;
        let sq1InitPos;
        let sq1Rot;
        let sq1T = 0;
        let sq1xOff = 0;
        let sq1yOff = 0;

        let sq2Pos;
        let sq2InitPos;
        let sq2Rot;
        let sq2T = 1;
        let sq2xOff = 0;
        let sq2yOff = 0;

        let tri1Pos;
        let tri1InitPos;
        let tri1Rot = 0;
        let tri1xOff = 0;
        let tri1yOff = 0;

        let tri2Pos;
        let tri2InitPos;
        let tri2Rot = 360;
        let tri2xOff = 0;
        let tri2yOff = 0;

        let pt1Pos;
        let pt2Pos;

        p5.setup = () => {
            p5.createCanvas(width, height);
            console.log("loaded");
            console.log(canvasParentRef);
            let fadeIn = canvasParentRef;
            // fadeIn.style.animation = "1s ease-in-out 0.5s 1 normal forwards running fadeIn";
            console.log(fadeIn.style);
            // fadeIn.one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
            //     // fadeIn.remove();
            //     console.log("hi faded in");
            // });

            initShapePositions();
        }

        function initShapePositions() {
            sq1Pos = sq1InitPos = p5.createVector(width / 5, height / 5);
            sq2Pos = sq2InitPos = p5.createVector(width * 5 / 8, height * 3 / 10);

            tri1Pos = tri1InitPos = p5.createVector(width * 19 / 40, height * 29 / 40)
            tri2Pos = tri2InitPos = p5.createVector(width * 29 / 40, height * 3 / 20)

            pt1Pos = p5.createVector(width * 3 / 10, height * 13 / 20)
            pt2Pos = p5.createVector(width * 9 / 10, height * 1 / 2)
        }

        // t is 0...360
        function drawSq(cx, cy, length, t = 0) {
            let x1 = cx - length / 2;
            let y1 = cy - length / 2;
            let x2 = cx + length / 2;
            let y2 = cy - length / 2;
            let x3 = cx + length / 2;
            let y3 = cy + length / 2;
            let x4 = cx - length / 2;
            let y4 = cy + length / 2;

            t = p5.radians(t);

            let x1r = cx + (x1 - cx) * Math.cos(t) - (y1 - cy) * Math.sin(t);
            let y1r = cy + (x1 - cx) * Math.sin(t) + (y1 - cy) * Math.cos(t);
            let x2r = cx + (x2 - cx) * Math.cos(t) - (y2 - cy) * Math.sin(t);
            let y2r = cy + (x2 - cx) * Math.sin(t) + (y2 - cy) * Math.cos(t);
            let x3r = cx + (x3 - cx) * Math.cos(t) - (y3 - cy) * Math.sin(t);
            let y3r = cy + (x3 - cx) * Math.sin(t) + (y3 - cy) * Math.cos(t);
            let x4r = cx + (x4 - cx) * Math.cos(t) - (y4 - cy) * Math.sin(t);
            let y4r = cy + (x4 - cx) * Math.sin(t) + (y4 - cy) * Math.cos(t);


            // make a square using the quad function
            // use the new rotated x & y values
            p5.quad(
                x1r, y1r,
                x2r, y2r,
                x3r, y3r,
                x4r, y4r
            );
        }

        function drawTri(cx, cy, r, rot = 0) {
            rot = p5.degrees(rot)
            p5.angleMode(p5.RADIANS)

            r /= 2;
            p5.triangle(
                cx + (r * Math.cos(rot)), cy + (r * Math.sin(rot)),
                cx + (r * Math.cos(rot + (p5.PI * 2 / 3))), cy + (r * Math.sin(rot + (p5.PI * 2 / 3))),
                cx + (r * Math.cos(rot - (p5.PI * 2 / 3))), cy + (r * Math.sin(rot - (p5.PI * 2 / 3)))
            );
        }

        function clamp(val, minVal, maxVal) {
            return Math.min(Math.max(val, minVal), maxVal);
        }

        function distSquared(x1, y1, x2, y2) {
            let dx = x2 - x1;
            let dy = y2 - y1;
            return dx * dx + dy * dy;
        }

        let cellSize = 75;
        let gridPadding = 20;

        function drawGrid() {
            // stroke(255, 255, 255, 50);

            p5.strokeWeight(4);

            // make a grid of points with a nested for loop
            for (let x = gridPadding; x < width - gridPadding; x += cellSize) {
                for (let y = gridPadding; y < height - gridPadding; y += cellSize) {
                    let centerOff = (cellSize - gridPadding) / 3;
                    // make the stroke color change based on the distance from the mouse to the point to draw
                    // if the mouse is close to the point, the stroke will be lighter (closer to white)
                    // if the mouse is far from the point, the stroke will be darker (closer to light gray)
                    // make the stroke slightly darker as y increases
                    p5.stroke(clamp(clamp(255 - distSquared(p5.mouseX, p5.mouseY, x, y) / 75, 80, 255) - y / 18, 20, 255));

                    // stroke(clamp(255 - dist(mouseX, mouseY, x, y), 80, 255));

                    // draw a point at each location
                    p5.point(x + centerOff, y);
                }
            }
        }

        function drawShapes() {
            p5.strokeWeight(0)
            // squares
            let responsiveSize = (width + height * 5) / 6;
            let squareDivisor = 12;
            let triDivisor = 12;
            let ptDivisor = 48;

            p5.rectMode(p5.CENTER);
            p5.fill("lime")
            drawSq(sq1Pos.x, sq1Pos.y, responsiveSize / squareDivisor, sq1T);
            p5.fill("purple")
            drawSq(sq2Pos.x, sq2Pos.y, responsiveSize / squareDivisor, sq2T);

            // triangles
            p5.fill("hotpink")
            drawTri(tri1Pos.x, tri1Pos.y, responsiveSize / triDivisor, tri1Rot);
            p5.fill("orange")
            drawTri(tri2Pos.x, tri2Pos.y, responsiveSize / triDivisor, tri2Rot);

            // // line
            // line(lineEnd1Pos.x, lineEnd1Pos.y, lineEnd2Pos.x, lineEnd2Pos.y);

            // points
            p5.stroke("red")
            p5.strokeWeight(responsiveSize / ptDivisor + (-Math.abs(sq1T / 360 - 0.5) + 0.5) * 6)
            p5.point(pt1Pos);

            p5.stroke("blue")
            p5.strokeWeight(responsiveSize / ptDivisor + (-Math.abs(sq2T / 360 - 0.5) + 0.5) * 4)
            p5.point(pt2Pos);

            p5.strokeWeight(0)
        }

        // { x: tri1InitPos.x, y: tri1InitPos.y },
        // tri1Pos,
        // { x: 0.01, y: 0.01}
        function updatePosRandomlySlowly(shapeOff, initPos, pos, speed) {
            // tri1xOff += 0.02;
            // tri1yOff += 0.01;
            // let tri1x = lerp(tri1Pos.x, tri1InitPos.x + noise(tri1xOff) * 100 - 50, 0.01);
            // let tri1y = lerp(tri1Pos.y, tri1InitPos.y + noise(tri1yOff) * 100 - 50, 0.01);
            // tri1Pos = createVector(tri1x, tri1y);

            shapeOff.x += speed.x;
            shapeOff.y += speed.y;
            let x = p5.lerp(pos.x, initPos.x + p5.noise(shapeOff.x) * 100 - 50, 0.01);
            let y = p5.lerp(pos.y, initPos.y + p5.noise(shapeOff.y) * 100 - 50, 0.01);
            pos.x = x;
            pos.y = y;
        }

        function updateShapeValues(p5) {
            tri1Rot += 0.0001
            tri2Rot -= 0.00015

            sq1T += 1
            sq1T %= 360

            sq2T -= 0.8
            if (sq2T < 0) sq2T = 360

            // lerp tri1pos around tri1InitPos randomly and slowly
            updatePosRandomlySlowly(
                { x: tri1xOff, y: tri1yOff },
                { x: tri1InitPos.x, y: tri1InitPos.y },
                { x: tri1Pos.x, y: tri1Pos.y },
                { x: 0.02, y: 0.01 });

            // lerp tri2pos around tri2InitPos randomly and slowly
            updatePosRandomlySlowly(
                { x: tri2xOff, y: tri2yOff },
                { x: tri2InitPos.x, y: tri2InitPos.y },
                { x: tri2Pos.x, y: tri2Pos.y },
                { x: 0.03, y: 0.02 });

            // lerp sq1pos around sq1InitPos randomly and slowly
            updatePosRandomlySlowly(
                { x: sq1xOff, y: sq1yOff },
                { x: sq1InitPos.x, y: sq1InitPos.y },
                { x: sq1Pos.x, y: sq1Pos.y },
                { x: 0.04, y: 0.02 });

            // lerp sq2pos around sq2InitPos randomly and slowly
            updatePosRandomlySlowly(
                { x: sq2xOff, y: sq2yOff },
                { x: sq2InitPos.x, y: sq2InitPos.y },
                { x: sq2Pos.x, y: sq2Pos.y },
                { x: 0.01, y: 0.01 });

        }

        p5.draw = () => {
            p5.background(20);

            drawGrid(p5);

            try {
                updateShapeValues(p5);
            } catch (error) {
                initShapePositions(p5);
            }

            drawShapes(p5);
        }

        p5.windowResized = () => {
            initShapePositions(p5);
            p5.resizeCanvas(width, height);
        }

    }

    return (
        <div ref={canvasParentRef}>
            <NextReactP5Wrapper sketch={sketch} />
        </div>
    )

}