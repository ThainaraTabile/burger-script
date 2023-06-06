import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { differenceInMinutes } from 'date-fns';
import './Auth.css'

export const verificarAutenticacao = () => {
  const authToken = localStorage.getItem('authToken');
  const userData = localStorage.getItem('user');

  if (!authToken || !userData) {
    throw new Error('Usuário não autenticado');
  }

  const user = JSON.parse(userData);

  if (!user || !user.name) {
    throw new Error('Usuário inválido');
  }

  const decodedToken = jwtDecode(authToken);
  const expiracaoDoToken = decodedToken.exp * 1000;

  if (expiracaoDoToken < Date.now()) {
    throw new Error('Token expirado');
  }

  return user;
};

function TokenExpiracao() {
  const [tempoRestante, setTempoRestante] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const expiracaoDoToken = decodedToken.exp * 1000;
      const dataExpiracao = new Date(expiracaoDoToken);

      const atualizarTempoRestante = () => {
        const dataAtual = new Date();
        const diferencaEmMinutos = differenceInMinutes(dataExpiracao, dataAtual);
        const horas = Math.floor(diferencaEmMinutos / 60);
        const minutos = diferencaEmMinutos % 60;
        let tempoRestanteFormatado = '';
        if (horas > 0) {
          tempoRestanteFormatado = `Seu token expira em ${horas}h ${minutos}min!`;
        } else {
          tempoRestanteFormatado = `Seu token expira em ${minutos}min!`;
        }
        setTempoRestante(tempoRestanteFormatado);
      };

      atualizarTempoRestante();

      const intervalId = setInterval(atualizarTempoRestante, 1000 * 60);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  useEffect(() => {
  }, [tempoRestante]);

  return (
    <div className='exp-token'>
      <h4 >
        {tempoRestante}
      </h4>
    </div>
  );
}

export default TokenExpiracao;