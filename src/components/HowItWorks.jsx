import "./HowItWorks.css"
import {
  FaUserPlus,
  FaFileLines,
  FaBriefcase,
  FaCircleCheck,
} from "react-icons/fa6";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: FaUserPlus,
      title: "Create Account",
      description:
        "Sign up as a job seeker, artisan or employer.",
    },
    {
      id: 2,
      icon: FaFileLines,
      title: "Complete Profile",
      description:
        "Add your details and skills to stand out.",
    },
    {
      id: 3,
      icon: FaBriefcase,
      title: "Find or Post",
      description:
        "Search jobs or post jobs / services.",
    },
    {
      id: 4,
      icon: FaCircleCheck,
      title: "Get Hired",
      description:
        "Connect, apply or hire and get the job done.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-heading">
        <h2>How It Works</h2>
        <div className="heading-line"></div>
      </div>

      <div className="steps-container">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div className="step" key={step.id}>
              <div className="step-icon">
                <Icon />
                <span className="step-number">
                  {step.id}
                </span>
              </div>

              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;