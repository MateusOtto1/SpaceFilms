import { useEffect, useState } from "react";
import { ContainerCss } from "./style";
import { Link } from "react-router-dom";
import "../css/style-home.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchTerm}&language=pt-BR`)
                .then((response) => response.json())
                .then((data) => {

                    setMovies(data.results);
                })
                .catch((error) => {
                    console.error("Erro ao buscar filmes:", error);
                });
        }
    });

    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.NavBar');
        if (window.scrollY > 600) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.addEventListener('scroll', function () {
        var tituloBanner = document.querySelector('.some');
        if (window.scrollY > 100) {
            tituloBanner.classList.add('desaparece');
        } else {
            tituloBanner.classList.remove('desaparece');
        }
    });

    const handleClick = () => {
        navigate('/');
    }

    const handleClickFavoritos = () => {
        navigate('/favoritos');
    }

    const Acao = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=28`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }

    const Comedia = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=35`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }

    const Terror = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=27`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }

    const Romance = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=10749`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }

    const Ficao = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=878`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
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
                            <NavDropdown title="Gêneros" id="basic-nav-dropdown" className="letra-navbar">
                                <NavDropdown.Item onClick={Acao} className="escolha">Ação</NavDropdown.Item>
                                <NavDropdown.Item onClick={Comedia} className="escolha">Comédia</NavDropdown.Item>
                                <NavDropdown.Item onClick={Terror} className="escolha">Terror</NavDropdown.Item>
                                <NavDropdown.Item onClick={Romance} className="escolha">Romance</NavDropdown.Item>
                                <NavDropdown.Item onClick={Ficao} className="escolha">Ficção Científica</NavDropdown.Item>
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
                    <div className="container-base some">
                        <div className="container-banner">
                            <h1 className="titulo-banner">SpaceFilms</h1>
                            <h4 className="subtitulo-banner">Viaje em seus filmes com o SpaceFilms!</h4>
                            <h4 className="subsubtitulo-banner">O SpaceFilms é o seu portal para o universo da ficção científica. Aqui, você pode explorar mundos alienígenas, conhecer novas formas de vida e testemunhar as aventuras mais incríveis que a imaginação humana pode criar.</h4>
                        </div>
                        <div className="container-btn-filmes">
                            <p className="descricao-btnfilme">Ache seus filmes aqui!</p>
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

            <ContainerCss>
                <div className="container-home">
                    {movies.map((movie) => {
                        return (
                            <Link to={`/${movie.id}`} className="link">
                                <div className="card" key={movie.id}>
                                    <img src={`${imagePath}${movie.poster_path}`} alt="{movie.title}" className="img" />
                                    <div className="content">
                                        <span>{movie.title}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </ContainerCss>
        </>
    );
}

export default Home;