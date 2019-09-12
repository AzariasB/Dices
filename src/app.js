import './less/style.less'

import { toDiceFaces, drawDiceFace, DICE_SIDE } from './DiceTransformer';


const SIDE_1 = 100;
const SIDE_2 = 150;

document.addEventListener('DOMContentLoaded', (ev) => init());

/**
 * 
 * @param {CanvasRenderingContext2D} target 
 * @param {Array<number>} diceData 
 * @param {number} width 
 * @param {number} height 
 */
function drawDices(target, diceData, width) {
    let y = 0, x = 0;
    for (let i = 0; i < diceData.length; ++i) {
        for (x = 0; x < width - 1; ++x) {
            ++i;
            drawDiceFace(target, x * DICE_SIDE, y, diceData[i]);
        }
        y += DICE_SIDE;
    }
}

function toRatio(width, height) {
    if (width > height) {
        return width / SIDE_2;
    }
    return height / SIDE_2;

}

/**
 * 
 * @param {HTMLCanvasElement} canvas canvas
 */
function downloadImage(canvas) {
    let link = document.createElement('a');
    link.download = 'dices.png';
    canvas.toBlob(b => {
        link.href = URL.createObjectURL(b);
        link.click();
        requestAnimationFrame(() => {
            URL.revokeObjectURL(a.href);
        })
        link.removeAttribute('href');
    })
}

function init() {
    let canvas = document.getElementById('baseCanvas');
    let target = document.getElementById('downloadCanvas');
    let ctx = canvas.getContext('2d');

    let img = new Image;

    img.addEventListener('load', function () {
        let r = toRatio(img.width, img.height);
        let width = Math.floor(img.width / r);
        let height = Math.floor(img.height / r);
        target.width = DICE_SIDE * (canvas.width = width);
        target.height = DICE_SIDE * (canvas.height = height);
        ctx.drawImage(img, 0, 0, width, height);
        let data = ctx.getImageData(0, 0, width, height);
        drawDices(target.getContext('2d'), toDiceFaces(data), width);
        downloadImage(target);
    });

    document.getElementById("FileAttachment").addEventListener('change', function (ev) {
        document.getElementById("fileuploadurl").value = this.value.replace(/C:\\fakepath\\/i, '');
        img.src = URL.createObjectURL(ev.target.files[0]);
    });
}
