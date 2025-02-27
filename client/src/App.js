import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Dashboard from "./components/Dashbord";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from './components/LoginForm'
import UserInterface from './components/UserInterface'
import { connect } from "react-redux";
import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom'

const PrivateRoute = ({ element, isAuthenticated, isAdmin }) => {
  return  isAuthenticated ? 
            isAdmin? element : <Navigate to="/userInterface" />
          :<Navigate to="/login" />;
};

function App(props) {

  return (
    <div>
      <Dashboard/>
      {/*<Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path="/userInterface" element={<UserInterface/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard"
          element={<PrivateRoute element={<Dashboard/>} 
            isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin}
          />}
        />
      </Routes>*/}
    </div>
  );
}

const mapStateToProps =(state)=>{
  return{
      response : state.error,
      isAuthenticated : state.isAuthenticated,
      isAdmin : state.isAdmin
  }
}

export default connect(mapStateToProps) (App);
library.add(fab, fas, far)