import { useNavigate } from "react-router-dom";
import "./BrowseCategories.css"
import CategoryCard from "../components/CategoryCard";
import CategoryData from "../data/CategoryData";
import { FaArrowRight } from "react-icons/fa6";

function BrowseCategories(){
  const navigate = useNavigate();

  return(
    <section className="browse">
      <div className="browse-header">
        <div>
          <h2>Browse Categories</h2>
          <p>Explore all job categories and find the right fit for your next role.</p>
        </div>

        <button className="view-all-btn" onClick={() => navigate("/jobs") }>
          View All Categories
          <FaArrowRight/>
        </button>
      </div>

      <div className="category-grid">
        {CategoryData.map((item) => (
          <CategoryCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

export default BrowseCategories;