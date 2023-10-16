import React, {  useState,useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
    const [movie,setMovie] = useState([]); /*this is used to get the different movie in the banner everytime you refresh*/

    useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) /*this generates random movies when clicked refresh*/
      ]);
      return request;
    }
    fetchData();
    }, []);

    console.log(movie);

    function truncate(str,n) { /* truncate is used to reduce the description in the banner*/
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
          style={{
              backgroundSize: "cover",
              backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
              backgroundPosition: "centre center",
          }}
        >
            <div className="banner_contents">

            {/* adds title */}
            <h1 className="banner_title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/* adds play and add to favorites in the banner */}
            <div className="banner_buttons">
              <button className="banner_button">Play</button> 
              <button className="banner_button">Add to Favorites</button>
            </div>

            {/* adds description in the banner */}
            <h1 className="banner_description">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>

          <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner;