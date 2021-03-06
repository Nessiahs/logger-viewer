import { Link, RouteComponentProps, Router } from "@reach/router";
import React from "react";
import "./App.css";
import { Icon } from "./components/Icon";
import { Sidebar } from "./components/Sidebar";
import { Upload } from "./components/Upload";

const Home = (props: RouteComponentProps) => {
  return <h1>Wellcome</h1>;
};

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-gray-700 text-red-50">
        <div className="container flex justify-between mx-auto ">
          <Link to="/">
            <div className="flex">
              <div className="mr-5 pt-2">
                <Icon icon="DEV_BRANDS" />
              </div>
              <div className="pt-1">React PWA Logfile Viewer</div>
            </div>
          </Link>
        </div>
      </header>

      <div className=" h-full">
        <main className="h-full container mx-auto flex flex-row border border-gray-300">
          <Sidebar />
          <div className="container border border-gray-300">
            <Router>
              <Home path="/" />
              <Upload path="/import/" />
            </Router>
          </div>
        </main>
      </div>

      <div className="h-10 bg-gray-700 text-red-50">
        <footer className="container mx-auto">footer</footer>
      </div>
    </div>
  );
}

export default App;
