import Wrapper from "../wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.svg';

const Landing = () => {
    return(
        <Wrapper>
            <nav>
            <img src={logo} alt='jobify' className='logo' />
            </nav>
            <div className="container page">
                <div className="info">
                <h1>Job <span>Tracking</span> App</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Sed nobis qui tempora voluptates facere pariatur 
                    eveniet similique distinctio, explicabo eligendi ea ipsam 
                    illum perferendis dolorum vel! Odit cum magni repellat.
                </p>
                <Link to="/register" className="btn register-link">Register</Link>
                <Link to="/login" className="btn">Login</Link>
                </div>
                <img src={main} alt="job hunt" className="img main-img"/>
            </div>
        </Wrapper>
    );
}

export default Landing;