import ColorThief from 'colorthief';
import path from 'path';

// Since we are in a node environment, we need to adapt or use a library that works with node.
// 'colorthief' usually works in browser. 'colorthief-node' or similar might be better, or just 'get-pixels'.
// Let's try 'colorthief' package if it supports node, otherwise 'node-vibrant'.
// Actually, 'colorthief' is often browser only. 'node-vibrant' is good.
// Or 'sharp'.

// Let's try to use a simple approach with 'jimp' which is pure JS and easy to install.
import Jimp from 'jimp';

async function main() {
    try {
        const image = await Jimp.read('public/riw-logo.png');

        // Simple dominant color approach: resize to 1x1? No, let's scan.
        // Or scan center.

        const width = image.bitmap.width;
        const height = image.bitmap.height;

        const colors = {};

        image.scan(0, 0, width, height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            const a = this.bitmap.data[idx + 3];

            if (a < 128) return; // Skip transparent

            // Quantize slightly to group similar colors
            const rQ = Math.round(r / 10) * 10;
            const gQ = Math.round(g / 10) * 10;
            const bQ = Math.round(b / 10) * 10;

            const key = `${rQ},${gQ},${bQ}`;
            colors[key] = (colors[key] || 0) + 1;
        });

        // Sort by frequency
        const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);

        console.log("Top Colors:");
        sortedColors.slice(0, 5).forEach(([key, count]) => {
            const [r, g, b] = key.split(',').map(Number);
            const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
            console.log(`${hex} (Count: ${count})`);
        });

    } catch (err) {
        console.error(err);
    }
}

main();
