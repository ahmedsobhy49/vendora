import Chart from "react-apexcharts";
import "../../../../../../App.css";
export default function Statistics() {
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 87, 78],
      },
      {
        name: "Revenue",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 87, 78],
      },
      {
        name: "Sellers",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 87, 78],
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
        max: 100,
        tickAmount: 5,
        labels: {
          style: { fontSize: "13px" },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val;
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
