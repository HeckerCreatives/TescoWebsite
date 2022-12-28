import "./App.css";
import { authRoute } from "./routing/allRoutes";
import RoutePathComponent from "./shared/Route/RoutePathComponent";
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/login/Login";
import Setting from "./component/SettingComponent/SettingComponent";
import QuestionChoice from "./component/QuestionChoiceComponent/QuestionChoice";
import Dashboard from "./pages/dashboard/Dashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";



function App() {
  return (
    <div className="App">
      {/* {authRoute.map((each, index) => (
        <RoutePathComponent
          path={each?.path}
          component={each?.component}
          id={index}
        />
      ))} */}
      <Routes>
      <Route path='/'   element={<Login/>}/>
      <Route path='/:name'   element={<Dashboard/>}/>
      <Route path='/sub-dashboard/:name'   element={<TeacherDashboard/>}/>
     
  
      </Routes>
    </div>
  );
}

export default App;
