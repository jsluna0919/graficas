Highcharts.chart('container', {
    chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 25,
            depth: 50,
            viewDistance: 25
        }
    },
    title: {
        text: 'Number of confirmed COVID-19'
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://www.fhi.no/en/id/infectious-diseases/coronavirus/daily-reports/daily-reports-COVID19/"' +
            'target="_blank">FHI</a>'
    },
    xAxis: {
        categories: [
            '0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70',
            '70-79', '80-89', '90+'
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
            text: 'Casos Reportados'
        },
        labels: {
            skew3d: true
        }
    },
    tooltip: {
        headerFormat: '<b>Age: {category}</b><br>'
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
        name: 'Cases',
        showInLegend: false
    }]
});
