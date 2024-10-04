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

    // Periksa apakah semua input memiliki nilai
    if (x1 !== '' && y1 !== '' && x2 !== '' && y2 !== '') {
        document.getElementById("calculateDDA").disabled = false;  // Aktifkan tombol DDA
        document.getElementById("calculateLine").disabled = false;  // Aktifkan tombol Basic Line
    } else {
        document.getElementById("calculateDDA").disabled = true;   // Nonaktifkan tombol DDA
        document.getElementById("calculateLine").disabled = true;  // Nonaktifkan tombol Basic Line
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
    document.getElementById("graphCanvas").style.display = "none";
}