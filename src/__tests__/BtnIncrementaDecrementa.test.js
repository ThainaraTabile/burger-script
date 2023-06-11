/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BtnIncrementaDecrementa from '../componentes/BtnIncrementaDecrementa';
import '@testing-library/jest-dom/extend-expect';

test('Incrementa corretamente ao clicar no botão de incremento', () => {
  const incrementaMock = jest.fn();
  const { getByText } = render(
    <BtnIncrementaDecrementa incrementa={incrementaMock} />
  );

  const btnIncrementa = getByText('+');
  fireEvent.click(btnIncrementa);

  expect(incrementaMock).toHaveBeenCalledTimes(1);
});

test('Decrementa corretamente ao clicar no botão de decremento', () => {
  const incrementaMock = jest.fn();
  const { getByText } = render(
    <BtnIncrementaDecrementa incrementa={incrementaMock} />
  );

  const btnDecrementa = getByText('-');
  fireEvent.click(btnDecrementa);

  expect(incrementaMock).not.toHaveBeenCalled();
});

test('Não decrementa abaixo de zero', () => {
  const incrementaMock = jest.fn();
  const decrementaMock = jest.fn();
  const { getByText } = render(
    <BtnIncrementaDecrementa incrementa={incrementaMock} decrementa={decrementaMock} />
  );

  const btnDecrementa = getByText('-');
  fireEvent.click(btnDecrementa);

  expect(incrementaMock).not.toHaveBeenCalled();
  expect(decrementaMock).not.toHaveBeenCalled();
});

