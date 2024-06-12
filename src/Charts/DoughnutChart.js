import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

const DoughnutChart = () => {
    const [chart, setChart] = useState({});

    const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    const apiKey = "coinrankingf346ef795a21261942f55efb64fc909ed5b80296cc91ff53";

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(`${baseUrl}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${apiKey}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    setChart(json.data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCoins();
    }, [baseUrl, apiKey]);

    const data = {
        labels: chart.coins?.map(x => x.name) || [],
        datasets: [{
            label: `${chart.coins?.length || 0} Coins Available`,
            data: chart.coins?.map(x => x.price) || [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    fontSize: 25
                }
            }
        }
    };

    return (
        <div>
            <Doughnut
                data={data}
                height={400}
                options={options}
            />
        </div>
    );
};

export default DoughnutChart;
