// &lt;?php //header('content-type: text/javascript');
// $defaultColor = '#0073a6';
// if (array_key_exists('defaultColor', $_GET)) {
//    if (preg_match('/^#?[a-f0-9]{6}$/iD', "{$_GET['defaultColor']}")) {
// $defaultColor = preg_replace('/^#?/i', '', "{$_GET['defaultColor']}");
// }} ?>
let bucketFillActivated = false, antiAliasing = false;

function bucketFillUpdate(self) {
    self.ariaPressed = String(bucketFillActivated);
}

function bucketFill(startX, startY, fillColor, tolerancePercent, growPixels = 0) {
    const imageData = ctx.getImageData(0, 0, ...canvasSize());
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    const startPos = (Math.floor(startY) * width + Math.floor(startX)) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    //const startA = data[startPos + 3];

    const fillRgb = hexToRgb(fillColor);
    if (!fillRgb) return;

    // If clicked on the same color (within tolerance), do nothing
    if (colorsAreSimilar(startR, startG, startB, fillRgb.r, fillRgb.g, fillRgb.b, 0)) {
        return;
    }

    // Convert tolerance percentage (0-100) to a value we can use for color comparison
    const tolerance = tolerancePercent * 2.55; // Convert % to 0-255 range

    const stack = [[Math.floor(startX), Math.floor(startY)]];
    const processed = new Set();
    const filledPixels = new Set();

    // First pass: fill all matching pixels
    while (stack.length) {
        const [x, y] = stack.pop();
        const pos = (y * width + x) * 4;

        // Skip if out of bounds or already processed
        if (x < 0 || x >= width || y < 0 || y >= height || processed.has(`${x},${y}`)) {
            continue;
        }

        processed.add(`${x},${y}`);

        const r = data[pos];
        const g = data[pos + 1];
        const b = data[pos + 2];
        //const a = data[pos + 3];

        // Check if current pixel color is within tolerance of the start color
        if (colorsAreSimilar(r, g, b, startR, startG, startB, tolerance)) {
            // Fill the pixel
            data[pos] = fillRgb.r;
            data[pos + 1] = fillRgb.g;
            data[pos + 2] = fillRgb.b;
            data[pos + 3] = 255;
            filledPixels.add(`${x},${y}`);

            // Add neighboring pixels to the stack
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }
    }

    // Second pass: grow the filled area if requested
    if (growPixels > 0) {
        const growQueue = Array.from(filledPixels).map(p => {
            const [x, y] = p.split(',').map(Number);
            return {x, y, distance: 0};
        });

        const grownPixels = new Set(filledPixels);

        while (growQueue.length) {
            const {x, y, distance} = growQueue.shift();

            if (distance >= growPixels) continue;

            // Check all 4 directions
            const directions = [
                {x: x + 1, y, distance: distance + 1},
                {x: x - 1, y, distance: distance + 1},
                {x, y: y + 1, distance: distance + 1},
                {x, y: y - 1, distance: distance + 1}
            ];

            for (const dir of directions) {
                const {x: nx, y: ny, distance: nd} = dir;
                const key = `${nx},${ny}`;

                // Skip if out of bounds or already grown
                if (nx < 0 || nx >= width || ny < 0 || ny >= height || grownPixels.has(key)) {
                    continue;
                }

                // Fill the pixel
                const pos = (ny * width + nx) * 4;
                data[pos] = fillRgb.r;
                data[pos + 1] = fillRgb.g;
                data[pos + 2] = fillRgb.b;
                data[pos + 3] = 255;

                grownPixels.add(key);
                growQueue.push({x: nx, y: ny, distance: nd});
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function colorsAreSimilar(r1, g1, b1, r2, g2, b2, tolerance) {
    // Calculate color distance (simple Euclidean distance in RGB space)
    const dr = r1 - r2;
    const dg = g1 - g2;
    const db = b1 - b2;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);

    return distance <= tolerance;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//
function downloadBlob(blob, filename) {
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.style.display = 'none';

    // Create an object URL from the blob
    const url = URL.createObjectURL(blob);

    // Set anchor attributes
    a.href = url;
    a.download = filename;

    // Append to body, click, and remove
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function download() {
    canvas.toBlob(function (blob) {
        if (blob === null) {
            window.alert('image couldnt be created');
            return;
        }
        downloadBlob(blob, Date());
    });
}

const canvas = document.getElementById('drawingCanvas'),
    colorPicker = document.getElementById('colorPicker'),
    bucketFillButton = document.getElementById('bucketFillButton'),
    Bucket_fillPercentage = document.getElementById('Bucket-fillPercentage'),
    // canvasComputedStyle = window.getComputedStyle(canvas),
    ctx = canvas.getContext('2d'), context = ctx;
Bucket_fillPercentage.value = '20';
ctx.imageSmoothingEnabled = antiAliasing;

// Set canvas dimensions
// canvas.width = window.innerWidth * 0.9;
// canvas.height = window.innerHeight * 0.8;

// canvas.width = (canvasComputedStyle.width).replace(/\.\d+/, '').replace(/\D+/, '');
// canvas.height = (canvasComputedStyle.height).replace(/\.\d+/, '').replace(/\D+/, '');

let isDrawing = false, lastX = 0, lastY = 0;

// Set default drawing color
let currentColor = colorPicker.value;

// Update color on change
const updateColor = function () {
    const {value} = this;
    if (!/^#[a-fA-F0-9]{6}$/.test(value)) {
        console.error(value, 'is not this');
        return;
    }
    currentColor = value;
}, canvasSize = function () {
    return [Number(canvas.width), Number(canvas.height)];
};
colorPicker.addEventListener('newColorSelected', updateColor);

// Start drawing
function startDrawing(e) {
    if (bucketFillActivated) {
        bucketFillActivated = false;
        bucketFillUpdate(bucketFillButton);
        const [x, y] = getXY(e);
        bucketFill(x, y, currentColor, Number(Bucket_fillPercentage.value), 2);
        return;
    }
    isDrawing = true;
    const [x, y] = getXY(e);
    lastX = x;
    lastY = y;
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Draw on the canvas
function draw(e) {
    if (!isDrawing) return;

    const [x, y] = getXY(e);
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

// Get touch or mouse coordinates
function getXY(e) {
    const {x, y} = getRelativePointerPosition(e, canvas);
    if (!antiAliasing) {
        return [Math.floor(x), Math.floor(y)];
    }
    return [x, y];
}

function getRelativePointerPosition(event, element) {
    const rect = element.getBoundingClientRect();
    let clientX, clientY;

    // Check if it's a touch event
    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else if (event.clientX !== undefined) {
        // Check if it's a mouse event
        clientX = event.clientX;
        clientY = event.clientY;
    } else {
        // Fallback (could be a PointerEvent)
        clientX = event.clientX;
        clientY = event.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return {x, y};
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
document.querySelector('link[href^=\'canvasDimesnions.css\']').remove();
// window.addEventListener('scroll',function(){});
