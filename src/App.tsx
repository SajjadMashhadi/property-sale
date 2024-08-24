import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>home</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
