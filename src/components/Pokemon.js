import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import noSprites from "../assets/no-sprites.png";
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Pokemon(props) {

    const { data } = props;

    const [ pokemon, setPokemon ] = useState(null);

    const getColorByType = (color) => {
        
        switch (color){
            case 'bug': return '#d2fa75';
            case 'dark': return '#746a8f';
            case 'dragon': return '#6573db';
            case 'electric': return '#ffe570';
            case 'fairy': return '#faaae8';
            case 'fighting': return '#d65c5a';
            case 'fire': return '#fc8365';
            case 'flying': return '#a3cad6';
            case 'ghost': return '#8364ed';
            case 'grass': return '#7fd665';
            case 'ground': return '#bf8563';
            case 'ice': return '#9adbd3';
            case 'normal': return '#c8d1db';
            case 'poison': return '#b78acf';
            case 'psychic': return '#ff8093';
            case 'rock': return '#dbb68c';
            case 'steel': return '#7693a8';
            case 'water': return '#5db2fc';
            default: return 'white';
        }
    }
    
    const getPokemon = async () => {
        await fetch(data.url)
        .then((res) => res.json())
        .then((res) => setPokemon(res))
    }

    const renderPokemon = () => {
        if (pokemon) document.getElementById(`pokemon-${pokemon.id}`).style.backgroundColor = getColorByType(pokemon.types[0].type.name);
    }
    
    const formatString = (str) => {

        let newName = str.split('');
        newName[0] = newName[0].toUpperCase();

        newName = newName.join('');

        if (newName.includes('-')){
            let secondName = newName.split('-');
            secondName[1] = secondName[1].split('');
            secondName[1][0] = secondName[1][0].toUpperCase();
            secondName[1] = secondName[1].join('')
            newName = secondName.join(' ');
        }

        return newName;
    }

    const getStatVariant = (name) => {
        switch (name) {
            case 'hp': return 'success';
            case 'attack': return 'danger';
            case 'defense': return 'warning';
            case 'speed': return 'info';
            case 'special-attack': return 'danger striped';
            case 'special-defense': return 'warning';
            default: return undefined;
        }
    }

    const [ modal, setModal ] = useState(false);

    const closeModal = () => setModal(false);
    const showModal = () => setModal(true);

    useEffect(renderPokemon, [ pokemon ]);

    getPokemon();

    return(
        <div>
            {pokemon ? (
            <>
                <Card id={`pokemon-${pokemon.id}`} onClick={showModal}>
                    <Card.Header>
                        <Card.Title>{formatString(pokemon.name)}</Card.Title>
                        <Card.Subtitle className="subtitle">#{pokemon.id}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        {pokemon.sprites.front_default ? (
                        <img src={pokemon.sprites.front_default} alt="Front default"></img>
                        ) : (
                            <img src={noSprites} alt="No sprites"></img>
                        )}
                        <div>
                            {
                                pokemon.types.map((type, i) => (
                                    <img key={i} src={require(`../assets/types/${type.type.name}.png`)} alt={type.type.name} className="type-logo"></img>
                                ))
                            }
                        </div>
                    </Card.Body>
                    </Card>

                    <Modal show={modal} onHide={closeModal} centered>
                        <Modal.Header>

                            <Modal.Title>
                                <span className="types-modal">
                                    {
                                        pokemon.types.map((type, i) => (
                                            <img key={i}
                                                src={require(`../assets/types/${type.type.name}.png`)}
                                                alt={type.type.name} 
                                                className="type-logo">
                                            </img>
                                        ))
                                    }
                                </span>
                                {formatString(pokemon.name)} <span className="subtitle">#{pokemon.id}</span>
                                <i className="bi bi-x-lg" onClick={ closeModal }></i>
                            </Modal.Title>

                        </Modal.Header>

                        <Modal.Body>
                            <Container>
                                <Row className="row justify-content-center">
                                    <Col md={3} xs>
                                        <img src={ pokemon.sprites.front_default ? pokemon.sprites.front_default : noSprites } alt="front default"/>
                                    </Col>
                                    <Col md={3} xs>
                                        <img src={ pokemon.sprites.back_default ? pokemon.sprites.back_default : noSprites } alt="back default"/>
                                    </Col>
                                    <Col md={3} xs>
                                        <img src={ pokemon.sprites.front_shiny ? pokemon.sprites.front_shiny : noSprites } alt="front shiny"/>
                                    </Col>
                                    <Col md={3} xs>
                                        <img src={ pokemon.sprites.back_shiny ? pokemon.sprites.back_shiny : noSprites } alt="back shiny"/>
                                    </Col>
                                </Row>
                            </Container>
                            <h3>Estadísticas</h3>
                            <ListGroup>
                                {
                                pokemon.stats.map((stat, i) => (
                                    <ListGroup.Item key={i}>
                                        <ProgressBar
                                            now={stat.base_stat}
                                            label={formatString(stat.stat.name)}
                                            variant={ getStatVariant(stat.stat.name) }
                                        />
                                    </ListGroup.Item>
                                ))
                                }
                            </ListGroup>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={closeModal} variant="secondary">Cerrar</Button>
                        </Modal.Footer>
                        
                    </Modal>
                </>
            ) : (
                <Spinner animation="border" variant="danger"/>
            )}
        </div>
    )
}