const startYear = 1950,
    endYear = 2024,
    btn = document.getElementById('play-pause-button'),
    input = document.getElementById('play-range'),
    nbr = 50;

let dataset, chart;


/*
 * Animate dataLabels functionality
 */
(function (H) {
    const FLOAT = /^-?\d+\.?\d*$/;

    // Add animated textSetter, just like fill/strokeSetters
    H.Fx.prototype.textSetter = function () {
        const chart = H.charts[this.elem.renderer.chartIndex];

        let thousandsSep = chart.numberFormatter('1000.0')[1];

        if (/[0-9]/.test(thousandsSep)) {
            thousandsSep = ' ';
        }

        const replaceRegEx = new RegExp(thousandsSep, 'g');

        let startValue = this.start.replace(replaceRegEx, ''),
            endValue = this.end.replace(replaceRegEx, ''),
            currentValue = this.end.replace(replaceRegEx, '');

        if ((startValue || '').match(FLOAT)) {
            startValue = parseInt(startValue, 10);
            endValue = parseInt(endValue, 10);

            // No support for float
            currentValue = chart.numberFormatter(
                Math.round(startValue + (endValue - startValue) * this.pos),
                0
            );
        }

        this.elem.endText = this.end;

        this.elem.attr(this.prop, currentValue, null, true);
    };

    // Add textGetter, not supported at all at this moment:
    H.SVGElement.prototype.textGetter = function () {
        const ct = this.text.element.textContent || '';
        return this.endText ? this.endText : ct.substring(0, ct.length / 2);
    };

    // Temporary change label.attr() with label.animate():
    // In core it's simple change attr(...) => animate(...) for text prop
    H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
        const attr = H.SVGElement.prototype.attr,
            chart = this.chart;

        if (chart.sequenceTimer) {
            this.points.forEach(point =>
                (point.dataLabels || []).forEach(
                    label =>
                        (label.attr = function (hash) {
                            if (
                                hash &&
                                hash.text !== undefined &&
                                chart.isResizing === 0
                            ) {
                                const text = hash.text;

                                delete hash.text;

                                return this
                                    .attr(hash)
                                    .animate({ text });
                            }
                            return attr.apply(this, arguments);

                        })
                )
            );
        }

        const ret = proceed.apply(
            this,
            Array.prototype.slice.call(arguments, 1)
        );

        this.points.forEach(p =>
            (p.dataLabels || []).forEach(d => (d.attr = attr))
        );

        return ret;
    });
}(Highcharts));


function getData(year) {
    const output = Object.entries(dataset)
        .map(country => {
            const [countryName, countryData] = country;
            return [countryName, Number(countryData[year])];
        })
        .sort((a, b) => b[1] - a[1]);
    return [output[0], output.slice(1, nbr)];
}

function getSubtitle() {
    const population = (getData(input.value)[0][1] / 1000000000).toFixed(2);
    return `<span style="font-size: 80px">${input.value}</span>
        <br>
        <span style="font-size: 22px">
            Total: <b>: ${population}</b> billion
        </span>`;
}

