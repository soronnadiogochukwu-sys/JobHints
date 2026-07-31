import "./SearchBar.css"
import {
 FaSearch,
 FaMapMarkerAlt
} from "react-icons/fa";

import { HiOutlineViewGrid } from "react-icons/hi";

import Locations from "../data/Locations";
import Categories from "../data/Categories";

function SearchBar(){
    return(
        <div className="search-container">
            <div className="search-box">

    {/* Job Search */}

    <div className="search-input">

     <FaSearch className="icon"/>
    <input type="text" placeholder="Job title, keyword..."/>
   </div>

   {/* Location */}
   <div className="search-input">
    <FaMapMarkerAlt className="icon"/>
    <select>
   {
    Locations.map((location, index) =>(
    <option
    key={index}
    value={location}
    >
        {location}
    </option>
    ))
   }
    </select>
    </div>

    {/* Categories */}
    <div className="search-input">
        <HiOutlineViewGrid className="icon"/>

        <select>
            {
                Categories.map((category, index)=>(
            <option
            key={index}
            value={category}
            >
             {category}   
            </option>
                ))
            }
        </select>
    </div>
        </div>

<button>

<FaSearch/>
Search
</button>

{/* Popular Searches */}
 <div className="popular-searches">
<p>Popular Searches:</p>

<span>Developer</span>

<span>Electrician</span>

<span>Teacher</span>

<span>Accountant</span>

<span>Driver</span>
 </div>
</div>
    )
}

export default SearchBar