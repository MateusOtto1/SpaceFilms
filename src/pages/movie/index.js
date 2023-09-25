import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    const navigate = useNavigate();

    useEffect(() => {
        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        const isAlreadyFavorite = favoriteMovies.some((favoriteMovie) => favoriteMovie.id == id);
        setIsFavorite(isAlreadyFavorite);
    }, [id]);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data) {
                    setMovie(data);
                } else {
                    console.error("No movie data found in the API response.");
                }
            }); // eslint-disable-next-line
    }, []);

    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.NavBar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
        <Navbar expand="lg" className="NavBar">
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
        </>
    );
};
export default Movie;