(async () => {

    dataset = await fetch(
        'https://demo-live-data.highcharts.com/population.json'
    ).then(response => response.json());
 // 👇 Agregamos Colombia con datos desde 1960 a 2024
    dataset["Colombia"] = {
        "1950": 10000001,
        "1951": 10000002,
        "1952": 10000003,
        "1953": 10000004,
        "1954": 10000005,
        "1955": 10000006,
        "1956": 10000007,
        "1957": 10000008,
        "1958": 10000009,
        "1960": 16297000,
        "1961": 16721000,
        "1962": 17154000,
        "1963": 17596000,
        "1964": 18047000,
        "1965": 18507000,
        "1966": 18975000,
        "1967": 19451000,
        "1968": 19935000,
        "1969": 20428000,
        "1970": 20929000,
        "1971": 21439000,
        "1972": 21958000,
        "1973": 22486000,
        "1974": 23023000,
        "1975": 23569000,
        "1976": 24124000,
        "1977": 24688000,
        "1978": 25261000,
        "1979": 25844000,
        "1980": 26436000,
        "1981": 27038000,
        "1982": 27649000,
        "1983": 28270000,
        "1984": 28900000,
        "1985": 29540000,
        "1986": 30189000,
        "1987": 30847000,
        "1988": 31513000,
        "1989": 32188000,
        "1990": 32871000,
        "1991": 33563000,
        "1992": 34264000,
        "1993": 34973000,
        "1994": 35690000,
        "1995": 36415000,
        "1996": 37148000,
        "1997": 37889000,
        "1998": 38638000,
        "1999": 39395000,
        "2000": 40160000,
        "2001": 40932000,
        "2002": 41712000,
        "2003": 42500000,
        "2004": 43295000,
        "2005": 44098000,
        "2006": 44909000,
        "2007": 45728000,
        "2008": 46554000,
        "2009": 47387000,
        "2010": 48226000,
        "2011": 49070000,
        "2012": 49920000,
        "2013": 50775000,
        "2014": 51635000,
        "2015": 52500000,
        "2016": 53370000,
        "2017": 54244000,
        "2018": 55122000,
        "2019": 56003000,
        "2020": 56887000,
        "2021": 57773000,
        "2022": 58661000,
        "2023": 59550000,
        "2024": 60440000
    };

    chart = Highcharts.chart('container', {
        chart: {
            animation: {
                duration: 200
            },
            marginRight: 50
        },
        title: {
            text: 'World population by country',
            align: 'left'
        },
        subtitle: {
            text: getSubtitle(),
            floating: true,
            align: 'right',
            verticalAlign: 'middle',
            useHTML: true,
            y: -80,
            x: -100
        },

        legend: {
            enabled: false
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            title: {
                text: null
            }
        },
        plotOptions: {
            series: {
                animation: false,
                groupPadding: 0,
                pointPadding: 0.1,
                borderWidth: 0,
                colorByPoint: true,
                dataSorting: {
                    enabled: true,
                    matchByName: true
                },
                type: 'bar',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                type: 'bar',
                name: startYear,
                data: getData(startYear)[1]
            }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 550
                },
                chartOptions: {
                    xAxis: {
                        visible: false
                    },
                    subtitle: {
                        x: 0
                    },
                    plotOptions: {
                        series: {
                            dataLabels: [{
                                enabled: true,
                                y: 8
                            }, {
                                enabled: true,
                                format: '{point.name}',
                                y: -8,
                                style: {
                                    fontWeight: 'normal',
                                    opacity: 0.7
                                }
                            }]
                        }
                    }
                }
            }]
        }
    });
})();

/*
 * Pause the timeline, either when the range is ended, or when clicking the
 * pause button. Pausing stops the timer and resets the button to play mode.
 */
function pause(button) {
    button.title = 'play';
    button.className = 'fa fa-play';
    clearTimeout(chart.sequenceTimer);
    chart.sequenceTimer = undefined;
}

/*
 * Update the chart. This happens either on updating (moving) the range input,
 * or from a timer when the timeline is playing.
 */
function update(increment) {
    if (increment) {
        input.value = parseInt(input.value, 10) + increment;
    }
    if (input.value >= endYear) {
        // Auto-pause
        pause(btn);
    }

    chart.update(
        {
            subtitle: {
                text: getSubtitle()
            }
        },
        false,
        false,
        false
    );

    chart.series[0].update({
        name: input.value,
        data: getData(input.value)[1]
    });
}

/*
 * Play the timeline.
 */
function play(button) {
    button.title = 'pause';
    button.className = 'fa fa-pause';
    chart.sequenceTimer = setInterval(function () {
        update(1);
    }, 200);
}

btn.addEventListener('click', function () {
    if (chart.sequenceTimer) {
        pause(this);
    } else {
        play(this);
    }
});
/*
 * Trigger the update on the range bar click.
 */
input.addEventListener('click', function () {
    update();
});
