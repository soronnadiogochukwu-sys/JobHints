import "./JobCards.css";

function JobCards({ job, onOpen }) {
  const logo = job.logo || "/images/default-company.png";

  return (
    <div
      className="job-card clickable"
      role="button"
      tabIndex={0}
      onClick={() => onOpen && onOpen(job)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onOpen) {
          onOpen(job);
        }
      }}
    >
      <div className="company">
        <img
          src={logo}
          alt={`${job.company} logo`}
          onError={(e) => {
            e.currentTarget.src = "/images/default-company.png";
          }}
        />

        <div>
          <h4>{job.company}</h4>
          <p>{job.title}</p>
        </div>
      </div>

      <div className="job-info">
        <p>{job.location}</p>
        <span>{job.type}</span>
      </div>

      <div className="salary">
        <h3>{job.salary}</h3>

        {job.posted && <p>{job.posted}</p>}
      </div>
    </div>
  );
}

export default JobCards;