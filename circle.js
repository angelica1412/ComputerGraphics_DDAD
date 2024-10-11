let ctx = document.getElementById('graphCanvas').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Lingkaran',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    }
});

function calculateUsingBresenhamCircle() {
    let canvas = document.getElementById('graphCanvasCircle');
    if (!canvas.getContext) {
        alert('Canvas tidak didukung oleh browser Anda, silakan gunakan browser yang mendukung HTML5.');
        return;
    }
    let ctx = canvas.getContext('2d');
    let xCenter = parseInt(document.getElementById("xCenter").value);
    let yCenter = parseInt(document.getElementById("yCenter").value);
    let radius = parseInt(document.getElementById("radius").value);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas

    let x = 0;
    let y = radius;
    let p = 3 - 2 * radius;

    drawCirclePoints(ctx, xCenter, yCenter, x, y); // Gambar titik awal

    while (x < y) {
        if (p < 0) {
            p = p + 4 * x + 6;
        } else {
            p = p + 4 * (x - y) + 10;
            y--;
        }
        x++;
        drawCirclePoints(ctx, xCenter, yCenter, x, y);
    }
}

function drawCirclePoints(ctx, xCenter, yCenter, x, y) {
    let pointSize = 3; // Ukuran titik
    ctx.fillStyle = '#0000FF'; // Warna titik
    // Gambar semua titik simetris
    ctx.fillRect(xCenter + x, yCenter + y, pointSize, pointSize);
    ctx.fillRect(xCenter - x, yCenter + y, pointSize, pointSize);
    ctx.fillRect(xCenter + x, yCenter - y, pointSize, pointSize);
    ctx.fillRect(xCenter - x, yCenter - y, pointSize, pointSize);
    ctx.fillRect(xCenter + y, yCenter + x, pointSize, pointSize);
    ctx.fillRect(xCenter - y, yCenter + x, pointSize, pointSize);
    ctx.fillRect(xCenter + y, yCenter - x, pointSize, pointSize);
    ctx.fillRect(xCenter - y, yCenter - x, pointSize, pointSize);
}

function plotCirclePoints(xCenter, yCenter, x, y) {
    let points = [
        {x: xCenter + x, y: yCenter + y},
        {x: xCenter - x, y: yCenter + y},
        {x: xCenter + x, y: yCenter - y},
        {x: xCenter - x, y: yCenter - y},
        {x: xCenter + y, y: yCenter + x},
        {x: xCenter - y, y: yCenter + x},
        {x: xCenter + y, y: yCenter - x},
        {x: xCenter - y, y: yCenter - x}
    ];

    points.forEach(point => {
        chart.data.labels.push(point.x);
        chart.data.datasets[0].data.push(point.y);
    });
}