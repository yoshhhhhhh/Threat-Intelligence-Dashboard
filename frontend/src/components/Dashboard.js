// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart elements and plugins
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Generates an array of rainbow-like colors
function generateRainbowColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 360) / count;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}


function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/threats/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Error fetching stats:', err));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  // Pie Chart: Threats by Category
  const categoryData = {
    labels: Object.keys(stats.threats_by_category),
    datasets: [
      {
        label: 'Threats by Category',
        data: Object.values(stats.threats_by_category),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#BA68C8'],
      },
    ],
  };

  const pieOptions = {
  plugins: {
    datalabels: {
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1) + '%';
        return percentage;
      },
      color: '#fff',
      font: {
        weight: 'bold',
      },
    },
    legend: {
      position: 'bottom',
    },
  },
};


  // Bar Chart: Threats by Severity
  // Define severity-to-color mapping
const severityLabels = Object.keys(stats.threats_by_severity);
const severityCounts = Object.values(stats.threats_by_severity);
const barColors = generateRainbowColors(severityCounts.length); // your rainbow array

const severityData = {
  labels: severityLabels,
  datasets: [
    {
      label: 'Threats by Severity',
      data: severityCounts,
      backgroundColor: barColors,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        generateLabels: function (chart) {
          const dataset = chart.data.datasets[0];
          const activeElement = chart.tooltip?._active?.[0];
          const color =
            activeElement != null
              ? dataset.backgroundColor[activeElement.index]
              : '#6766'; // fallback color

          return [
            {
              text: dataset.label,
              fillStyle: color,
              strokeStyle: color,
              lineWidth: 1,
              hidden: false,
              index: 0,
            },
          ];
        },
      },
      // Disable toggling datasets on legend click:
      onClick: () => {},
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Severity Level',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Number of Threats',
      },
      beginAtZero: true,
    },
  },
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>Threat Intelligence Dashboard</h2>

      <div style={{ marginBottom: '20px', fontSize: '18px' }}>
        <strong>Total Threats:</strong> {stats.total_threats}
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
  <div style={{ flex: 0.9, minWidth: '250px' }}>
    <h4>Threats by Category</h4>
    <Pie data={categoryData} options={pieOptions} plugins={[ChartDataLabels]} />
  </div>

  <div style={{ flex: 1, minWidth: '300px' }}>
    <h4>Threats by Severity</h4>
    <Bar data={severityData} options={barOptions} />
  </div>
</div>

    </div>
  );
}

export default Dashboard;
