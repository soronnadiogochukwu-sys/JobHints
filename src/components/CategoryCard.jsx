import { Link } from "react-router-dom";

function CategoryCard({ icon: Icon, title, jobs, path }) {
  return (
    <Link to={path} className="category-card">
      <div className="icon">
        <Icon />
      </div>

      <div>
        <h4>{title}</h4>
        <p>{jobs}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
