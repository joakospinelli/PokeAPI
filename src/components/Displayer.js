import React, { useEffect } from 'react';
import Pokemon from './Pokemon';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Displayer(props) {

    const [ pokemons, setPokemons ] = useState(props.data);
    
    const [ page, setPage ] = useState(1);

    const getNextPage = async () => {
        if (pokemons.next)
            if (!isNaN(parseInt(page))) setPage(parseInt(page) + 1);
    }

    const getPreviousPage = async () => {
        if (pokemons.previous)
            if (!isNaN(parseInt(page))) setPage(parseInt(page) - 1);
    }

    const renderPokemons = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${ (page - 1) * 24 }&limit=24`;
        const api = await fetch(url);
        const info = await api.json();
        setPokemons(info);
    }

    const disableButtons = () => {
        pokemons.next ? (
            document.getElementById('nextBtn').disabled = false
        ) : (
            document.getElementById('nextBtn').disabled = true
        );

        pokemons.previous ? (
            document.getElementById('prevBtn').disabled = false
            ) : (
                document.getElementById('prevBtn').disabled = true  
        ) 
    }

    const handleChange = (event) => {
        event.preventDefault();
        setPage(event.target.value);      
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // Uso una función aparte porque la función del useEffect tiene que ser sincrónica
    const renderPage = () => {
        if ((page >= 1 && page <= 49)) {
            setPokemons([]);
            renderPokemons();
        }
    }

    useEffect(disableButtons, [pokemons]);

    useEffect(renderPage
            // eslint-disable-next-line react-hooks/exhaustive-deps
            , [page]);

    return(
        <div className="display">
            <Container>
                <div className="search-page">
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group>
                            <Form.Label><h3>Buscar por página</h3></Form.Label>
                            <Form.Control className="search-form" type="number" min="1" max="49" value={page} onChange={handleChange}></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                {(pokemons.length !== 0) ? (<Row className="row-display no-gutters">
                    {pokemons.results.map((pokemon, i) =>(
                    <Col key={i} md={2}>
                        <Pokemon data={pokemon} key={i} id={i}></Pokemon>
                    </Col>
                    ))}
                </Row>) : (
                    <></>
                )}
                <div className="btn-container">
                    <Button variant="secondary" className="displayer-btn" id="prevBtn" onClick ={ getPreviousPage }>
                        <i className="bi bi-caret-left-fill">Página anterior</i>
                    </Button>
                    <Button variant="danger" className="displayer-btn" id="nextBtn" onClick={ getNextPage }>
                        <i className="bi bi-caret-right-fill"></i>
                        <i>Página siguiente</i>
                    </Button>
                </div>
            </Container>

            <footer>
                <p style={{ opacity: '0.7' }}>Desarrollado por Joaquín Spinelli porque estaba aburrido.</p>
            </footer>
        </div>
    )
}

export default Displayer;