import { render, screen, fireEvent } from '@testing-library/react';
import ListaSuspensa from '../componentes/ListaSuspensa/ListaSuspensa';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

test('renderiza corretamente os itens da lista suspensa', () => {
    const label = 'Selecione uma opção';
    const itens = ['Opção 1', 'Opção 2', 'Opção 3'];
    const aoAlterado = jest.fn();
    const valorSelecionado = 'Opção 2';

    render(
        <ListaSuspensa
            label={label}
            itens={itens}
            aoAlterado={aoAlterado}
            valor={valorSelecionado}
        />
    );

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(valorSelecionado);

    const optionElements = screen.getAllByRole('option');
    expect(optionElements).toHaveLength(itens.length);
    itens.forEach((item, index) => {
        expect(optionElements[index]).toHaveTextContent(item);
    });
});

test('chama a função aoAlterado quando o valor selecionado é alterado', () => {
    const aoAlterado = jest.fn();
    const valorInicial = 'Opção 1';
    const novoValor = 'Opção 2';

    render(
        <ListaSuspensa
            label="Selecione uma opção"
            itens={['Opção 1', 'Opção 2', 'Opção 3']}
            aoAlterado={aoAlterado}
            valor={valorInicial}
        />
    );

    const selectElement = screen.getByRole('combobox');

    expect(aoAlterado).not.toHaveBeenCalled();

    // Simula a alteração do valor selecionado
    selectElement.value = novoValor;
    fireEvent.change(selectElement);

    expect(aoAlterado).toHaveBeenCalledTimes(1);
    expect(aoAlterado).toHaveBeenCalledWith(novoValor);
});