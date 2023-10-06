import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style-home.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import MediaQuery from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [moviesAnime, setMoviesAnime] = useState([]);
    const [moviesComedia, setMoviesComedia] = useState([]);
    const [moviesTerror, setMoviesTerror] = useState([]);
    const [moviesRomance, setMoviesRomance] = useState([]);
    const [moviesFicao, setMoviesFicao] = useState([]);
    const [desaparece, setDesaparece] = useState(false);
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
    const movieChunksAnime = [];
    for (let i = 0; i < moviesAnime.length; i += moviesAnime.length) {
        movieChunksAnime.push(moviesAnime.slice(i, i + moviesAnime.length));
    };
    const movieChunksComedia = [];
    for (let i = 0; i < moviesComedia.length; i += moviesComedia.length) {
        movieChunksComedia.push(moviesComedia.slice(i, i + moviesComedia.length));
    };
    const movieChunksTerror = [];
    for (let i = 0; i < moviesTerror.length; i += moviesTerror.length) {
        movieChunksTerror.push(moviesTerror.slice(i, i + moviesTerror.length));
    };
    const movieChunksRomance = [];
    for (let i = 0; i < moviesRomance.length; i += moviesRomance.length) {
        movieChunksRomance.push(moviesRomance.slice(i, i + moviesRomance.length));
    };
    const movieChunksFicao = [];
    for (let i = 0; i < moviesFicao.length; i += moviesFicao.length) {
        movieChunksFicao.push(moviesFicao.slice(i, i + moviesFicao.length));
    };

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR`)
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data.results);
                });
        }
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
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
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setDesaparece(true);
            } else {
                setDesaparece(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        navigate('/');
    }

    const handleClickFavoritos = () => {
        navigate('/favoritos');
    }

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=16`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesAnime(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR&with_genres=16`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesAnime(data.results);
                });
        }
    });

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=35`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesComedia(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR&with_genres=35`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesComedia(data.results);
                });
        }
    });

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=27`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesTerror(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR&with_genres=27`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesTerror(data.results);
                });
        }
    });

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=10749`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesRomance(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR&with_genres=10749`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesRomance(data.results);
                });
        }
    });

    useEffect(() => {
        if (searchTerm.trim() == "") {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=878`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesFicao(data.results);
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR&with_genres=878`)
                .then((response) => response.json())
                .then((data) => {
                    setMoviesFicao(data.results);
                });
        }
    });

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
                            <NavDropdown title="Gêneros" id="basic-nav-dropdown" className="letra-navbar">
                                <NavDropdown.Item href="#anime" className="escolha">Anime</NavDropdown.Item>
                                <NavDropdown.Item href="#comedia" className="escolha">Comédia</NavDropdown.Item>
                                <NavDropdown.Item href="#terror" className="escolha">Terror</NavDropdown.Item>
                                <NavDropdown.Item href="#romance" className="escolha">Romance</NavDropdown.Item>
                                <NavDropdown.Item href="#ficao" className="escolha">Ficção Científica</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex container-input">
                            <Form.Control
                                type="search"
                                placeholder="Buscar Filme..."
                                className="me-2 input-navbar"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="banner">
                <div className="base">
                    <div className={`container-base some ${desaparece ? "desaparece" : ""}`}>
                        <div className="container-banner">
                            <h1 className="titulo-banner">SpaceFilms</h1>
                            <h4 className="subtitulo-banner">Viaje em seus filmes com o SpaceFilms!</h4>
                            <h4 className="subsubtitulo-banner">O SpaceFilms é o seu portal para o universo da ficção científica. Aqui, você pode explorar mundos alienígenas, conhecer novas formas de vida e testemunhar as aventuras mais incríveis que a imaginação humana pode criar.</h4>
                        </div>
                        <div className="container-btn-filmes">
                            <p className="descricao-btnfilme">Ache os melhores filmes aqui!</p>
                            <div className="div-btn-filmes">
                                <a href="#filmes">
                                    <button className="button-85">Filmes</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="filmes"></div>
                </div>
            </div>
            <div className="container-home">
                {movieChunks.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index}>
                                <h2>Mais Populares</h2>
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
                {movieChunksAnime.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index} >
                                <h2 className="espaco-carrosel">Anime</h2>
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
                                        <div id="comedia"></div>
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                ))}
                {movieChunksComedia.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index}>
                                <h2 className="espaco-carrosel">Comédia</h2>
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
                                        <div id="terror"></div>
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                ))}
                {movieChunksTerror.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index}>
                                <h2 className="espaco-carrosel">Terror</h2>
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
                                        <div id="romance"></div>
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                ))}
                {movieChunksRomance.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index} >
                                <h2 className="espaco-carrosel">Romance</h2>
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
                                        <div id="ficao"></div>
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                ))}
                {movieChunksFicao.map((chunk, index) => (
                    <MediaQuery key={index} maxWidth={1100} className="media">
                        {(matches) => (
                            <div key={index} >
                                <h2 className="espaco-carrosel">Ficção Científica</h2>
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

                                    </Slider>
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                ))}
            </div>
        </>
    );
}

export default Home;