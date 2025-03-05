import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import "./App.css"; // Keep App.css import

// Re-done WorkflowCard - PURPLE ACCENTS - ZINC BASE - ELEGANT - DARK MODE ONLY
const WorkflowCard = ({ workflow }) => {
  return (
    <motion.div
      className="bg-zinc-900/50 shadow-md rounded-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 border border-zinc-700/30 backdrop-blur-sm" // Dark Zinc Background
      layout
      whileHover={{ scale: 1.01 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-zinc-100 mb-3 tracking-tight">
          {workflow.name}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
          {workflow.description}
        </p>
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-700 text-zinc-100 shadow-sm">
            {" "}
            {/* MUTED PURPLE BADGE */}
            {workflow.status}
          </span>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Link
          to={`/dashboard/workflows/edit/${workflow.id}`}
          className="px-3 py-1.5 bg-purple-700 text-zinc-100 rounded-md hover:bg-purple-800 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 text-sm font-medium transition-colors duration-200" // MUTED PURPLE BUTTON
        >
          Edit
        </Link>
        <Link
          to={`/dashboard/workflows/${workflow.id}`}
          className="px-3 py-1.5 bg-zinc-700 text-zinc-100 rounded-md hover:bg-zinc-600 focus:ring-2 focus:ring-zinc-700 focus:ring-opacity-50 text-sm font-medium transition-colors duration-200" // ZINC VIEW BUTTON (subtle contrast)
        >
          View
        </Link>
        <motion.button
          className="px-3 py-1.5 bg-red-500/80 text-zinc-100 rounded-md hover:bg-red-800 focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 text-sm font-medium transition-colors duration-200" // MUTED RED DELETE BUTTON (for contrast)
          whileTap={{ scale: 0.98 }}
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

// Re-done Sidebar - ZINC BACKGROUND - PURPLE ICONS - ELEGANT - DARK MODE ONLY
const Sidebar = () => {
  return (
    <aside className="bg-zinc-900/20 w-64 flex flex-col h-full border-r border-zinc-700/30 shadow-md backdrop-blur-sm">
      {" "}
      {/* Dark Zinc Background */}
      <div className="p-5 flex-grow">
        <div className="mb-8 px-3">
          <h1 className="font-extrabold text-lg text-purple-400 tracking-tight">
            {" "}
            {/* ELEGANT PURPLE BRAND TEXT */}
            EKONO
          </h1>
          <p className="text-sm text-zinc-400">Dashboard</p>
        </div>
        <nav className="space-y-3 px-3">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-zinc-300 rounded-md hover:bg-zinc-700/10 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-4 text-purple-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l2.293 2.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>{" "}
            {/* MUTED PURPLE ICON */}
            Dashboard
          </Link>
          <Link
            to="/dashboard/workflows"
            className="flex items-center px-4 py-2 text-zinc-300 rounded-md hover:bg-zinc-700/10 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-4 text-purple-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM5 6a1 1 0 000 2h10a1 1 0 100-2H5zM2 10a1 1 0 000 2h16a1 1 0 100-2H2zM6 14a1 1 0 000 2h8a1 1 0 100-2H6z" />
            </svg>{" "}
            {/* MUTED PURPLE ICON */}
            Workflows
          </Link>
        </nav>
      </div>
      <div className="p-4 mt-auto border-t border-zinc-700/30 px-3">
        {/* Optional bottom sidebar content */}
      </div>
    </aside>
  );
};

// Re-done DashboardLayout - ZINC BACKGROUND - WHITE HEADER - PURPLE BUTTON - DARK MODE ONLY
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-900 dark:to-zinc-800 flex overflow-hidden">
      {" "}
      {/* Dark Zinc Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-zinc-900 to-zinc-800 bg-no-repeat bg-fixed" />
      <div className="fixed inset-0 z-0 opacity-5 hidden md:block">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:100px_100px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/80 to-transparent" />
        </div>
      </div>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-zinc-900/20 border-b border-zinc-700/30 p-5 backdrop-blur-sm">
          {" "}
          {/* Dark Zinc Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-bold text-xl text-zinc-100 tracking-tight">
              Dashboard
            </h2>
            <div className="space-x-2">
              <Link
                to="/dashboard/workflows/create"
                className="px-3 py-1.5 bg-purple-700 text-zinc-100 rounded-md hover:bg-purple-800 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 font-medium transition-colors duration-200 text-sm" // MUTED PURPLE BUTTON
              >
                Create Workflow
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Re-done DashboardPage - ZINC BASE - PURPLE METRICS - GROUNDED STRUCTURE - ELEGANT - DARK MODE ONLY
const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column (lg:col-span-8) - Key Metrics and Workflow List */}
      <div className="lg:col-span-8 flex flex-col space-y-8">
        {/* Key Metrics Section - Contained Card - PURPLE METRICS - ELEGANT - DARK MODE ONLY */}
        <section className="bg-zinc-900/50 shadow-md rounded-md p-6 border border-zinc-700/30 backdrop-blur-sm">
          {" "}
          {/* Dark Zinc Background */}
          <h2 className="text-2xl font-extrabold text-zinc-100 mb-4 tracking-tight">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Metric Cards - PURPLE METRICS - ELEGANT - DARK MODE ONLY */}
            <motion.div
              className="bg-zinc-900/20 shadow-md rounded-md p-5 border-b-4 border-purple-700 hover:shadow-lg transition-shadow duration-200"
              layout
              whileHover={{ y: -3 }}
            >
              {" "}
              {/* MUTED PURPLE BORDER */}
              <h3 className="text-zinc-300 text-sm font-bold mb-1 uppercase tracking-wider">
                Total Workflows
              </h3>
              <p className="text-3xl font-extrabold text-purple-400 tracking-tight">
                {" "}
                {/* ELEGANT PURPLE METRIC */}
                125
              </p>
              <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                All workflows in the system
              </p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/20 shadow-md rounded-md p-5 border-b-4 border-purple-700 hover:shadow-lg transition-shadow duration-200"
              layout
              whileHover={{ y: -3 }}
            >
              {" "}
              {/* MUTED PURPLE BORDER */}
              <h3 className="text-zinc-300 text-sm font-bold mb-1 uppercase tracking-wider">
                Active Workflows
              </h3>
              <p className="text-3xl font-extrabold text-purple-400 tracking-tight">
                {" "}
                {/* ELEGANT PURPLE METRIC */}
                32
              </p>
              <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                Workflows currently running
              </p>
            </motion.div>

            <motion.div
              className="bg-zinc-900/20 shadow-md rounded-md p-5 border-b-4 border-purple-700 hover:shadow-lg transition-shadow duration-200"
              layout
              whileHover={{ y: -3 }}
            >
              {" "}
              {/* MUTED PURPLE BORDER */}
              <h3 className="text-zinc-300 text-sm font-bold mb-1 uppercase tracking-wider">
                Completed (Last 7 Days)
              </h3>
              <p className="text-3xl font-extrabold text-purple-400 tracking-tight">
                {" "}
                {/* ELEGANT PURPLE METRIC */}
                88
              </p>
              <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                Workflows completed in the last week
              </p>
            </motion.div>
          </div>
        </section>

        {/* Recent Workflow Executions Section - Contained Card - ELEGANT - DARK MODE ONLY */}
        <section className="bg-zinc-900/50 shadow-md rounded-md border border-zinc-700/30 backdrop-blur-sm">
          {" "}
          {/* Dark Zinc Background */}
          <h2 className="text-2xl font-extrabold text-zinc-100 mb-4 tracking-tight">
            Recent Workflow Executions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-700">
              <thead className="bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-extrabold text-zinc-300 uppercase tracking-wider">
                    Workflow Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-extrabold text-zinc-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-extrabold text-zinc-300 uppercase tracking-wider">
                    Started At
                  </th>
                  {/* ... more headers ... */}
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-zinc-700">
                {/* Mock Data Rows */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-100 font-medium">
                    Text Summarization Workflow
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-700 text-zinc-100">
                      {" "}
                      {/* MUTED PURPLE BADGE */}
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                    2023-10-27 10:30 AM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-100 font-medium">
                    Image Classification Pipeline
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-300 text-zinc-800">
                      {" "}
                      {/* ZINC BADGE for contrast */}
                      Running
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                    2023-10-27 11:15 AM
                  </td>
                </tr>
                {/* ... more rows ... */}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="lg:col-span-4">
        <section className="bg-zinc-900/50 shadow-md rounded-md p-6 border border-zinc-700/30 backdrop-blur-sm">
          {" "}
          {/* Dark Zinc Background */}
          <h2 className="text-xl font-bold text-zinc-100 mb-5 tracking-tight">
            Credits Left
          </h2>
          {/* Placeholder for Status Breakdown Chart/Visual */}
          <div className="h-64 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-200 font-bold">
            300$
          </div>
        </section>
      </div>
    </div>
  );
};

// Re-done Workflow List Page - DARK CARD BACKGROUND - PURPLE ACCENTS - ELEGANT - DARK MODE ONLY
const WorkflowListPage = () => {
  return (
    <div className="text-white">
      {" "}
      {/* White Text for Heading */}
      <h1 className="text-3xl font-bold mb-6 tracking-tight">
        Workflow Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWorkflows.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    </div>
  );
};

// Re-done Workflow Detail Page - DARK CONTAINER BACKGROUND - PURPLE ACCENTS - ELEGANT - DARK MODE ONLY
const WorkflowDetailPage = () => {
  const { workflowId } = useParams();
  const workflowDetails = {
    id: workflowId,
    name: "Workflow Details: " + workflowId,
    description: "Detailed information and execution logs for this workflow.",
    status: "Running",
    executionHistory: [
      {
        timestamp: "2023-10-27 11:15 AM",
        status: "Started",
        details: "Workflow execution initiated.",
      },
      {
        timestamp: "2023-10-27 11:15:05 AM",
        status: "Task 1 - Running",
        details: "Processing data...",
      },
      {
        timestamp: "2023-10-27 11:15:15 AM",
        status: "Task 1 - Completed",
        details: "Data processing finished.",
      },
      // ... more history ...
    ],
  };

  return (
    <motion.div
      className="bg-zinc-900/50 shadow-md rounded-md p-8 border border-zinc-700/30 backdrop-blur-sm"
      layout
    >
      {" "}
      {/* Dark Zinc Background */}
      <h1 className="text-3xl font-bold text-purple-400 mb-8 tracking-tight">
        {" "}
        {/* ELEGANT PURPLE HEADING */}
        Workflow: {workflowDetails.name}
      </h1>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
          Description
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          {workflowDetails.description}
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
          Status
        </h2>
        <p className="text-purple-400 font-extrabold text-lg tracking-tight">
          {" "}
          {/* ELEGANT PURPLE STATUS */}
          {workflowDetails.status}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
          Execution History
        </h2>
        <ul className="divide-y divide-zinc-700">
          {workflowDetails.executionHistory.map((log, index) => (
            <li key={index} className="py-4">
              <div className="flex justify-between text-sm text-zinc-400 mb-1 tracking-tight">
                <span>{log.timestamp}</span>
                <span className="font-semibold text-purple-400">
                  {log.status}
                </span>{" "}
                {/* ELEGANT PURPLE STATUS TEXT */}
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {log.details}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Re-done Workflow Editor Page - DARK CONTAINER BACKGROUND - PURPLE BUTTON - ELEGANT - DARK MODE ONLY
const WorkflowEditorPage = () => {
  const handleSaveWorkflow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const workflowData = Object.fromEntries(formData.entries());
    console.log("Saving workflow:", workflowData);
    alert("Workflow data saved (console logged)");
  };

  return (
    <motion.div
      className="bg-zinc-900/50 shadow-md rounded-md p-8 max-w-3xl border border-zinc-700/30 backdrop-blur-sm"
      layout
    >
      {" "}
      {/* Dark Zinc Background */}
      <h1 className="text-3xl font-bold text-purple-400 mb-8 tracking-tight">
        {" "}
        {/* ELEGANT PURPLE HEADING */}
        Create New Workflow
      </h1>
      <form onSubmit={handleSaveWorkflow} className="space-y-6">
        <div>
          <label
            htmlFor="workflowName"
            className="block text-sm font-bold text-zinc-300 mb-2 tracking-tight"
          >
            Workflow Name
          </label>
          <input
            type="text"
            id="workflowName"
            name="workflowName"
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-zinc-100 bg-zinc-700 border-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 duration-200 font-medium" // MUTED PURPLE FOCUS RING
            placeholder="Enter workflow name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="workflowDescription"
            className="block text-sm font-bold text-zinc-300 mb-2 tracking-tight"
          >
            Description
          </label>
          <textarea
            id="workflowDescription"
            name="workflowDescription"
            className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-zinc-100 bg-zinc-700 border-zinc-600 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 duration-200 font-medium" // MUTED PURPLE FOCUS RING
            placeholder="Enter workflow description"
          />
        </div>

        {/* ... more form fields ... */}

        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="px-3 py-1.5 bg-purple-700 text-zinc-100 rounded-md hover:bg-purple-800 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-50 font-medium transition-colors duration-200 text-sm" // MUTED PURPLE BUTTON
            whileTap={{ scale: 0.98 }}
          >
            Save Workflow
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

// Mock Workflow Data - Keep this (NO CHANGES)
const mockWorkflows = [
  {
    id: "1",
    name: "Data Ingestion Pipeline",
    description: "Ingests data from various sources and formats it.",
    status: "Active",
  },
  {
    id: "2",
    name: "Machine Learning Model Training",
    description: "Trains a machine learning model for predictive analysis.",
    status: "Running",
  },
  {
    id: "3",
    name: "Report Generation Workflow",
    description: "Generates weekly performance reports and dashboards.",
    status: "Completed",
  },
  {
    id: "4",
    name: "Anomaly Detection System",
    description: "Real-time anomaly detection in system logs.",
    status: "Active",
  },
  {
    id: "5",
    name: "Customer Segmentation Analysis",
    description: "Segments customers based on behavior and demographics.",
    status: "Pending",
  },
  {
    id: "6",
    name: "A/B Testing Workflow",
    description: "Workflow for setting up and analyzing A/B tests.",
    status: "Draft",
  },
];

export default DashboardLayout;
export {
  DashboardPage,
  WorkflowListPage,
  WorkflowDetailPage,
  WorkflowEditorPage,
};
