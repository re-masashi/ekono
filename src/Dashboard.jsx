import { Outlet, useNavigate } from "@tanstack/react-router"
import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import Chart from "chart.js/auto"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  LayoutDashboard,
  Workflow,
  Layers,
  BarChart3,
  CreditCard,
  Plus,
  ChevronRight,
  Menu,
  X
} from "lucide-react"

// Placeholder API functions
const getPipelines = async () => {
  return [
    { id: 1, name: "Text to Brainrot, Audiobook and Notes Generator" },
    { id: 2, name: "Essay Writer" }
  ]
}

const getModels = async () => {
  return [
    { id: 1, name: "Model A", price: 10 },
    { id: 2, name: "Model B", price: 20 }
  ]
}

const getUsage = async () => {
  const today = new Date()
  const lastWeek = new Date(today)
  lastWeek.setDate(today.getDate() - 7)

  const usageData = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(lastWeek)
    date.setDate(lastWeek.getDate() + i)
    usageData.push({
      date: date.toISOString().slice(0, 10),
      value: Math.floor(Math.random() * 100)
    })
  }
  return usageData
}

const getCredits = async () => {
  return { amount: 500 }
}

const createPipeline = async pipelineData => {
  console.log("Creating pipeline:", pipelineData)
  return { id: 3, ...pipelineData }
}

const updatePipeline = async (pipelineId, pipelineData) => {
  console.log("Updating pipeline:", pipelineId, pipelineData)
  return { id: pipelineId, ...pipelineData }
}

const deletePipeline = async pipelineId => {
  console.log("Deleting pipeline:", pipelineId)
  return { success: true }
}

