//import { Chart } from './frappe-charts/dist/frappe-charts.min.esm';

const submitBtn = document.getElementById("submit-data")
const input = document.getElementById("input-area")
const estimateBtn = document.getElementById("add-data")

submitBtn.addEventListener("click", updateChart)
estimateBtn.addEventListener("click", addEstimatedData)

var chartElement
var yearCounter = 2022

const jsonQuerry = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    "SSS"
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

const getData = async (body) => {
    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px'
    const promiseJSON = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(body)
    })
    if(!promiseJSON.ok) {
        return;
    }
    const dataJSON = await promiseJSON.json()
    //console.log(dataJSON);
    return dataJSON
}

const buildChart = async (body) => {
    const data = await getData(body)
    //console.log(data)

    const area = Object.values(data.dimension.Alue.category.label)
    const yearLabels = Object.values(data.dimension.Vuosi.category.label)
    const values = data.value
    const array = [{name: area, values: values}]

    // console.log(area)
    // console.log(yearLabels)
    // console.log(values)

    const chartData = {
        labels: yearLabels,
        datasets: array
    }

    const chart = new frappe.Chart("#chart", {
        title: area + ":",
        data: chartData,
        type: "line",
        height: 450,
        colors: ['#eb5146']
    })
    chartElement = chart
}

async function updateChart() {
    event.preventDefault();
    const newInput = input.value
    //console.log(newInput)

    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px'
    const promiseJSON = await fetch(url)
    if(!promiseJSON.ok) {
        return;
    }
    const dataJSON = await promiseJSON.json()
    //console.log(dataJSON);
    const nameArray = dataJSON.variables[1].valueTexts
    const codeArray = dataJSON.variables[1].values
    var rightCode
    nameArray.forEach((name, index) => {
        if (name.toLowerCase() == newInput.toLowerCase())   {
            rightCode = codeArray[index]
            
        }
    
    });

    //console.log(rightCode)

    const jsonQuerryNew = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2000",
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                        "2020",
                        "2021"
                    ]
                }
            },
            {
                "code": "Alue",
                "selection": {
                    "filter": "item",
                    "values": [
                        rightCode
                    ]
                }
            },
            {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": [
                        "vaesto"
                    ]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    }

    if (rightCode != undefined)    {
        buildChart(jsonQuerryNew)
    }
}

function addEstimatedData() {
    const currentValues = chartElement.data.datasets[0].values
    //console.log(currentValues)
    var delta
    var sum = 0

    for (var i = 1; i < currentValues.length; i++) {
        delta = currentValues[i] - currentValues[i-1]
        sum = sum + delta
    }
    sum = (sum / (currentValues.length - 1)) + currentValues[currentValues.length - 1]
    //console.log(sum)

    chartElement.addDataPoint(yearCounter.toString(), [sum]);
    yearCounter++
}

buildChart(jsonQuerry)