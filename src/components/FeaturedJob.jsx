import { useNavigate } from "react-router-dom";
import "./FeaturedJobs.css";
import jobs from "../data/Jobs";
import JobCard from "../components/JobCards";
import { FaArrowRight } from "react-icons/fa6";

function FeaturedJob({ onOpen }) {
    const navigate = useNavigate();

    return (
        <section className="featured">
            <div className="heading">
                <h2>Featured Jobs For Graduates</h2>
                <button className="view-all-btn" onClick={() => navigate("/jobs") }>
                    View All Jobs
                    <FaArrowRight/>
                </button>
            </div>

            <div className="job-grid">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} onOpen={onOpen} />
                ))}
            </div>
        </section>
    );
}

export default FeaturedJob;