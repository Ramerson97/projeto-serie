"use client"
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Função para gerar parâmetros estáticos
// export async function generateStaticParams() {
//   const res = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b7efa4ca3226bcb649d9662e3d18e4fe');
//   const series = res.data.results;

//   return series.map(serie => ({
//     id: serie.id.toString(),
//   }));
// }

// Componente de Detalhes
export default async function Detalhes({ params }) {
  const { id } = params;

  try {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=pt-BR&api_key=b7efa4ca3226bcb649d9662e3d18e4fe`);
    
    const serie = res.data;

    return (
      <>
      
      <Container>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'caminho/para/imagem/default.jpg'}
              />
            </Card>
          </Col>
          <Col md={8}>
            <h1>{serie.name}</h1>
            <p><strong>Lançamento:</strong> {serie.first_air_date}</p>
            <p><strong>Nota:</strong> {serie.vote_average}</p>
            <p><strong>Quantidade de Temporadas:</strong> {serie.number_of_seasons}</p>
            <p><strong>Quantidade de Episódios:</strong> {serie.number_of_episodes}</p>
            <p><strong>Gêneros:</strong> {serie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Sinopse:</strong> {serie.overview}</p>
          </Col>
        </Row>
      </Container>
      </>

    );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return (
      <Container>
        <h2>Erro ao carregar os detalhes da série.</h2>
      </Container>
    );
  }
}

