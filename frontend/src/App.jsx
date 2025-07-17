import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JobList from "./components/JobList";
import JobForm from "./pages/JobForm";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Top Navigation */}
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Job Tracker</h1>
        </header>

        {/* Page Content */}
        <div className="flex flex-1">
          {/* sidebar */}
          <aside className="w-64 bg-gray-100 p-4">
            <p>sidebar</p>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 bg-white">
            <JobForm />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
