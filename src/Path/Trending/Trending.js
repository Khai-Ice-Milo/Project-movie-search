import React, { useEffect, useState } from "react";
import axios from "axios";
import OneContent from "../../components/OneContent/OneContent";
import "./Trending.css";
import CustPagination from "../../components/Pagination/CustPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e87731f13becefa826f6e5ce56429440&page=${page}&region=bn&include_adult=false`);

    console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content && content.map((c) => <OneContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average} />)}
      </div>
      <CustPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
