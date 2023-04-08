import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';
import mockFetch from './mocks/mockFetch';
import testData from './mocks/testData';

const planets = testData.results;

describe('2ª Parte - Testes envolvendo <App />', () => {
  // A função substitui a função fetch() global pelo retorno da função mockFetch()
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('09 - Testa filtro numérico: menor que', async () => {
    await act(async () => {
      render(<App />);
    });
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '20')
    userEvent.click(filterBtn);

    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(2);
  });

  test('10 - Testa a ordenação dos elementos de forma ascendente', async () => {
    await act(async () => {
      render(<App />);
    });

    const columnSort = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const sortBtn = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(asc);
    userEvent.click(sortBtn);

    const planetsList = screen.getAllByTestId('planet-name');
    expect(planetsList[1]).toHaveTextContent('Tatooine');
  })

  test('11 - Testa a ordenação dos elementos de forma descendente', async () => {
    await act(async () => {
      render(<App />);
    });

    const columnSort = screen.getByTestId('column-sort');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(desc);
    userEvent.click(sortBtn);

    const planetsList = screen.getAllByTestId('planet-name');
    expect(planetsList[0]).toHaveTextContent('Coruscant');
  })

  test('12 - Testa botão que remove um filtro específico', async () => {
    await act(async () => {
      render(<App />);
    });

    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(selectColumn, 'surface_water');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '40');
    userEvent.click(filterBtn);

    const filteredPlanets = await screen.findAllByTestId('planet-name');
    expect(filteredPlanets).toHaveLength(2);

    const removeFilterBtn = screen.getByTestId('remove-surface_water-filter-btn');
    userEvent.click(removeFilterBtn);

    const allPlanets = await screen.findAllByTestId('planet-name');
    expect(allPlanets).toHaveLength(10);
  })

  test('13 - Testa botão que remove um filtro específico', async () => {
    await act(async () => {
      render(<App />);
    });

    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(selectColumn, 'surface_water');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '40');
    userEvent.click(filterBtn);

    const oneFilter = await screen.findAllByTestId('planet-name');
    expect(oneFilter).toHaveLength(2);

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '25');
    userEvent.click(filterBtn);

    const twoFilter = await screen.findAllByTestId('planet-name');
    expect(twoFilter).toHaveLength(1);

    const removeFilterBtn = screen.getByTestId('remove-surface_water-filter-btn');
    userEvent.click(removeFilterBtn);
  })

  test('14 - Testa botão que remove todos os filtros', async () => {
    await act(async () => {
      render(<App />);
    });

    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '24');
    userEvent.click(filterBtn);

    const firstFilter = await screen.findAllByTestId('planet-name')
    expect(firstFilter).toHaveLength(5)

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '8000');
    userEvent.click(filterBtn);

    const secondFilter = await screen.findAllByTestId('planet-name');
    expect(secondFilter).toHaveLength(3);

    const removeAllFiltersBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(removeAllFiltersBtn);
  })
})