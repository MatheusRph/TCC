'use client'
import { useRouter } from 'next/navigation';

import './style.css'
import './../globals.css';
import Maincard from '../../../components/Maincard/Maincard';
import { Card, Container, Button } from 'react-bootstrap';
import Image from 'next/image';

function Adm() {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <header>
        <div className="icone">
          <img src="/icone.png" alt="" />
        </div>
        <div className="barra">
          <h1>Administration</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/cameras')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/camera.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Monitoramento
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Câmeras</Button>
              </div>
            </Card.Body>
          </Card>

          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/avisos')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/alerta.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Monitoramento
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Câmeras</Button>
              </div>
            </Card.Body>
          </Card>

          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/avisos')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/sugestao.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Sugestões dos comdôminos
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Câmeras</Button>
              </div>
            </Card.Body>
          </Card>

          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/entregas')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/entregas.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Adicionar Entregas
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Entregas</Button>
              </div>
            </Card.Body>
          </Card>

          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/deleteUser')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/deleteUser.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Deletar Usuário
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Deletar User</Button>
              </div>
            </Card.Body>
          </Card>

          <Card
            className='retangulo border-0 rounded-4 justify-content-center align-items-center'
            onClick={() => handleClick('/cadastro')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className='w-100 text-reset'>
              <div className='bloco w-75 mt-3 d-flex justify-content-center align-items-center mx-auto'>
                <Image width={120} height={120} layout='intrinsic' alt="Câmera" src="/addUser.png" />
              </div>
              <Card.Text className='text-center fs-5 descript'>
                Cadastrar Usuário
              </Card.Text>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='rounded-5 w-50 button'>Cadastrar</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
}

export default Adm;
