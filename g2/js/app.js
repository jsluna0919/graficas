Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Registro vacunacion anual segun el ICA'
    },
    subtitle: {
        text: 'Source: <a ' +
            'href="https://www.ica.gov.co/areas/pecuaria/servicios/epidemiologia-veterinaria/censos-2016/censo-2018"' +
            'target="_blank">ica.gov.co</a>'
    },
    xAxis: {
        categories: ['Antioquia', 'Cordoba', 'Meta', 'Casanare'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: 'var(--highcharts-background-color, #ffffff)',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Año 2020',
        data: [3179957, 2133853, 2164484, 2141435]
    }, {
        name: 'Año 2021',
        data: [3314120, 2458740, 2416700, 2404970]
    }, {
        name: 'Año 2022',
        data: [3424088, 2505772, 2457770, 2441250]
    },{
        name: 'Año 2023',
        data: [3565340, 2624043, 2569880, 2531025]
    },{
        name: 'Año 2024',
        data: [3500000, 2600000, 2550000, 2500000]
    }]
});