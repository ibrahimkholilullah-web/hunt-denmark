import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';

const Statistics = () => {
    const axioseSecure = useSecureAxiose()
    const {data : lest ={} , isLoading} = useQuery({
        queryKey:['lest'],
        queryFn: async () =>{
            const {data} =await axioseSecure.get('/admin-list')
            return data
        }
    })
    const {products,
        user,
        reviews,
        pending,
        accept} = lest
  const data01 = [
    { name: "products", value: products },
    { name: "Users", value: user },
    { name: "Reviews", value: reviews },
    { name: "Pending Products", value: pending },
    { name: "Accept", value: accept },
  
  ];
  const data02 = [
    { name: "products", value: products },
    { name: "Users", value: user },
    { name: "reviews", value: reviews },
    { name: "pending", value: pending },
    { name: "Accept", value: accept },
  ];

  return (
    <div className="text-white flex justify-center items-center h-screen">
      <PieChart width={730} height={350}>
       
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#54673B"
          label={(entry) => entry.value} // Show name as the label
        />
         <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#FFFFF"
          label={(entry) => entry.name} // Show name as the label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Statistics;
