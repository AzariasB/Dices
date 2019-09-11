

/**
 * 
 * @param {ImageData} colorInput color pixels
 * @returns {Array<number>}
 */
export function toDiceFaces(colorInput) {
    let out = [];

    let min = Infinity;
    let max = - Infinity;

    let size = colorInput.width * colorInput.height * 4;
    let data = colorInput.data;
    for (let i = 0; i < size; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        let res = Math.floor(((avg / 256)) * 6 + 1);
        out.push(res);
        max = Math.max(res, max);
        min = Math.min(res, min);
    }

    console.log(max, min);
    return out;
}



/**
 * 
 * @param {CanvasRenderingContext2D} ctxTarget targetContexte
 * @param {number} x x position
 * @param {number} y y position
 * @param {number} face number of the face to draw
 */
export function drawDiceFace(ctxTarget, x, y, face) {

}