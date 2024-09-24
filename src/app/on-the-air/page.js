"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import "../Meu.css";

const OnTheAir = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&api_key=b7efa4ca3226bcb649d9662e3d18e4fe');
        setSeries(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };
    fetchSeries();
  }, []);

  if (loading) return <div>Carregando...</div>; // Exibe indicador de carregamento

  return (
    <Container>
      <Navbar className='navbarCustom'>
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Button variant="primary" className="me-2">
                  Tela Inicial
                </Button>
              </Link>
              <Link href="/top-rated" passHref>
                <Button variant="primary" className="me-2">
                  Melhores Avaliadas
                </Button>
              </Link>
              <Link href="/airing-today" passHref>
                <Button variant="primary">
                  Na TV Hoje
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Séries Exibidas Hoje</h1>
      <Row>
        {series.map((serie) => (
          <Col key={serie.id} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} />
              <Card.Body>
                <Card.Title>{serie.name}</Card.Title>
                <Card.Text>
                  <strong>Lançamento:</strong> {serie.first_air_date}<br />
                  <strong>Nota:</strong> {serie.vote_average}
                </Card.Text>
                <Link href={`/serie/${serie.id}`} passHref>
                  <Button variant="primary">Ver Detalhes</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OnTheAir;
