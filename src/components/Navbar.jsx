import { FaBriefcase } from "react-icons/fa";
import logo from "../assets/logo/job.Logo.jpg"
function Navbar({title, links, buttons }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaBriefcase className="icon"/>
        <h3>{title}</h3>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="buttons">
        <a href={buttons.login.href}>
          <button className="login-btn">
            {buttons.login.text}
          </button>
        </a>

        <a href={buttons.signup.href}>
          <button className="signup-btn">
            {buttons.signup.text}
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;