"use client"
import {useEffect, useState}  from "react"

import { getAllData, getMessages } from "@/utils/actions/data";
import { MetricsGrid } from "@/components/dashboard/stats/metrics-grid";
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart";
import { ActivityList } from "@/components/dashboard/activity/activity-list";

export default function DashboardPage() {
  const [datacount, setDataCount] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllData();
        setDataCount(res);
      } catch (error) {
        console.error("Something went wrong. Try");
      }
    } 
     
    async function fetchData() {
      try {
        const res = await getAllData();
        setDataCount(res);
      } catch (error) {
        console.error("Something went wrong. Try");
      }
    } 
    async function fetchMessages() {
      try {
        const res = await getMessages();
        setMessages(res);
      } catch (error) {
        console.error("Something went wrong. Try");
      }
    } 
    fetchMessages()
    fetchData()
  }, []);
  return (
    <div className="pl-30 flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl tracking-tight">Dashboard</h2>
      </div>
      <MetricsGrid data={datacount}/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <ActivityList messages={messages}/>
      </div>
    </div>
  )
}