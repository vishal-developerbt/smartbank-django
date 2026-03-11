/*! dashboard.js | Wealthuiux 2025-2026 */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* circular progress */
    var progressCircles1 = new ProgressBar.Circle(circleprogressblue, {
        color: '#0249e8',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 10,
        trailWidth: 10,
        easing: 'easeInOut',
        trailColor: 'rgba(0, 73, 232, 0.15)',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#0249e8', width: 10 },
        to: { color: '#0249e8', width: 10 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                //  circle.setText('');
            } else {
                // circle.setText(value + "<small>%<small>");
            }

        }
    });
    // progressCircles2.text.style.fontSize = '20px';
    progressCircles1.animate(0.65);  // Number from 0.0 to 1.0

    var progressCircles2 = new ProgressBar.Circle(circleprogressyellow, {
        color: '#fcab16',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 10,
        trailWidth: 10,
        easing: 'easeInOut',
        trailColor: 'rgba(241, 157, 0, 0.3)',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#fcab16', width: 10 },
        to: { color: '#fcab16', width: 10 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                //  circle.setText('');
            } else {
                // circle.setText(value + "<small>%<small>");
            }

        }
    });
    // progressCircles2.text.style.fontSize = '20px';
    progressCircles2.animate(0.85);  // Number from 0.0 to 1.0

    var progressCircles3 = new ProgressBar.Circle(circleprogressred, {
        color: '#c80036',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 10,
        trailWidth: 10,
        easing: 'easeInOut',
        trailColor: 'rgba(200, 0, 54, 0.2)',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#c80036', width: 10 },
        to: { color: '#c80036', width: 10 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                //  circle.setText('');
            } else {
                // circle.setText(value + "<small>%<small>");
            }

        }
    });
    // progressCircles2.text.style.fontSize = '20px';
    progressCircles3.animate(0.45);  // Number from 0.0 to 1.0



    /* chart js areachart summary  */
    window.randomScalingFactor = function () {
        return Math.round(Math.random() * 20);
    }
    var areachart2 = document.getElementById('smallchart2').getContext('2d');
    var gradient2 = areachart2.createLinearGradient(0, 0, 0, 90);
    gradient2.addColorStop(0, 'rgba(77, 16, 242, 0.75)');
    gradient2.addColorStop(0.45, 'rgba(16, 57, 242, 0.5)');
    gradient2.addColorStop(1, 'rgba(16, 129, 242, 0)');
    var myareachartCofig2 = {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '7', '8'],
            datasets: [{
                label: '# of Votes',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                radius: 0,
                backgroundColor: gradient2,
                borderColor: 'rgb(77, 16, 242)',
                borderWidth: 1,
                fill: true,
                tension: 0,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                },
                x: {
                    display: false,
                }
            }
        }
    }
    var myAreaChart2 = new Chart(areachart2, myareachartCofig2);
    /* my area chart randomize */
    setInterval(function () {
        myareachartCofig2.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        myAreaChart2.update();
    }, 1000);


    // Color definitions
    const MAIN_COLOR = 'rgba(77, 16, 242, 1)';
    const DEPOSIT_COLOR = 'rgba(16, 27, 242, 0.6)';
    const INVESTMENT_COLOR = 'rgba(16, 140, 242, 0.6)';
    const GROWTH_LINE_COLOR = 'rgba(32, 190, 0, 1)';


    const ctx = document.getElementById('performance-chart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Investment',
                    data: [500, 600, 700, 800, 900, 1000],
                    backgroundColor: INVESTMENT_COLOR,
                    borderColor: INVESTMENT_COLOR.replace('0.6', '1'),
                    borderWidth: 0,
                    borderRadius: 6,
                    stack: 'combined-bar',
                    yAxisID: 'yBar',
                    barThickness: 30,
                },
                {
                    type: 'bar',
                    label: 'Deposit',
                    data: [1000, 1200, 1500, 1100, 1300, 1600],
                    backgroundColor: DEPOSIT_COLOR,
                    borderColor: DEPOSIT_COLOR.replace('0.6', '1'),
                    borderWidth: 0,
                    borderRadius: 6,
                    stack: 'combined-bar',
                    yAxisID: 'yBar',
                    barThickness: 30,
                },
                {
                    type: 'line',
                    label: 'Total Portfolio Value',
                    data: [1600, 2000, 2500, 2800, 3200, 4000],
                    borderColor: GROWTH_LINE_COLOR,
                    backgroundColor: 'transparent',
                    pointRadius: 4,
                    pointBackgroundColor: GROWTH_LINE_COLOR,
                    tension: 0.2,
                    fill: false,
                    yAxisID: 'yLine'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                    }
                },
                title: {
                    display: false,
                    text: 'Monthly Capital Contribution & Total Portfolio Growth',
                    color: '#1f2937',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: 'Month',
                        color: '#4b5563'
                    },
                },
                yBar: {
                    position: 'left',
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Capital Contribution ($)',
                        color: MAIN_COLOR
                    },
                    ticks: {
                        color: MAIN_COLOR,
                        callback: (value) => '$' + value
                    }
                },
                yLine: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    title: {
                        display: true,
                        text: 'Total Portfolio Value ($)',
                        color: GROWTH_LINE_COLOR
                    },
                    ticks: {
                        color: GROWTH_LINE_COLOR,
                        callback: (value) => '$' + value
                    },
                    min: 0
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
        }
    });

    /* area chart green medium size */
    var areachartmediumgreen = document.getElementById('mediumchartgreen1').getContext('2d');
    var gradientmediumgreen = areachartmediumgreen.createLinearGradient(0, 0, 0, 150);
    gradientmediumgreen.addColorStop(0, 'rgba(8, 160, 70, 0.85)');
    gradientmediumgreen.addColorStop(1, 'rgba(8, 160, 70, 0)');
    var myareachartmediumgreenConfig = {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: '# of Votes',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                radius: 0,
                backgroundColor: gradientmediumgreen,
                borderColor: '#08a046',
                borderWidth: 1,
                fill: true,
                tension: 0.5,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: '#999999'
                    },
                    display: true,
                    beginAtZero: true,
                    grid: {
                        display: false,
                        zeroLineColor: 'rgba(0,0,0,0.3)',
                        drawBorder: true,
                        lineWidth: 1,
                        zeroLineWidth: 1
                    }
                },
                x: {
                    ticks: {
                        color: '#999999'
                    },
                    display: true,
                    grid: {
                        display: false,
                        zeroLineColor: 'rgba(0,0,0,0.3)',
                        drawBorder: true,
                        lineWidth: 1,
                        zeroLineWidth: 1
                    }
                }
            }
        }
    }
    var myAreaChartmediumgreen = new Chart(areachartmediumgreen, myareachartmediumgreenConfig);
    /* my area chart randomize */
    setInterval(function () {
        myareachartmediumgreenConfig.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        myAreaChartmediumgreen.update();
    }, 1500);

    /* area chart red medium size */
    var areachartmediumred = document.getElementById('mediumchartred1').getContext('2d');
    var gradientmediumred = areachartmediumred.createLinearGradient(0, 0, 0, 150);
    gradientmediumred.addColorStop(0, 'rgba(200, 0, 54, 0.85)');
    gradientmediumred.addColorStop(1, 'rgba(200, 0, 54, 0)');
    var myareachartmediumredConfig = {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: '# of Votes',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                radius: 0,
                backgroundColor: gradientmediumred,
                borderColor: '#c80036',
                borderWidth: 1,
                fill: true,
                tension: 0.5,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: '#999999'
                    },
                    display: true,
                    beginAtZero: true,
                    grid: {
                        display: false,
                        zeroLineColor: 'rgba(0,0,0,0.3)',
                        drawBorder: true,
                        lineWidth: 1,
                        zeroLineWidth: 1
                    }
                },
                x: {
                    ticks: {
                        color: '#999999'
                    },
                    display: true,
                    grid: {
                        display: false,
                        zeroLineColor: 'rgba(0,0,0,0.3)',
                        drawBorder: true,
                        lineWidth: 1,
                        zeroLineWidth: 1
                    }
                }
            }
        }
    }
    var myAreaChartmediumred = new Chart(areachartmediumred, myareachartmediumredConfig);
    /* my area chart randomize */
    setInterval(function () {
        myareachartmediumredConfig.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        myAreaChartmediumred.update();
    }, 1500);

    /* doughnut chart js */
    var doughnutchart = document.getElementById('doughnutchart').getContext('2d');
    var data = {
        labels: ['Food', 'Transport', 'Children', 'Home', 'Other'],
        datasets: [
            {
                label: 'Expense categories',
                data: [40, 10, 15, 25, 10],
                backgroundColor: ['#fcab16', '#08a046', '#c80036', '#0249e8', '#becede'],
                borderWidth: 0,
            }
        ]
    };
    var mydoughnutchartCofig = {
        type: 'doughnut',
        data: data,

        options: {
            responsive: true,
            cutout: 62,
            tooltips: {
                position: 'nearest',
                yAlign: 'bottom'
            },
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Chart.js Doughnut Chart'
                }
            }
        },
    };
    var mydoughnutchart = new Chart(doughnutchart, mydoughnutchartCofig);

    // toast message
    const toastLiveExample1 = document.getElementById('liveToast1')
    const toastBootstrap1 = bootstrap.Toast.getOrCreateInstance(toastLiveExample1)

    const toastLiveExample2 = document.getElementById('liveToast2')
    const toastBootstrap2 = bootstrap.Toast.getOrCreateInstance(toastLiveExample2)
    setTimeout(function () {
        toastBootstrap1.show()
    }, 1500);

    setTimeout(function () {
        toastBootstrap2.show()
    }, 5000);

})