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
// function CategoryCard({category})
// {
//     const  Icon = category.icon;
//     return(
// <Link 
//   to={`/jobs/$
//     {category.name.toLowerCase()}`}
//     className="card"
//     >
//   <div className="icon-box"
//   style={{background: category.color}}>
//   <Icon size={30}/>
        
// </div>
// <div>
//     <h3>{category.name}</h3>
//     <p>{category.jobs.toLocaleString()} jobs available</p>
// </div>
//     </Link>
//     );
// }
// export default CategoryCard;
