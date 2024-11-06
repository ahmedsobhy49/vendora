import Chart from "react-apexcharts";
import "../../../../../../App.css";

export default function Statistics({ ordersStatistics, productsStatistics }) {
  const ordersData = ordersStatistics?.map((stat) => stat?.totalOrders) || [];
  const revenueData =
    ordersStatistics?.map((stat) => stat?.totalSales / 1000) || [];
  const productsData = productsStatistics?.map((stat) => stat.count) || [];

  const state = {
    series: [
      {
        name: "Orders",
        data: ordersData,
      },
      {
        name: "Revenue",
        data: revenueData,
      },
      {
        name: "Products",
        data: productsData,
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
        max: 10,
        tickAmount: 5,
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
    <div className=" xl:col-span-2 bg-white shadow-md w-full ">
      <div className="w-full h-full shadow px-4  md:p-6">
        <div className="mt-10">
          <Chart type="bar" options={state.options} series={state.series} />
        </div>
      </div>
    </div>
  );
}
