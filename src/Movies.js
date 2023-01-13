import React from "react";
import { NavLink } from "react-router-dom";
//import { useGlobalContext } from "./context";

import { useGlobalContext } from "./contextnew";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const imgUrl = "https://via.placeholder.com/200/200";

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <div>
        <div className="loading">Loading .....</div>;
      </div>
    );
  }
  return (
    <>
      {/* if movie is present then only show data else loading  */}
      <section className="movie-page">
        <div className="container grid grid-4-col">
          {movie
            ? movie.map((currMovie) => {
                const { Title, Poster, imdbID } = currMovie;
                const movieName = Title.substring(0, 15);
                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length >= 15
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <img src={Poster === "N/A" ? imgUrl : Poster} alt="#" />
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movies;
