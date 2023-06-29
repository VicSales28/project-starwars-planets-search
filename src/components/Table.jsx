import React, { useContext } from 'react';

import PlanetsContext from '../context/planetsContext';

import '../styles/Table.css';

function Table() {
  // Consumindo os dados de um Context usando o Hook useContext
  const {
    filterName,
    planets,
  } = useContext(PlanetsContext);

  // Convertendo o valor de entrada para minúsculas uma vez e armazenando em uma variável
  const filterNameInput = filterName.input.toLowerCase();
  return (
    <div className="container-table">

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {planets
            .filter(({ name }) => name.toLowerCase().includes(filterNameInput))
            .map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.creted }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
        </tbody>

      </table>
    </div>
  );
}

export default Table;
