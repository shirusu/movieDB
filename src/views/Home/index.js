import React, {useState, useEffect} from 'react';
import axios from "axios";
import Spinner from "../../component/Spinner";
import {Link} from "react-router-dom";

const Home = () => {
    const [page, setPage] = useState(1)
    const [films, setFilms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const handlePage = (num) => {
        setPage(num)
    }
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=49d369ec18da0306df36ce181fe80257`)
            .then(({data}) => {
                setFilms(data.results)
                setIsLoading(false)
            })
    }, [page])

    if (isLoading) return <Spinner/>
    return (
        <div>
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} type="button"
                            className={`btn btn-secondary mx-1 ${page === item + 1 && "btn-info"}`}
                            onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
            <div className="row my-5">
                {
                    films.map(film =>
                        <div className="col-md-3 col-sm-6 mb-3" key={film.id}>
                            <Link to={`/film/${film.id}`}>
                                <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${film.poster_path}`}
                                     alt="film.title" className="w-100"/>
                                <h5 className="mt-4">{film.original_title}</h5>
                            </Link>
                            <p className="text-muted">{film.release_date}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;