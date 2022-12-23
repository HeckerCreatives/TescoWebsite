//
import "./App.css";
import { authRoute } from "./routing/allRoutes";
import RoutePathComponent from "./shared/Route/RoutePathComponent";

function App() {
  return (
    <div className="App">
      {authRoute.map((each, index) => (
        <RoutePathComponent
          path={each?.path}
          component={each?.component}
          id={index}
        />
      ))}
    </div>
  );
}

export default App;
