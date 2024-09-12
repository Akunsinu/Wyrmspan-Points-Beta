        let chartData = {
            labels: [], // Holds categories
            datasets: [
                {
                    label: 'Stack 1',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    data: []  // Initially empty
                },
                {
                    label: 'Stack 2',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    data: []  // Initially empty
                },
                {
                    label: 'Stack 3',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    data: []  // Initially empty
                },
                {
                    label: 'Stack 4',
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    data: []  // Initially empty
                }
            ]
        };

        // Initialize the chart with empty data and fixed x-axis range
        const ctx = document.getElementById('combinedChart').getContext('2d');
        const combinedChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                indexAxis: 'y',  // Make the chart horizontal
                plugins: {
                    title: {
                        display: true,
                        text: 'Combined Stacked Bar Chart'
                    }
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                        beginAtZero: true,
                        max: 120  // Fix the x-axis range to 120
                    },
                    y: {
                        stacked: true
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutBounce'
                }
            }
        });

        let submittedData = [];  // Array to store submitted data temporarily

        // Handle form submission and store data
        document.getElementById('dataForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const category = document.getElementById('category').value;
            const stack1 = parseInt(document.getElementById('stack1').value);
            const stack2 = parseInt(document.getElementById('stack2').value);
            const stack3 = parseInt(document.getElementById('stack3').value);
            const stack4 = parseInt(document.getElementById('stack4').value);

            // Store submitted data in an array, but don't update the chart yet
            submittedData.push({
                category: category,
                stack1: stack1,
                stack2: stack2,
                stack3: stack3,
                stack4: stack4
            });

            // Clear input fields
            document.getElementById('category').value = '';
            document.getElementById('stack1').value = '';
            document.getElementById('stack2').value = '';
            document.getElementById('stack3').value = '';
            document.getElementById('stack4').value = '';

            // Show the Finish button after the first form submission
            document.getElementById('finishButton').style.display = 'block';
        });

        // Handle Finish button click to update and animate the chart
        document.getElementById('finishButton').addEventListener('click', function() {
            // Add the categories and 0 values for each stack (start from 0 for animation)
            submittedData.forEach(data => {
                chartData.labels.push(data.category);
                chartData.datasets[0].data.push(0);  // Stack 1 starts at 0
                chartData.datasets[1].data.push(0);  // Stack 2 starts at 0
                chartData.datasets[2].data.push(0);  // Stack 3 starts at 0
                chartData.datasets[3].data.push(0);  // Stack 4 starts at 0
            });

            // Update the chart without animation (all categories should appear first)
            combinedChart.update();

            // Animate each stack sequentially but simultaneously for all categories
            function animateStack(stackIndex) {
                submittedData.forEach((data, categoryIndex) => {
                    setTimeout(() => {
                        chartData.datasets[stackIndex].data[categoryIndex] = data[`stack${stackIndex + 1}`];
                        combinedChart.update();
                    }, categoryIndex * 500);  // Delay each category's animation slightly
                });
            }

            // Animate stack 1, then stack 2, then stack 3, then stack 4
            animateStack(0);  // Animate Stack 1
            setTimeout(() => animateStack(1), 1500);  // After 1.5 seconds, animate Stack 2
            setTimeout(() => animateStack(2), 3000);  // After 3 seconds, animate Stack 3
            setTimeout(() => animateStack(3), 4500);  // After 4.5 seconds, animate Stack 4
        });
