function graphit(){

    const config = {
      type: 'line',
      data: {
      labels: labels,
      datasets: [{
        label: 'Shear Diagram',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: datas,
      }]
    },
      options: {
          datasets: { line: { pointRadius: 0 // disable for all `'line'` datasets
           } },
      }
    };
    
    
    
    var myChart = new Chart( document.getElementById('myChart'), config );
    
    const config2 = {
      type: 'line',
      data:{
      labels: labels,
      datasets: [{
        label: 'Moment diagram',
        backgroundColor: '#2673B8',
        borderColor: '#2673B8',
        data: data2,
      }]
    },
      options: {
          datasets: { line: { pointRadius: 0 // disable for all `'line'` datasets
           } },
      }
    };
    
     
    
    var myChart2 = new Chart( document.getElementById('myChart2'), config2 ); 
          }