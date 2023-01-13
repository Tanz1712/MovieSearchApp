import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./contextnew";

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  //using axios
  const getMovies = async (url) => {
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      const movies = await res.data;
      console.log(movies);
      // console.log(movies.Search);
      if (movies.Response === "True") {
        setIsLoading(false);
        setMovie(movies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading.....</div>
      </div>
    );
  }
  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="#" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating} / 10</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
