import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import useSecureAxiose from "../../useSecureAxiose/useSecureAxiose";
import { Helmet } from "react-helmet-async";

const Statistics = () => {
  const axioseSecure = useSecureAxiose();
  const { data: lest = {}, isLoading } = useQuery({
    queryKey: ["lest"],
    queryFn: async () => {
      const { data } = await axioseSecure.get("/admin-list");
      return data;
    },
  });

  const { products, user, reviews, pending, accept } = lest;

  const data01 = [
    { name: "Products", value: products || 0 },
    { name: "Users", value: user || 0 },
    { name: "Reviews", value: reviews || 0 },
    { name: "Pending Products", value: pending || 0 },
    { name: "Accepted", value: accept || 0 },
  ];

  const data02 = [
    { name: "Products", value: products || 0 },
    { name: "Users", value: user || 0 },
    { name: "Reviews", value: reviews || 0 },
    { name: "Pending", value: pending || 0 },
    { name: "Accepted", value: accept || 0 },
  ];

  return (
    <div className="p-4">
      <Helmet>
        <title>Admin Page || Statistics</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Statistics</h1>
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex justify-center items-center">
        {isLoading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#54673B"
                label={(entry) => `${entry.name}: ${entry.value}`}
              />
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#00000"
                label={(entry) => entry.name}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Statistics;
