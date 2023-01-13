import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;

// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("love");

  //using fetch
  //   const getMovies = async (url) => {
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       console.log(data);
  //       if(data.Response === "True") {
  //         setIsLoading(false);
  //         setMovie(data.Search);
  //       } else {
  //         setIsError({
  //             show: "true",
  //             msg: data.Error
  //         })
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //using axios
  const getMovies = async (url) => {
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      const movies = await res.data;
      console.log(movies);
      // const data = await res.json();
      // console.log(movies.Search);
      if (movies.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: "false",
          msg: "",
        });
        setMovie(movies.Search);
      } else {
        setIsError({
          show: "true",
          msg: movies.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ query, movie, setQuery, isLoading, isError }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
