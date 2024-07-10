import React, { useMemo } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const FinanceChart = ({ data }: { data: any }) => {
  const chartData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Total Revenue",
          data: data.totalRevenue,
          borderColor: "#179402",
          backgroundColor: "rgba(23, 148, 2, 0.2)",
        },
        {
          label: "Net Income",
          data: data.netIncome,
          borderColor: "#FF6A5A",
          backgroundColor: "rgba(255, 106, 90, 0.2)",
        },
        {
          label: "Expenses",
          data: data.expenses,
          borderColor: "#044982",
          backgroundColor: "rgba(4, 73, 130, 0.2)",
        },
      ],
    }),
    [data]
  )

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Financial Overview",
        },
      },
    }),
    []
  )

  return <Line data={chartData} options={options} />
}

export default FinanceChart
