'use client'; // Adicione isso se você estiver usando hooks
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyNavbar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Meu.css";
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

export default function Page() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const buscaSeries = async () => {
      try {
        const resposta = await axios.get("https://api.themoviedb.org/3/tv/popular?language=pt-BR&api_key=b7efa4ca3226bcb649d9662e3d18e4fe");
        setSeries(resposta.data.results);
      } catch (error) {
        console.error("Erro ao carregar a página:", error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };
    buscaSeries();
  }, []);

  if (loading) return <div>Carregando...</div>; // Exibe indicador de carregamento

  return (
    <div className='pa'>
      <MyNavbar className='navbarCustom' />
      <Container>
        <h1>Séries Populares</h1>
        <Row>
          {series.map((serie) => (
            <Col key={serie.id} md={4}>
              <Card>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} />
                <Card.Body>
                  <Card.Title>{serie.name}</Card.Title>
                  <Card.Text>Lançamento: {serie.first_air_date}</Card.Text>
                  <Card.Text>Nota: {serie.vote_average}</Card.Text>
                  <Link href={`/serie/${serie.id}`} passHref>
                    <Button variant="primary">Ver Detalhes</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
