import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <div className="leftside">
          <Link to="/">
            <img src="../../src/assets/Logo.svg" alt="/" />
          </Link>
        </div>
        <div className="middleside">
            <ul>
                <li>
                    <Link to="/Verify">Verify</Link>
                </li>
                <li>
                    <Link to="/Registration">University</Link>
                </li>
                <li>
                    <Link to="/StudentRegistration">Student</Link>
                </li>
            </ul>
        </div>
        <div className="rightside">
            <button>
              <Link to="/student-login">
              Login
              </Link>
            </button>
            <button>
              <Link to="/institute-login">
              Institute Login
              </Link>
            </button>
            <button>Sign up</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
