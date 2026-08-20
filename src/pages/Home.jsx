import Navbar from "../components/Navbar";
import FeaturedJob from "../components/FeaturedJob";
import BrowseCategories from "../components/BrowseCategories";
import FeaturedArtisans from "../components/FeaturedArtisans";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import TestiMonials from "../components/TestiMonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
function Home({ onOpen, currentUser, openLogin, openSignup }) {
    return (
        <>
          <Hero/>
           <SearchBar/>
            <BrowseCategories/>
            <FeaturedJob onOpen={onOpen} />
            <FeaturedArtisans
              currentUser={currentUser}
              openLogin={openLogin}
              openSignup={openSignup}
            />
            <HowItWorks/>
            <TestiMonials/>
            <Newsletter/>
            <Footer/>
        </>
    );
}

export default Home;