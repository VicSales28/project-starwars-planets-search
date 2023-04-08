import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import App from '../App';
import mockFetch from './mocks/mockFetch';
import testData from './mocks/testData';

const planets = testData.results;

describe('1ª Parte - Testes envolvendo <App />', () => {
  // A função substitui a função fetch() global pelo retorno da função mockFetch()
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  test('01 - Testa se <App /> realiza uma requisição para a API do Star Wars', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(fetch).toBeCalled();
    expect(fetch).toBeCalledWith('https://swapi.dev/api/planets');
  });

  test('02 - Testa se em <App /> há uma tabela com um cabeçalho corretamento preenchido', async () => {
    await act(async () => {
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

  test('03 - Testa se os planetas retornados pela API são exibidos',async () => {
    await act(async () => {
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

  test('04 - Testa filtrar planetas que possuem a letra "h" no nome', async () => {
    await act(async () => {
      render(<App />);
    });
    const nameInput = screen.getByPlaceholderText(/Search a planet from the Star Wars universe/i);
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'h');

    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(2);
  });

  test('05 - Testa filtrar planetas que possuem as letras "ho" no nome', async () => {
    await act(async () => {
      render(<App />);
    });
    const nameInput = screen.getByPlaceholderText(/Search a planet from the Star Wars universe/i);
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'ho');

    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(1);
  });

  test('06 - Testa se os filtros são exibidos corretamente', async () => {
    await act(async () => {
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

  test('07 - Testa filtro numérico: maior que', async () => {
    await act(async () => {
      render(<App />);
    });
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
  
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '1000000000');
    userEvent.click(filterBtn);
  
    const planetNames = await screen.findAllByTestId('planet-name');
    expect(planetNames).toHaveLength(3);
  });

  test('08 - Testa filtro numérico: igual a', async () => {
    await act(async () => {
      render(<App />);
    });
    const selectComparison = screen.getByTestId('comparison-filter');
    const amountInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
  
    const Tatooine = await screen.findByText('Tatooine');
    const Alderaan = await screen.findByText('Alderaan');
    const Naboo = await screen.findByText('Naboo');
    const Coruscant = await screen.findByText('Coruscant');
  
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '200000');
    userEvent.click(filterBtn);


    expect(Tatooine).toBeVisible();
    expect(Alderaan).not.toBeVisible();
    expect(Naboo).not.toBeVisible();
    expect(Coruscant).not.toBeVisible();  
  });
})