const rechargeCredits = async amount => {
  console.log("Recharging credits:", amount)
  return { success: true, newAmount: 500 + amount }
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-900 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function DashboardHome() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold ">
            Recent Pipelines
          </h1>
          <BackgroundGradient animate={true} bgRadiusClass="rounded-[0.8rem]" containerClassName="p-[0.11rem]">
            <Button
              className="border-zinc-800 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-900 hover:text-white"
              onClick={() => navigate({ to: "/dashboard/pipelines" })}
            >
              <Plus className="h-4 w-4" />
              {/*<div className="h-full bg-zinc-400 w-0.5"/>*/}
              Create New
            </Button>
          </BackgroundGradient>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <PipelineCard
            title="Text to Brainrot, Audiobook and Notes Generator"
            bill={1250.0}
            uses={200000}
            costPerUse={0.00625}
          />
          <PipelineCard
            title="Essay Writer"
            bill={250.5}
            uses={250500}
            costPerUse={0.001}
          />
          <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center group cursor-pointer">
            <div className="flex flex-col items-center justify-center p-8 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
              <Plus className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-lg font-medium">Add New Pipeline</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold ">
            Models
          </h1>
          {/*<BackgroundGradient animate={true} bgRadiusClass="rounded-[0.75rem]" containerClassName="p-[0.13rem]">*/}
            <Button
              variant="outline"
              className="border-zinc-800 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-900 hover:text-white"
              onClick={() => navigate({ to: "/dashboard/models" })}
            >
              See All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          {/*</BackgroundGradient>*/}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModelCard
            title="DeepSeek-R1"
            badges={["Text Generation"]}
            description="DeepSeek-R1 is a state of the art reasoning model."
            price={20}
          />
          <ModelCard
            title="Ekono TextHum Pro"
            badges={["Text Humanization"]}
            description="Ekono TextHum Pro is the successor to the Ekono TextHum model with increased accuracy."
            price={35}
            badgeColor="green"
          />
          <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center group cursor-pointer">
            <div className="flex flex-col items-center justify-center p-8 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
              <Plus className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-lg font-medium">Explore More Models</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PipelineCard({ title, bill, uses, costPerUse }) {
  return (
    <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden group">
      <CardHeader className="relative mb-auto pb-2">
        <CardDescription className="text-zinc-100 text-lg font-medium line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </CardDescription>
        <Separator className="my-2 bg-zinc-700 group-hover:bg-gradient-to-r group-hover:from-cyan-700 group-hover:to-purple-700 transition-all duration-500" />
        <CardTitle className="pt-1 flex items-baseline">
          <span className="text-sm text-zinc-400 mr-1">Bill:</span>
          <span className="font-bold tabular-nums text-lg text-white">
            ${bill.toFixed(2)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm mt-auto pt-2">
        <div className="line-clamp-1 flex gap-2 font-medium">
          <span className="text-cyan-400 tabular-nums">
            {(uses / 1000).toFixed(1)}K
          </span>
          <span className="text-zinc-300">uses this month</span>
        </div>
        <div className="text-zinc-500">(${costPerUse.toFixed(6)}/use)</div>
      </CardFooter>
    </Card>
  )
}

function ModelCard({ title, badges, description, price, badgeColor = "red" }) {
  return (
    <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden group">
      <CardHeader className="relative mb-auto pb-2">
        <CardDescription className="text-zinc-100 text-lg font-medium group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </CardDescription>
        <Separator className="my-2 bg-zinc-700 group-hover:bg-gradient-to-r group-hover:from-cyan-700 group-hover:to-purple-700 transition-all duration-500" />
        <div className="flex flex-row gap-2 flex-wrap">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              className={`bg-red-400/20 text-red-300 hover:bg-red-400/30 transition-all`}
            >
              {badge}
            </Badge>
          ))}
        </div>
        <CardDescription className="text-zinc-300 text-sm mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm mt-auto pt-2">
        <div className="line-clamp-1 flex gap-2 font-medium">
          <span className="text-purple-400 tabular-nums">${price}</span>
          <span className="text-zinc-300">per million tokens</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate()

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-3" />,
      path: "/dashboard"
    },
    {
      name: "Pipelines",
      icon: <Workflow className="h-5 w-5 mr-3" />,
      path: "/dashboard/pipelines"
    },
    {
      name: "Models",
      icon: <Layers className="h-5 w-5 mr-3" />,
      path: "/dashboard/models"
    },
    {
      name: "Usage",
      icon: <BarChart3 className="h-5 w-5 mr-3" />,
      path: "/dashboard/usage"
    },
    {
      name: "Credits",
      icon: <CreditCard className="h-5 w-5 mr-3" />,
      path: "/dashboard/credits"
    }
  ]

  return (
    <aside
      className={`bg-zinc-950 text-white fixed md:relative z-40 h-full transition-all duration-300 ease-in-out ${
        isOpen
          ? "w-64 translate-x-0"
          : "w-0 -translate-x-full md:w-20 md:translate-x-0"
      } shadow-xl shadow-black/20`}
    >
      <div className="flex items-center justify-between p-6">
        <h2
          className={`text-3xl font-bold bg-gradient-to-r from-white/90 via-purple-400/80 to-cyan-500/90 bg-clip-text text-transparent transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 md:hidden"
          }`}
        >
          Ekono
        </h2>
        <button
          className="text-zinc-400 hover:text-white md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full text-left py-3 px-4 hover:bg-zinc-800 transition duration-300 ease-in-out rounded-lg mb-2 group ${
              isOpen ? "justify-start" : "justify-center md:px-2"
            }`}
            onClick={() => {
              navigate({ to: item.path })
              if (window.innerWidth < 768) setIsOpen(false)
            }}
          >
            <div
              className={`flex items-center ${isOpen ? "" : "justify-center"}`}
            >
              {item.icon}
              <span
                className={`transition-opacity duration-300 ${
                  isOpen
                    ? "opacity-100"
                    : "opacity-0 hidden md:block md:opacity-0 group-hover:opacity-100 absolute left-20 bg-zinc-800 px-2 py-1 rounded ml-2 text-sm"
                }`}
              >
                {item.name}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="text-zinc-400 hover:text-white mr-4"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-100">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-800 bg-zinc-800 text-zinc-100 hover:bg-zinc-900 hover:text-white"
        >
          Help
        </Button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
      </div>
    </nav>
  )
}

function Pipelines() {
  const { data: pipelines, isLoading, isError, error } = useQuery({
    queryKey: ["pipelines"],
    queryFn: getPipelines
  })
  
  const navigate = useNavigate()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8">
        Pipelines
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pipelines &&
          pipelines.map(pipeline => (
            <Card
              key={pipeline.id}
              className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 cursor-pointer group"
            >
              <CardHeader>
                <CardTitle className="text-zinc-100 hover:text-cyan-300 transition-colors duration-300">
                  {pipeline.name}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-between mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-200 group-hover:text-zinc-100 hover:bg-zinc-300"
                  onClick={()=>{console.log("clicked"); navigate({to: "/editor/"+pipeline.id})}}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-200 group-hover:text-zinc-100 hover:bg-zinc-300"
                >
                  Run
                </Button>
              </CardFooter>
            </Card>
          ))}
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 border-dashed hover:border-zinc-700 transition-all duration-300 flex items-center justify-center group cursor-pointer h-[180px]">
          <div className="flex flex-col items-center justify-center p-8 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
            <Plus className="h-10 w-10 mb-4 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-lg font-medium">Create New Pipeline</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Models() {
  const { data: models, isLoading, isError, error } = useQuery({
    queryKey: ["models"],
    queryFn: getModels
  })

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8">
        Models
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models &&
          models.map(model => (
            <Card
              key={model.id}
              className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 cursor-pointer group"
            >
              <CardHeader>
                <CardTitle className="text-zinc-200 group-hover:text-zinc-100 transition-colors duration-300">
                  {model.name}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  ${model.price} per million tokens
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <BackgroundGradient animate={true} bgRadiusClass="rounded-[3rem]" containerClassName="p-[0.014rem]">
                  <Button className="w-full rounded-3xl">
                    Use Model
                  </Button>
                </BackgroundGradient>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

function Usage() {
  const { data: usage, isLoading, isError, error } = useQuery({
    queryKey: ["usage"],
    queryFn: getUsage
  })
  const chartRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (usage && canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy()
      }

      const ctx = canvasRef.current.getContext("2d")

      // Custom chart configuration
      Chart.defaults.color = "#94a3b8"
      Chart.defaults.borderColor = "rgba(255, 255, 255, 0.1)"

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: usage.map(item => item.date),
          datasets: [
            {
              label: "Usage",
              data: usage.map(item => item.value),
              borderColor: "rgb(79, 209, 197)",
              backgroundColor: "rgba(79, 209, 197, 0.1)",
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "rgb(79, 209, 197)",
              pointBorderColor: "#0f172a",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              titleColor: "#e2e8f0",
              bodyColor: "#e2e8f0",
              borderColor: "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: context => `Usage: ${context.raw} units`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(148, 163, 184, 0.1)"
              },
              ticks: {
                padding: 10
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                padding: 10
              }
            }
          }
        }
      })
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [usage])

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8">
        Usage Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardDescription className="text-zinc-400">
              Total Usage
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {usage && usage.reduce((sum, item) => sum + item.value, 0)} units
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardDescription className="text-zinc-400">
              Average Daily
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {usage &&
                Math.round(
                  usage.reduce((sum, item) => sum + item.value, 0) /
                    usage.length
                )}{" "}
              units
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardDescription className="text-zinc-400">
              Peak Usage
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {usage && Math.max(...usage.map(item => item.value))} units
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/*<Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 p-4">
          <CardHeader>
            <CardTitle className="text-zinc-300">Models Usage Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {usage && (
              <div className="w-full">
                <canvas ref={canvasRef} id="usageChart"></canvas>
              </div>
            )}
          </CardContent>
        </Card>
        */}
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 p-4">
          <CardHeader className="flex flex-row">
            <CardTitle className="text-zinc-300">Weekly Usage Trend</CardTitle>
            <select className="ml-auto text-zinc-300">
              <option>Pip01</option>
              <option>Pip02</option>
            </select>
          </CardHeader>
          <CardContent>
            {usage && (
              <div className="w-full">
                <canvas ref={canvasRef} id="usageChart"></canvas>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Credits() {
  const { data: credits, isLoading, isError, error } = useQuery({
    queryKey: ["credits"],
    queryFn: getCredits
  })
  const [isRecharging, setIsRecharging] = useState(false)

  const handleRecharge = async () => {
    setIsRecharging(true)
    try {
      await rechargeCredits(100)
      // Would typically invalidate the credits query here
      setTimeout(() => setIsRecharging(false), 1000)
    } catch (err) {
      console.error(err)
      setIsRecharging(false)
    }
  }

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message={error.message} />

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8">
        Credits
      </h2>

      <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-zinc-100">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-white">
              {credits && credits.amount}
            </span>
            <span className="ml-2 text-zinc-200">credits</span>
          </div>
          <div className="mt-2 text-zinc-200">
            Estimated usage: ~ {Math.round(credits.amount / 10)} days remaining
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-zinc-100">Recharge Credits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              >
                +50
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              >
                +100
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 bg-zinc-800 text-zinc-100"
              >
                +500
              </Button>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-zinc-700 via-purple-400/40 to-zinc-800"
              onClick={handleRecharge}
              disabled={isRecharging}
            >
              {isRecharging ? "Processing..." : "Recharge +100 Credits"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-zinc-100">Usage History</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="space-y-4 px-2">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <div className="text-zinc-300">Last Week</div>
                <div className="text-zinc-200 font-medium">120 credits</div>
              </div>
              <div className="flex justify-between items-center pb-2">
                <div className="text-zinc-300">This Month</div>
                <div className="text-zinc-200 font-medium">450 credits</div>
              </div>
            </div>
            <div className="flex justify-between border-t border-zinc-700 items-center mt-5 py-2">
              <div className="text-zinc-300">Last Recharge</div>
              <div className="text-green-400 font-bold">+200 credits</div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 rounded-full border-4 border-zinc-700 border-t-cyan-400 animate-spin mb-4"></div>
      <p className="text-zinc-400">Loading data...</p>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
        <X className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">
        Error Loading Data
      </h3>
      <p className="text-zinc-400 max-w-md">
        {message || "Something went wrong. Please try again later."}
      </p>
      <Button
        variant="outline"
        className="mt-4 border-zinc-700 hover:bg-zinc-800"
      >
        Retry
      </Button>
    </div>
  )
}

export { Dashboard, DashboardHome, Pipelines, Models, Usage, Credits }
