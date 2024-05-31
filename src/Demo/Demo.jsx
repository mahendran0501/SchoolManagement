import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

function Demo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/Attendance');
                const data = await response.json();

                // Process data to generate chart data and options
                const labels = [...new Set(data.map(day => day[0].date))]; // Collect unique dates
                const students = [...new Set(data.flatMap(day => Object.values(day).map(record => record.Fname)))]; // Collect unique student names

                const attendanceCounts = students.reduce((acc, student) => {
                    acc[student] = labels.map(date => {
                        const dayRecord = data.find(day => day[0].date === date);
                        const studentRecord = Object.values(dayRecord).find(record => record.Fname === student);
                        return studentRecord?.attendance === 'Present' ? 1 : 0;
                    });
                    return acc;
                }, {});

                const datasets = Object.keys(attendanceCounts).map(student => ({
                    label: student,
                    data: attendanceCounts[student],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                }));

                const chartData = {
                    labels: labels,
                    datasets: datasets
                };

                const options = {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                maxRotation: 0,
                                minRotation: 0,
                                callback: function (value) {
                                    return value % 1 === 0 ? value : '';
                                }
                            },
                            title: {
                                display: true,
                                text: 'Number of Present'
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 0,
                                minRotation: 0
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        }
                    }
                };

                setChartData(chartData);
                setChartOptions(options);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}

export default Demo;
