import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../../services/Api";
import MovieCards from "../../components/MovieCards";
import { Skeleton } from 'primereact/skeleton';
import { AuthContext } from "../../contexts/AuthContext";

function MoviePageScreen() {
  const { token } = useContext(AuthContext);
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryMovies() {
      setLoading(true);
      try {
        const response = await axios.get(
          API.getMovies, // Ensure this is the correct endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryMovies();
  }, [token, category]);

  if (loading) {
    return <div><Skeleton width="10rem" height="4rem" /></div>;
  }

  return (
    <div className="MoviePageScreen">
      <section>
        {movies.length > 0 ? (
          <MovieCards videos={movies} /> // Ensure prop name matches MovieCards expectation
        ) : (
          <p>No movies found for this category.</p>
        )}
      </section>
    </div>
  );
}

export default MoviePageScreen;
