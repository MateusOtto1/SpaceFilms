import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/original";
    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const[movies, setMovies] = useState([]);
    const [genero, setGenero] = useState([]);
    const [scrolled, setScrolled] = useState(false);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
    };

    const movieChunks = [];
    for (let i = 0; i < movies.length; i += movies.length) {
        movieChunks.push(movies.slice(i, i + movies.length));
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${genero}`)
        .then((response) => response.json())
        .then((data) => {
            setMovies(data.results);
            console.log(movie);
        });
        document.querySelector('.body-desc').style.backgroundImage = `url(${imagePath}${movie.backdrop_path})`;
    }, [genero]);


    useEffect(() => {
        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        const isAlreadyFavorite = favoriteMovies.some((favoriteMovie) => favoriteMovie.id == id);
        setIsFavorite(isAlreadyFavorite);
    }, [id]);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setMovie(data);
                    const generos = data.genres.map((genero) => genero.id);
                    setGenero(generos.join(", "));
                } else {
                    console.error("No movie data found in the API response.");
                }
            }); // eslint-disable-next-line
    });

    const toggleFavorite = () => {
        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        const isAlreadyFavorite = favoriteMovies.some((favoriteMovie) => favoriteMovie.id == id);
    
        if (isAlreadyFavorite) {
            const updatedFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie.id != id);
            localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavoriteMovies));
            setIsFavorite(false);
        } else {
            favoriteMovies.push(movie);
            localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
            setIsFavorite(true);
        }
    };

    const handleClick = () => {
        navigate('/');
    }

    const handleClickFavoritos = () => {
        navigate('/favoritos');
    }

    return (
        <>
        <Navbar expand="lg" className={`NavBar ${scrolled ? "scrolled" : ""}`}>
                <Container fluid>
                    <Navbar.Brand href="#" className="titulo-navbar">SpaceFilms</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className="risquinhos" />
                    <Navbar.Collapse id="navbarScroll ">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="letra-navbar home" onClick={handleClick}>Home</Nav.Link>
                            <Nav.Link className="letra-navbar favoritos" onClick={handleClickFavoritos}>Favoritos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <div className="body-desc">
            <div className="base-desc">
                 <nav>
                    
                </nav>
                <div className="container-desc-tudo">
                    <div className="conteinar-desc">
                        <div className="container-desc-img">
                            <img className="img_movie" src={`${imagePath}${movie.poster_path}`} alt="{movie.title}" />
                        </div>
                        <div className="container-desc-text">
                            <h1>{movie.title}</h1>
                            <h3>Data de lançamento: {movie.release_date}</h3>
                            <h4>Descrição: </h4>
                            <p>{movie.overview}</p>
                            <div className="container-desc-btn">
                                <Link to="/">
                                    <button className="button-85">Voltar</button>
                                </Link>
                                <button class="button-85" role="button" onClick={toggleFavorite}>
                                    {isFavorite ? "Desfavoritar" : "Favoritar"}
                                </button>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
        <div className="bg">
        <div className="container-home">
                {movieChunks.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index}>
                                <h2>Filmes Semelhantes</h2>
                                <div className="cont-h">
                                    <Slider
                                        key={index}
                                        {...carouselSettings}
                                        slidesToShow={matches ? 1 : 4}
                                        className="slider"
                                    >
                                        {chunk.map((movie) => {
                                            return (
                                                <div className="teste">
                                                    <Link to={`/${movie.id}`} className="link">
                                                        <div className="card" key={movie.id}>
                                                            <img src={`${imagePath}${movie.poster_path}`} alt="{movie.title}" className="img" />
                                                            <div className="content">
                                                                <span>{movie.title}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                        <div id="anime"></div>
                                    </Slider>
                                </div>
                                
                            </div>
                        )}
                    </MediaQuery>
                ))}
            </div>
            </div>
        </>
    );
};
export default Movie;