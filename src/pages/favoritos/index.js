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

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const moviesSaved = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        setFavoriteMovies(moviesSaved);
    }, []);

    useEffect(() => {
        const moviesFiltered = favoriteMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(moviesFiltered);
    }, [searchTerm, favoriteMovies]);

    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.NavBar');
        if (window.scrollY >= 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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


            <ContainerCss>
                <div className="favoritos-cont">
                    <div className="container-home">
                    {searchResults.map((movie) => {
                        return (
                            <Link to={`/${movie.id}`} className="link">
                                <div className="card" key={movie.id}>
                                    <img src={`${imagePath}${movie.poster_path}`} alt="{movie.title}" className="img"/>
                                    <div className="content">
                                        <span>{movie.title}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    </div>
                </div>
                
            </ContainerCss>
        </>
    );
}

export default Home;