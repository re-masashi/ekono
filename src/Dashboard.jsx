import { Outlet, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import Chart from 'chart.js/auto';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

// Placeholder API functions (same as before)
const getPipelines = async () => {
  return [
    { id: 1, name: "Pipeline 1" },
    { id: 2, name: "Pipeline 2" },
  ];
};

const getModels = async () => {
  return [
    { id: 1, name: "Model A", price: 10 },
    { id: 2, name: "Model B", price: 20 },
  ];
};

const getUsage = async () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const usageData = [];
    for(let i=0; i<7; i++){
        const date = new Date(lastWeek);
        date.setDate(lastWeek.getDate() + i);
        usageData.push({date: date.toISOString().slice(0, 10), value: Math.floor(Math.random() * 100)})
    }
    return usageData;
};

const getCredits = async () => {
  return { amount: 500 };
};

const createPipeline = async (pipelineData) => {
  console.log("Creating pipeline:", pipelineData);
  return { id: 3, ...pipelineData };
};

const updatePipeline = async (pipelineId, pipelineData) => {
  console.log("Updating pipeline:", pipelineId, pipelineData);
  return { id: pipelineId, ...pipelineData };
};

const deletePipeline = async (pipelineId) => {
  console.log("Deleting pipeline:", pipelineId);
  return { success: true };
};

const rechargeCredits = async (amount) => {
  console.log("Recharging credits:", amount);
  return { success: true, newAmount: 500 + amount };
};

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row">
        <h1 className="text-3xl font-bold">Recent Pipelines</h1>
        <button className="ml-auto mr-1 lg:mr-14 bg-zinc-900 p-2 rounded-lg">Create New</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-zinc-900/80 text-white/90 border-zinc-700">
          <CardHeader className="relative mb-auto">
            <CardDescription className="text-zinc-200 text-xl">Text to Brainrot, Audiobook and Notes Generator</CardDescription>
            <hr className="py-0.5 border-px border-gray-200"/>
            <CardTitle className="pt-1">
              Bill: <span className="font-bold tabular-nums text-lg"> $1,250.00</span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm mt-auto">
            <div className="line-clamp-1 flex gap-2 font-medium">
              200K uses this month
            </div>
            <div className="text-muted-foreground text-zinc-400">
              (0.00625$/use)
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-zinc-900/80 text-white/90 border-zinc-700">
          <CardHeader className="relative mb-auto">
            <CardDescription className="text-zinc-200 text-xl">Essay Writer</CardDescription>
            <hr className="py-0.5 border-px border-gray-200"/>
            <CardTitle className="pt-1">
              Bill: <span className="font-bold tabular-nums text-lg"> $250.50</span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm mt-auto">
            <div className="line-clamp-1 flex gap-2 font-medium">
              250.5K uses this month
            </div>
            <div className="text-muted-foreground text-zinc-400">
              (0.001$/use)
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-row">
        <h1 className="text-3xl font-bold">Models</h1>
        <button className="ml-auto mr-1 lg:mr-14 bg-zinc-900 p-2 rounded-lg">See All</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-zinc-900/80 text-white/90 border-zinc-700">
          <CardHeader className="relative mb-auto">
            <CardDescription className="text-zinc-200 text-xl">DeepSeek-R1</CardDescription>
            <hr className="py-0.5 border-px border-gray-200"/>
            <div className="flex flex-row gap-2">
              <Badge className="bg-red-400/20">Text Generation</Badge>
              {/*<Badge className="bg-red-400/20"></Badge>*/}
            </div>
            <CardDescription className="text-zinc-200 text-sm">DeepSeek-R1 is a state of the art reasoning model.</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm mt-auto">
            <div className="line-clamp-1 flex gap-2 font-medium">
              30$ per million tokens
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-zinc-900/80 text-white/90 border-zinc-700">
          <CardHeader className="relative mb-auto">
            <CardDescription className="text-zinc-200 text-xl">Ekono TextHum Pro</CardDescription>
            <hr className="py-0.5 border-px border-gray-200"/>
            <div className="flex flex-row gap-2">
              <Badge className="bg-green-400/20">Text Humanization</Badge>
              {/*<Badge className="bg-red-400/20"></Badge>*/}
            </div>
            <CardDescription className="text-zinc-200 text-sm">Ekono TextHum Pro is the successor to the Ekono TextHum model with increased accuracy.</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm mt-auto">
            <div className="line-clamp-1 flex gap-2 font-medium">
              30$ per million tokens
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="bg-zinc-800 text-white w-64 p-6 flex flex-col ">
      {/*<h2 className="text-2xl font-semibold mb-10 text-center">Dashboard</h2>*/}
      <nav className="flex-1">
        <button
          className="block w-full text-left py-3 px-4 hover:bg-zinc-700 transition duration-300 ease-in-out rounded-lg mb-3 border border-zinc-700"
          onClick={() => navigate({ to: '/dashboard/workflows' })}
        >
          Workflows
        </button>
        <button
          className="block w-full text-left py-3 px-4 hover:bg-zinc-700 transition duration-300 ease-in-out rounded-lg mb-3 border border-zinc-700"
          onClick={() => navigate({ to: '/dashboard/models' })}
        >
          Models
        </button>
        <button
          className="block w-full text-left py-3 px-4 hover:bg-zinc-700 transition duration-300 ease-in-out rounded-lg mb-3 border border-zinc-700"
          onClick={() => navigate({ to: '/dashboard/usage' })}
        >
          Usage
        </button>
        <button
          className="block w-full text-left py-3 px-4 hover:bg-zinc-700 transition duration-300 ease-in-out rounded-lg mb-3 border border-zinc-700"
          onClick={() => navigate({ to: '/dashboard/credits' })}
        >
          Credits
        </button>
      </nav>
    </aside>
  );
}

