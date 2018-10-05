<template>
    <div id="app">
        <div class="block-header">
            <h2>REPORT EMPLOYEE BY TIME</h2>
        </div>
        <div id="content">
            <canvas ref="chart"></canvas>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import chart from 'chart.js'
export default {
  name: 'app',
  mounted() {
    axios({
      method: 'GET',
      url: 'http://localhost:8085/countDevByTime'
    }).then(
      result => {
        var size = result.data.length;
        var langname = [];
        var dataEm = [];
        for(var i = 0;i < size;i++) {
          langname.push(result.data[i].startYear);
          dataEm.push(result.data[i].total);
        }
        var chart = this.$refs.chart;
            var ctx = chart.getContext("2d");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: langname,
                    datasets: [{
                        label: 'People of Year',
                        data: dataEm,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        console.log(result)
      },
      error => {
        console.error(error)
      }
    )
  }
}
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #content {
        margin: auto;
        width: 1024px;
        background-color: #FFFFFF;
        padding: 20px;
    }
</style>
