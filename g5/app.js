var isDragging = false;
var startX = 0;
var startY = 0;
var chartAlpha = 45; // Valor inicial de alpha
var chartBeta = 35;  // Valor inicial de beta
const rotationSpeed = 0.5; // Ajusta este valor para hacer la rotación más o menos sensible

// --- EVENTO GLOBAL: Se ejecuta al soltar el clic ---
// Debe estar fuera de la configuración de Highcharts y en el documento.
document.addEventListener('mouseup', function() {
    isDragging = false;
});

chartConfig= {
    chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: chartAlpha,
            beta: chartBeta,
            depth: 50,
            viewDistance: 25
        },

        
    },
    // ... el resto de tus opciones ...        
    
    title: {
        text: 'Numero de casos confirmados'
    },
    subtitle: {
        text: 'Fuente: ' +
            '<a href="https://www.fhi.no/en/id/infectious-diseases/coronavirus/daily-reports/daily-reports-COVID19/"' +
            'target="_blank">FHI</a>'
    },
    xAxis: {
        categories: [
            '0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70',
            '71-80', '81-90', '91+'
        ],
        title: {
            text: 'Grupos de edades'
        },
        labels: {
            skew3d: true
        }
    },
    yAxis: {
        title: {
            margin: 20,
            text: 'Casos reportados'
        },
        labels: {
            skew3d: true
        }
    },
    tooltip: {
        headerFormat: '<b>Edad: {category}</b><br>'
    },
    plotOptions: {
        series: {
            depth: 25,
            colorByPoint: true
        }
    },
    series: [{
        data: [
            95321, 169339, 121105, 136046, 106800, 58041, 26766, 14291,
            7065, 3283
        ],
        name: 'Casos',
        showInLegend: false
    }]
};



const myChart = Highcharts.chart('container', chartConfig);

const chartContainer = myChart.container; 


document.addEventListener('pointerup', function() {
    if (isDragging) {
        isDragging = false;
        console.log('mouseup: Arrastre detenido.');
        myChart.update({
            chart: {
                options3d: {
                    alpha: chartAlpha,
                    beta: chartBeta
                }
            }
        }, true);
    }
    console.log('mouseup: Arrastre detenido.');
});

// 4. Adjuntar MOUSE DOWN directamente al contenedor del gráfico
chartContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    
    // Usamos e.clientX/Y (coordenadas de la ventana) para evitar problemas de offset
    startX = e.clientX;
    startY = e.clientY;
    
    e.preventDefault(); 
    if (isDragging){
        console.log('mousedown activo y dragging.');
    }
    else console.log('mousedown activo ');
});

// 5. Adjuntar MOUSE MOVE al DOCUMENT (para capturar arrastres fuera del gráfico)
document.addEventListener('mousemove', function(e) {
    
    if (isDragging) {
        let deltaX = e.clientX - startX;
        let deltaY = e.clientY - startY;

        // Lógica de Rotación 3D
        chartBeta += deltaX * rotationSpeed;
        chartAlpha -= deltaY * rotationSpeed; // Negativo para rotación intuitiva
        chartAlpha = Math.max(0, Math.min(90, chartAlpha)); 
        
        
        
        // Actualizar la posición de inicio para el arrastre continuo
        startX = e.clientX;
        startY = e.clientY;
        console.log('mousemove activo.');
    }
    //console.log('mousemove activo.');
});

// 6. Adjuntar MOUSE UP al DOCUMENT (para detener el arrastre)
