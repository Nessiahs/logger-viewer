import { Link, RouteComponentProps, Router } from "@reach/router";
import React from "react";
import "./App.css";
import { Upload } from "./components/Upload";

const Home = (props: RouteComponentProps) => {
  return <h1>Wellcome</h1>;
};

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500 p-0.5">
        <div className="container flex justify-between mx-auto">
          <div>React PWA Logfile Viewer</div>
          <div className="" style={{ border: "1px solid deeppink" }}>
            <Link to="/">Home</Link>
            <Link to="/import">Import</Link>
          </div>
        </div>
      </header>

      <div className=" h-full bg-green-500">
        <main
          className="h-full container mx-auto">
          <Router>
            <Home path="/" />
            <Upload path="/import/" />
          </Router>
        </main>
      </div>

      <div className="h-10 bg-blue-500">
        <footer className="container mx-auto">footer</footer>
      </div>
    </div>
  );
}

export default App;
