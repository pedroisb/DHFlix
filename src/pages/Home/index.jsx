import './styles.css';

import { useEffect, useState } from 'react';

import { Button, Container, Row, Col, Modal, Form, Tab, Tabs } from 'react-bootstrap/';
import CustomCard from './../../components/Card';


function Home() {

    const axios = require('axios');

    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idControl, setIdControl] = useState('');
    const [imageControl, setImageControl] = useState('');
    const [titleControl, setTitleControl] = useState('');
    const [descriptionControl, setDescriptionControl] = useState('');
    const [isCreateModal, setIsCreateModal] = useState(true);


    function getFilms() {
        axios.get('http://ctdsummerweek.nerdasaservice.com.br/filme')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {

            });
    }


    function handleClose() {
        setShowModal(!showModal);
    }


    function setFormValue(value) {

        setIdControl(value.id);
        setImageControl(value.urlImg);
        setTitleControl(value.titulo);
        setDescriptionControl(value.descricao)
    }


    useEffect(() => {
        getFilms();
    }, []);


    function requestFinish() {

        getFilms();
        handleClose();
    }


    function saveMovie() {

        const film = {
            urlImg: imageControl,
            titulo: titleControl,
            descricao: descriptionControl
        }

        if (isCreateModal) {

            axios.post('http://ctdsummerweek.nerdasaservice.com.br/filme', film)
                .then(
                    response => {
                        requestFinish()
                    }
                )
                .catch(error => {

                });

        } else {

            film.id = idControl;

            axios.put('http://ctdsummerweek.nerdasaservice.com.br/filme', film)
                .then(
                    response => {
                        requestFinish()
                    }
                )
                .catch(error => {

                });
        }
    }


    function deleteMovie() {

        axios.delete(`http://ctdsummerweek.nerdasaservice.com.br/filme/${idControl}`)
            .then(
                response => {
                    requestFinish()
                }
            )
            .catch(error => {

            });
    }


    return (
        <>

            <span className="material-icons-outlined fab" onClick={() => {
                handleClose();
                setIsCreateModal(true);
            }}
            >
                add_circle
            </span>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isCreateModal ? 'Criar' : 'Editar'} Filme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control type="text" value={imageControl} onChange={change => setImageControl(change.target.value)} />
                            <Form.Text className="text-muted">
                                Essa Imagem será exibida no Card
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" value={titleControl} onChange={change => setTitleControl(change.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" value={descriptionControl} onChange={change => setDescriptionControl(change.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !isCreateModal &&
                        <Button variant="danger" onClick={() => deleteMovie()}>
                            Deletar
                        </Button>
                    }
                    <Button variant="success" onClick={() => saveMovie()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>


            <header className='home-header'>
                <img src="https://www.digitalhouse.com/logo-DH.png
" alt="Logo da Digital House" />
            </header>

            <main className='home-main'>


                <Tabs defaultActiveKey="all" id="listtabs" className="mb-3 tabs">
                    <Tab eventKey="all" title="Todos">
                        <Container>
                            <Row>
                                {
                                    movies.map(currentMovie => {
                                        return (
                                            <Col lg='4' key={currentMovie.id}>
                                                <CustomCard
                                                    movie={currentMovie}
                                                    openDetails={movieReturned => {
                                                        setFormValue(movieReturned);
                                                        handleClose();
                                                        setIsCreateModal(false);
                                                    }}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </Container>
                    </Tab>

                    <Tab eventKey="favorites" title="Favoritos">
                        <Container>
                            <Row>
                                {
                                    favorites.map(currentMovie => {
                                        return (
                                            <Col lg='4' key={currentMovie.id}>
                                                <CustomCard
                                                    movie={currentMovie}
                                                    openDetails={movieReturned => {
                                                        setFormValue(movieReturned);
                                                        handleClose();
                                                        setIsCreateModal(false);
                                                    }}
                                                    favoriteMovie = {favoritedMovie => {
                                                        setFavorites([...favorites, favoritedMovie]);
                                                    }}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>

            </main >
        </>
    );
}

export default Home;