function Navbar() {
  return (
    <nav className="bg-zinc-900 p-6 shadow-md">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
    </nav>
  );
}

function Workflows() {
  const { data: pipelines, isLoading, isError, error } = useQuery({ queryKey: ['pipelines'], queryFn: getPipelines });

  if (isLoading) return <div className="text-center p-4 text-zinc-400">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-cyan-400">Workflows</h2>
      <div className="space-y-4">
        {pipelines && pipelines.map((pipeline) => (
          <div key={pipeline.id} className="bg-zinc-700 rounded-lg p-6 shadow-md hover:bg-zinc-600 transition duration-300 ease-in-out border border-zinc-600">
            {pipeline.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function Models() {
  const { data: models, isLoading, isError, error } = useQuery({ queryKey: ['models'], queryFn: getModels });

  if (isLoading) return <div className="text-center p-4 text-zinc-400">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-purple-400">Models</h2>
      <div className="space-y-4">
        {models && models.map((model) => (
          <div key={model.id} className="bg-zinc-700 rounded-lg p-6 shadow-md hover:bg-zinc-600 transition duration-300 ease-in-out border border-zinc-600">
            {model.name} - ${model.price}
          </div>
        ))}
      </div>
    </div>
  );
}

function Usage() {
  const { data: usage, isLoading, isError, error } = useQuery({ queryKey: ['usage'], queryFn: getUsage });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (usage && canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: usage.map((item) => item.date),
          datasets: [{
            label: 'Usage',
            data: usage.map((item) => item.value),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [usage]);

  if (isLoading) return <div className="text-center p-4 text-zinc-400">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-cyan-400">Usage</h2>
      {usage && <div className="w-full max-w-3xl mx-auto"> <canvas ref={canvasRef} id="usageChart"></canvas> </div>}
    </div>
  );
}

function Credits() {
  const { data: credits, isLoading, isError, error } = useQuery({ queryKey: ['credits'], queryFn: getCredits });

  if (isLoading) return <div className="text-center p-4 text-zinc-400">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8 text-purple-400">Credits</h2>
      <p className="mb-6 text-zinc-400">Current Credits: {credits && credits.amount}</p>
      <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
        Recharge +100
      </button>
    </div>
  );
}

export { Dashboard, DashboardHome, Workflows, Models, Usage, Credits };