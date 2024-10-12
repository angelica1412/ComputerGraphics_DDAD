let ctx = document.getElementById('graphCanvas').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // x values
        datasets: [{
            label: 'Line Graph',
            data: [], // y values
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'X' } },
            y: { title: { display: true, text: 'Y' } }
        }
    }
});

function validateInputs() {
    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;

    if (x1 !== '' && y1 !== '' && x2 !== '' && y2 !== '') {
        document.getElementById("calculateDDA").disabled = false;
        document.getElementById("calculateLine").disabled = false;
        document.getElementById("calculateBresenhamLine").disabled = false; // Correct ID
    } else {
        document.getElementById("calculateDDA").disabled = true;
        document.getElementById("calculateLine").disabled = true;
        document.getElementById("calculateBresenhamLine").disabled = true; // Correct ID
    }
}


function calculateUsingLineEquation() {
    document.querySelector('h1').innerText = 'Algoritma Dasar';
    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;

    // Validasi apakah semua input terisi
    if (x1 === '' || y1 === '' || x2 === '' || y2 === '') {
        alert("Harap mengisi semua kolom input sebelum melanjutkan.");
        return;  // Stop the function from proceeding further
    }

    // Konversi input menjadi angka setelah validasi
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);

    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;
    let dx = 1;

    // Clear previous data
    clearTableAndGraph();

    for (let x = x1; x <= x2; x += dx) {
        let y = m * x + b;
        addRowToTable(x, dx, x + dx, b, m, y);
        addPointToGraph(x, y);
    }

    chart.update();

    // Tampilkan tabel hasil perhitungan
    document.getElementById("resultTable").style.display = "table";
    document.getElementById("graphCanvas").style.display = "block";
    document.getElementById("resultTableDDA").style.display = "none";
    document.getElementById("resultTableBresenhamLine").style.display = "none";
}

function calculateUsingDDA() {
    document.querySelector('h1').innerText = 'Algoritma DDA (Digital Differential Analyzer)';
    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;

    // Validasi apakah semua input terisi
    if (x1 === '' || y1 === '' || x2 === '' || y2 === '') {
        alert("Harap mengisi semua kolom input sebelum melanjutkan.");
        return;  // Stop the function from proceeding further
    }

    // Konversi input menjadi angka setelah validasi
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    // Clear previous data from the DDA table
    let tableDDA = document.getElementById("resultTableDDA").getElementsByTagName('tbody')[0];
    tableDDA.innerHTML = ''; // Clear previous rows

    // Clear graph data before starting
    clearTableAndGraph(); // Call the function to clear previous data

    // Loop through each step and calculate the x, y values
    for (let k = 0; k <= steps; k++) {
        let roundedX = Math.round(x);
        let roundedY = Math.round(y);

        let newRow = tableDDA.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.innerHTML = k;
        cell2.innerHTML = x.toFixed(2);
        cell3.innerHTML = y.toFixed(2);
        cell4.innerHTML = `(${roundedX}, ${roundedY})`;

        // Tambahkan titik ke grafik
        addPointToGraph(roundedX, roundedY);

        x += xIncrement;
        y += yIncrement;
    }

    // Update grafik setelah menambahkan semua titik
    chart.update();

    // Show the DDA result table
    document.getElementById("resultTableDDA").style.display = "table";
    document.getElementById("graphCanvas").style.display = "block";
    document.getElementById("resultTable").style.display = "none";
    document.getElementById("resultTableBresenhamLine").style.display = "none";
}

function calculateUsingBresenhamLine() {
    document.querySelector('h1').innerText = 'Bresenham Line Equation';
    let x0 = parseInt(document.getElementById("x1").value);
    let y0 = parseInt(document.getElementById("y1").value);
    let x1 = parseInt(document.getElementById("x2").value);
    let y1 = parseInt(document.getElementById("y2").value);

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let p = 2 * dy - dx; // p0 atau p awal
    let twoDy = 2 * dy;
    let twoDyDx = 2 * (dy - dx);

    let x, y, xEnd;

    if (x0 > x1) {
        x = x1;
        y = y1;
        xEnd = x0;
    } else {
        x = x0;
        y = y0;
        xEnd = x1;
    }

    // Bersihkan tabel Bresenham sebelum menambahkan titik baru
    let tableBresenham = document.getElementById("resultTableBresenhamLine").getElementsByTagName('tbody')[0];
    tableBresenham.innerHTML = ''; // Clear previous rows

   // Clear graph
    chart.data.labels = [];
    chart.data.datasets[0].data = [];

    // Inisialisasi tabel dengan titik awal
    displayPoint(-1, '', x, y); // Baris pertama tanpa k dan p

    let k = 0;
    displayPoint(k, p, x, y); // Menampilkan p0 pada baris kedua
    k++;
    while (x < xEnd) {
        x++;
        if (p < 0) {
            p += twoDy;
        } else {
            y++;
            p += twoDyDx;
        }
        displayPoint(k, p, x, y);
        k++;
    }
    chart.update();

    document.getElementById("graphCanvas").style.display = "block";
    document.getElementById("resultTable").style.display = "none";
    document.getElementById("resultTableDDA").style.display = "none";
}

function displayPoint(k, p, x, y) {
    let table = document.getElementById("resultTableBresenhamLine");
    let tableBody = table.getElementsByTagName('tbody')[0];
    let row = tableBody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = k >= 0 ? k : ''; // Tidak menampilkan k untuk baris pertama
    cell2.innerHTML = k >= 0 ? p : ''; // Tidak menampilkan p untuk baris pertama
    cell3.innerHTML = x;
    cell4.innerHTML = y;
    cell5.innerHTML = `(${Math.round(x)}, ${Math.round(y)})`; // Format yang benar untuk koordinat

    table.style.display = "table";
    addPointToGraph(Math.round(x), Math.round(y)); // Tambahkan titik ke grafik
}

function addRowToTable(x, dx, xPlusDx, yb, m, y) {
    let table = document.getElementById("resultTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.innerHTML = x;
    cell2.innerHTML = dx;
    cell3.innerHTML = xPlusDx;
    cell4.innerHTML = yb;
    cell5.innerHTML = m;
    cell6.innerHTML = y;
}

function addPointToGraph(x, y) {
    chart.data.labels.push(x);
    chart.data.datasets[0].data.push(y);
}

function clearTableAndGraph() {
    // Clear table
    let table = document.getElementById("resultTable").getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    // Clear graph
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
}

function clearInputs() {
    document.getElementById("x1").value = '';
    document.getElementById("y1").value = '';
    document.getElementById("x2").value = '';
    document.getElementById("y2").value = '';

    // Clear table and graph as well
    clearTableAndGraph();
    chart.update();

    // Sembunyikan tabel saat tombol Clear diklik
    document.getElementById("resultTable").style.display = "none";
    document.getElementById("resultTableDDA").style.display = "none";
    document.getElementById("resultTableBresenhamLine").style.display = "none";
    document.getElementById("graphCanvas").style.display = "none";
}