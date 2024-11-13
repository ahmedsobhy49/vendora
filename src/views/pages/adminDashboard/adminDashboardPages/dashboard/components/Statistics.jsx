import Chart from "react-apexcharts";
import "../../../../../../App.css";
import { useQuery } from "react-query";
import getSellersStatistics from "../../../../../../services/seller/getSellersStatistics";

export default function Statistics({ yearOrdersStatistics }) {
  const { data: sellersStatistics } = useQuery(
    ["yearaSellersStatistics"],
    getSellersStatistics
  );

  // Extract order data for each month from the monthly statistics
  const orderData =
    yearOrdersStatistics?.monthlyStats?.map((stat) => stat?.totalOrders) || [];

  // Extract revenue (total sales) data for each month from the monthly statistics
  const revenueData =
    yearOrdersStatistics?.monthlyStats?.map(
      (stat) => stat?.totalSales / 1000
    ) || [];

  const sellersData =
    sellersStatistics?.data?.monthlyStatistics.map((stat) => stat?.count) || [];

  const state = {
    series: [
      {
        name: "Orders",
        data: orderData, // Use the extracted order data array or an empty array if not available
      },
      {
        name: "Revenue",
        data: revenueData, // Use the extracted revenue data array or an empty array if not available
      },
      {
        name: "Sellers",
        data: sellersData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        background: "transparent",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        // Set month names as x-axis categories for each bar in the chart
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: { fontSize: "13px" },
        },
      },
      yaxis: {
        min: 0,
        max: 100, // Fixed maximum value of 100
        tickAmount: 5, // 20 ticks to divide y-axis in increments of 5
        labels: {
          style: { fontSize: "13px" },
          formatter: function (val) {
            return val; // Display values directly (5, 10, 15, ..., 100)
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val, { seriesIndex, w }) {
            const seriesName = w.config.series[seriesIndex].name;
            return seriesName === "Revenue" ? `$${val}k` : val; // Format Revenue with "$" and "k"
          },
          title: {
            formatter: (seriesName) => `${seriesName}:`,
          },
        },
      },
      legend: {
        show: true,
        fontSize: "11px",
        fontWeight: 600,
        labels: {
          colors: ["#333", "#333", "#333"],
        },
        itemMargin: {
          horizontal: 20,
          vertical: 20,
        },
      },
      colors: ["#f15313", "#feb019", "#10a66c"], // Set colors for Orders and Revenue series
      responsive: [
        {
          breakpoint: 1020,
          options: {
            chart: {
              height: 550,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            xaxis: {
              min: 0,
              max: 25, // Fixed maximum value of 100
              tickAmount: 5, // 5 ticks (0, 20, 40, 60, 80, 100)
              labels: {
                style: { fontSize: "11px" },
              },
            },
            yaxis: {
              labels: {
                style: { fontSize: "11px" },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div className="xl:col-span-2 bg-white shadow-md w-full">
      <div className="w-full h-full shadow px-4 md:p-6">
        <div className="mt-10">
          {/* Render the chart with updated series data */}
          <Chart type="bar" options={state.options} series={state.series} />
        </div>
      </div>
    </div>
  );
}
