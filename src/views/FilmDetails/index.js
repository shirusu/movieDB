import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";
import Spinner from "../../component/Spinner";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import TrailerVideo from "../../component/ModalVideo";


const FilmDetails = () => {
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const [trailers, setTrailers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [actorsLoading, setActorsLoading] = useState(true)
    const [videosLoading, setVideosLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=49d369ec18da0306df36ce181fe80257`)
            .then(({data}) => {
                setFilm(data)
                setIsLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=49d369ec18da0306df36ce181fe80257`)
            .then(({data}) => {
                setTrailers(data.results)
                setVideosLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=49d369ec18da0306df36ce181fe80257`)
            .then(({data}) => {
                setActors(data.cast)
                setActorsLoading(false)
            })
    }, [params.id])

    if (isLoading && actorsLoading && videosLoading) {
        return <Spinner/>
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${film.poster_path}`}
                         alt="film.title" className="w-100"/>
                </div>
                <div className="col-md-6">
                    <h3>{film.title}</h3>
                    <p>Overview:{film.overview}</p>
                    <p>Vote average: {film.vote_average}</p>
                    <p>Budget: ${film.budget}</p>
                    <h4>Countries:</h4>
                    {
                        film.production_countries.map(country =>
                            <div key={country.id}>{country.name}</div>
                        )
                    }
                    <h4>Production Companies:</h4>
                    {
                        film.production_companies.map(company =>
                            <div key={company.id}>{company.name}</div>
                        )
                    }
                    <h3 className="mt-5">Top Billed Cast</h3>
                    <OwlCarousel className='owl-theme mt-4' margin={10} dots={false} nav>
                        {
                            actors.slice(0, 10).map(actor =>
                                <div>
                                    <img className="rounded mx-2 my-2"
                                         src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`}
                                         alt={actor.character}/>
                                    <div>{actor.character}</div>
                                </div>
                            )
                        }
                    </OwlCarousel>

                </div>

            </div>
            {
                trailers.map(item =>
                    <TrailerVideo key={item.id} id={item.key}/>
                )
            }
        </div>
    );
};

export default FilmDetails;