import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';
import mockFetch from './mocks/mockFetch';
import testData from './mocks/testData';

const planets = testData.results;

describe('Testa se <App />', () => {
  // A função substitui a função fetch() global pelo retorno da função mockFetch()
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('Testa se <App /> realiza uma requisição para a API do Star Wars', () => {
    act(() => {
      render(<App />);
    });
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://swapi.dev/api/planets');
  });

  test('Testa se em <App /> há uma tabela com um cabeçalho corretamento preenchido', () => {
    act(() => {
      render(<App />);
    });
    const table = screen.getByRole('table');
    expect(table).toBeVisible();

    const tableRows = screen.getAllByRole('row');
    expect(tableRows[0]).toHaveTextContent(/Name/i);
    expect(tableRows[0]).toHaveTextContent(/Rotation/i);
    expect(tableRows[0]).toHaveTextContent(/Orbital Period/i);
    expect(tableRows[0]).toHaveTextContent(/Diameter/i);
    expect(tableRows[0]).toHaveTextContent(/Climate/i);
    expect(tableRows[0]).toHaveTextContent(/Gravity/i);
    expect(tableRows[0]).toHaveTextContent(/Terrain/i);
    expect(tableRows[0]).toHaveTextContent(/Surface Water/i);
    expect(tableRows[0]).toHaveTextContent(/Population/i);
    expect(tableRows[0]).toHaveTextContent(/Films/i);
    expect(tableRows[0]).toHaveTextContent(/Created/i);
    expect(tableRows[0]).toHaveTextContent(/Edited/i);
    expect(tableRows[0]).toHaveTextContent(/URL/i);
  });

  test('Testa se os planetas retornados pela API são exibidos', async () => {
    act(() => {
      render(<App />);
    });

    const firstPlanet = planets[0].name;
    const secPlanet = planets[1].name;
    const thirPlanet = planets[2].name;
    const fourPlanet = planets[3].name;
    const fifPlanet = planets[4].name;
    const sixPlanet = planets[5].name;
    const sevPlanet = planets[6].name;
    const eigPlanet = planets[7].name;
    const ninPlanet = planets[8].name;
    const tenPlanet = planets[9].name;
  
    const Tatooine = await screen.findByText(firstPlanet);
    const Alderaan = await screen.findByText(secPlanet);
    const YavinIV = await screen.findByText(thirPlanet);
    const Hoth = await screen.findByText(fourPlanet);
    const Dagobah = await screen.findByText(fifPlanet);
    const Bespin = await screen.findByText(sixPlanet);
    const Endor = await screen.findByText(sevPlanet);
    const Naboo = await screen.findByText(eigPlanet);
    const Coruscant = await screen.findByText(ninPlanet);
    const Kamino = await screen.findByText(tenPlanet);

    expect(Tatooine).toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(YavinIV).toBeVisible();
    expect(Hoth).toBeVisible();
    expect(Dagobah).toBeVisible();
    expect(Bespin).toBeVisible();
    expect(Endor).toBeVisible();
    expect(Naboo).toBeVisible();
    expect(Coruscant).toBeVisible();
    expect(Kamino).toBeVisible();
  });

  test('Testa filtrar planetas que possuem a letra "h" no nome', async () => {
    act(() => {
      render(<App />);
    });
    const nameInput = screen.getByPlaceholderText(/Search a planet from the Star Wars universe/i);
    expect(nameInput).toBeInTheDocument();

    const Tatooine = await screen.findByText('Tatooine');
    const Alderaan = await screen.findByText('Alderaan');
    const Hoth = await screen.findByText('Hoth');
    const Dagobah = await screen.findByText('Dagobah');

    expect(Tatooine).toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(Hoth).toBeVisible();
    expect(Dagobah).toBeVisible();
  
    userEvent.type(nameInput, 'h');
  
    expect(Tatooine).not.toBeVisible();
    expect(Alderaan).not.toBeVisible();
    expect(Hoth).toBeVisible();
    expect(Dagobah).toBeVisible();
  });

  test('Testa filtrar planetas que possuem as letras "ho" no nome', async () => {
    act(() => {
      render(<App />);
    });
    const nameInput = screen.getByPlaceholderText(/Search a planet from the Star Wars universe/i);
    expect(nameInput).toBeInTheDocument();

    const Tatooine = await screen.findByText('Tatooine');
    const Alderaan = await screen.findByText('Alderaan');
    const Hoth = await screen.findByText('Hoth');
    const Dagobah = await screen.findByText('Dagobah');

    expect(Tatooine).toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(Hoth).toBeVisible();
    expect(Dagobah).toBeVisible();
  
    userEvent.type(nameInput, 'ho');
  
    expect(Tatooine).not.toBeVisible();
    expect(Alderaan).not.toBeVisible();
    expect(Hoth).toBeVisible();
    expect(Dagobah).not.toBeVisible();
  });

  test('Testa se os filtros são exibidos corretamente', () => {
    act(() => {
      render(<App />);
    });

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const filterInput = screen.getByTestId('name-filter');
  
    expect(selectColumn).toBeVisible();
    expect(selectComparison).toBeVisible();
    expect(amountInput).toBeVisible();
    expect(filterBtn).toBeVisible();
    expect(filterInput).toBeVisible();
  });

  test('Testa filtro numérico: maior e menor que', async () => {
    act(() => {
      render(<App />);
    });
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
  
    const Tatooine = await screen.findByText('Tatooine');
    const Alderaan = await screen.findByText('Alderaan');
    const Naboo = await screen.findByText('Naboo');
    const Coruscant = await screen.findByText('Coruscant');
  
    expect(Tatooine).toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(Naboo).toBeVisible();
    expect(Coruscant).toBeVisible();
  
    userEvent.type(amountInput, '1000000000');
    userEvent.click(filterBtn);
  
    expect(Tatooine).not.toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(Naboo).toBeVisible();
    expect(Coruscant).toBeVisible();

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '25')
    userEvent.click(filterBtn);

    expect(Tatooine).not.toBeVisible();
    expect(Alderaan).toBeVisible();
    expect(Naboo).not.toBeVisible();
    expect(Coruscant).toBeVisible();

  });

  test('Testa filtro numérico: igual a', async () => {
    act(() => {
      render(<App />);
    });
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
  
    const Tatooine = await screen.findByText('Tatooine');
    const Alderaan = await screen.findByText('Alderaan');
    const Naboo = await screen.findByText('Naboo');
    const Coruscant = await screen.findByText('Coruscant');
  
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '200000')
    userEvent.click(filterBtn);


    expect(Tatooine).toBeVisible();
    expect(Alderaan).not.toBeVisible();
    expect(Naboo).not.toBeVisible();
    expect(Coruscant).not.toBeVisible();  
  });
})

