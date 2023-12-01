import React from "react";
import SideMenuNav from "./components/SideMenu";
import ToDoPage from "./pages/ToDoPage";
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const initialGlobalState = {
  todos: [],
};

// Create a Context for the (global) State
const GlobalState = React.createContext();

class Global extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial (global) State
    this.state = {
      globals: initialGlobalState || {},
    };
  }

  // Expose the setGlobals function to the Globals object
  componentDidMount() {
    GlobalState.set = this.setGlobalState;
  }

  setGlobalState = (data = {}) => {
    const { globals } = this.state;

    // Loop over the data items by key, only updating those which have changed
    Object.keys(data).forEach((key) => {
      globals[key] = data[key];
    });

    // Update the state with the new State
    this.setState(globals);
  };

  render() {
    const { globals } = this.state;
    const { Root } = this.props;

    return (
      // Pass the current value of GlobalState, based on this components' State, down
      <GlobalState.Provider value={globals}>
        <Root />
      </GlobalState.Provider>
    );
  }
}

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);

function SideBarMenu() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <aside style={{ width: "10%", flexShrink: "0" }}>
          <SideMenuNav />
        </aside>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return <Global Root={SideBarMenu}></Global>;
}

export { useGlobalState };
// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;
