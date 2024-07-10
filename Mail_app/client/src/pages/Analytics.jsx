import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';
import {BarChart,Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,Dot,AreaChart,Area} from 'recharts';

const Analytics = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [campaignCounts, setCampaignCounts] = useState(0);

  useEffect(() => {
    fetchEmailEvents();
    fetchCampaignCounts();
  }, []);

  const fetchEmailEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/email-events');
      setEmailEvents(response.data);
    } catch (error) {
      console.error('Error fetching email events:', error);
    }
  };

  const fetchCampaignCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/campaign-counts');
      setCampaignCounts(response.data.count);
    } catch (error) {
      console.error('Error fetching campaign counts:', error);
    }
  };

  const formatDataForChart = () => {
    const eventCounts = emailEvents.reduce((acc, event) => {
      const sentAtDate = new Date(event.sentAt).toLocaleDateString();
      if (!acc[sentAtDate]) {
        acc[sentAtDate] = 0;
      }
      acc[sentAtDate]++;
      return acc;
    }, {});

    return Object.keys(eventCounts).map((date) => ({
      date,
      count: eventCounts[date],
    }));
  };

  const data = formatDataForChart();

  return (
    <div className="max-w-screen min-h-screen  mx-auto  px-10 bg-gradient-to-b from-purple-900 to-black text-white  shadow-md p-6 ">

      <div className="flex items-center mb-4 ">
        <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Email Analytics</h1>
      </div>
      <div className="bg-gradient-to-b from-gray-500 to-white mb-4 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="date" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="count" stroke="#7C3AED" fill="#7C3AED" />
            <Dot type="monotone" dataKey="count" fill="#7C3AED" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-b from-gray-500 to-white  rounded-xl mb-4 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={[{ name: 'Campaigns', count: campaignCounts }]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
};

export default Analytics;
