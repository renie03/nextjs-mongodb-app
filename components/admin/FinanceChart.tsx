"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-bgSoft p-5 rounded-xl h-110">
      <h1 className="text-xl text-textSoft mb-5">Finance</h1>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-borderColor)"
          />
          <XAxis
            dataKey="name"
            stroke="var(--color-text)"
            tickLine={false}
            tickMargin={5}
          />
          <YAxis stroke="var(--color-text)" tickLine={false} tickMargin={10} />
          <Tooltip
            cursor={{
              stroke: "var(--color-text)",
            }}
            contentStyle={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-text)",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#50C878" />
          <Line type="monotone" dataKey="expense" stroke=" #C48AFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
