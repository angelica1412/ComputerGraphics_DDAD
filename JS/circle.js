const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

function drawGrid() {
    const gridSize = 20; // Ukuran kotak grid
    ctx.strokeStyle = "#ddd"; // Warna garis grid
    ctx.lineWidth = 0.5; // Ketebalan garis grid

    // Menggambar garis vertikal
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Menggambar garis horizontal
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Menambahkan garis sumbu X dan Y pada titik pusat
    ctx.strokeStyle = "#000"; // Warna garis sumbu
    ctx.lineWidth = 0.5; // Ketebalan garis sumbu

    // Garis sumbu Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Garis sumbu X
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function drawPixel(x, y) {
    ctx.fillRect(x + canvas.width / 2, canvas.height / 2 - y, 1, 1);
    document.getElementById("circleCanvas").style.display = "block";
}

function drawSymmetricPoints(xCenter, yCenter, x, y) {
    drawPixel(xCenter + x, yCenter + y);
    drawPixel(xCenter - x, yCenter + y);
    drawPixel(xCenter + x, yCenter - y);
    drawPixel(xCenter - x, yCenter - y);
    drawPixel(xCenter + y, yCenter + x);
    drawPixel(xCenter - y, yCenter + x);
    drawPixel(xCenter + y, yCenter - x);
    drawPixel(xCenter - y, yCenter - x);
}

function drawBresenhamCircle(xCenter, yCenter, radius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Menggambar grid sebelum menggambar lingkaran
    
    let x = 0;
    let y = radius;
    let p = 1 - radius;

    drawSymmetricPoints(xCenter, yCenter, x, y);

    while (x < y) {
        x++;
        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
        drawSymmetricPoints(xCenter, yCenter, x, y);
    }

    // Tambahkan titik merah sebagai penanda titik pusat dengan ukuran yang lebih kecil
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + xCenter, canvas.height / 2 - yCenter, 3, 0, 2 * Math.PI); // Ukuran titik pusat diubah menjadi 3
    ctx.fill();

    // Tambahkan teks untuk koordinat (xCenter, yCenter)
    ctx.font = '12px Arial';
    ctx.fillText(`(${xCenter}, ${yCenter})`, canvas.width / 2 + xCenter, canvas.height / 2 - yCenter - 10);
}

function drawCircle() {
    const xCenter = parseInt(document.getElementById('xCenter').value);
    const yCenter = parseInt(document.getElementById('yCenter').value);
    const radius = parseInt(document.getElementById('radius').value);

    if (isNaN(xCenter) || isNaN(yCenter) || isNaN(radius) || radius < 1) {
        alert('Mohon masukkan nilai yang valid. Radius harus lebih besar dari 0.');
        return;
    }

    drawBresenhamCircle(xCenter, yCenter, radius);
}

function clearInputs() {
    document.getElementById("xCenter").value = '';
    document.getElementById("yCenter").value = '';
    document.getElementById("radius").value = '';

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus konten canvas
    document.getElementById("circleCanvas").style.display = "none"; // Menyembunyikan canvas
}
