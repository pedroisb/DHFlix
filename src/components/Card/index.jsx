import { Card, Button, Nav } from 'react-bootstrap';

import './styles.css';

function CustomCard({ movie, openDetails, favoriteMovie }) {
    return (
        <Card className='home-card'>
            <span className="material-icons-outlined home-card-icon" onClick={ () => favoriteMovie(movie)}>
                star
            </span>
            <Card.Img variant="top" src={movie.urlImg} className='home-card-img'/>
            <Card.Body>
                <Card.Title>{movie.titulo}</Card.Title>
                <Card.Text>{movie.descricao}</Card.Text>
                <Button variant="primary" onClick={ () => openDetails(movie)}>Detalhes</Button>
            </Card.Body>
        </Card>
    );
}

export default CustomCard;