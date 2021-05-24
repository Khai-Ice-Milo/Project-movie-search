import axios from "axios";
import OneContent from "../../components/OneContent/OneContent";
import CustPagination from "../../components/Pagination/CustPagination";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../holder/useGenre";
import React, { useState, useEffect } from "react";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  // console.log(selectedGenres);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=e87731f13becefa826f6e5ce56429440&region=bn&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    console.log(data);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
      <div className="trending">
        {content && content.map((c) => <OneContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="movie" vote_average={c.vote_average} />)}
      </div>
      <CustPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Movies;
