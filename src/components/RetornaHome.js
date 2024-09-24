"use client"
import Link from 'next/link';
import "./componentes.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RetornaHome() {
  return (
    <div className='retorno'>
      <Link href="/" passHref>
        <button className="btn btn-primary">
          Voltar para a Tela Inicial
        </button>
      </Link>
    </div>
  )
}
