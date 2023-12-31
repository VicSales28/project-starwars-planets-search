import React, { useContext } from 'react';

import PlanetsContext from '../context/planetsContext';

function Table() {
  // Consumindo os dados de um Context usando o Hook useContext
  const {
    planets,
    handleChange,
    filterName,
    column,
    setColumn,
    comparison,
    setComparison,
    amount,
    setAmount,
    handleSelectedFilter,
    options,
    filters,
    removeAllFilters,
    removeSelectedFilter,
    handleSorting,
    setSortColumn,
    setSortRadio,
    sortColumn,
    sortRadio,
  } = useContext(PlanetsContext);

  // Convertendo o valor de entrada para minúsculas uma vez e armazenando em uma variável
  const filterNameInput = filterName.input.toLowerCase();
  return (
    <div>

      <label htmlFor="column">
        Table column:
        <select
          id="column"
          name="column"
          value={ column }
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {options.map((option, index) => (
            <option key={ index } value={ option }>
              { option }
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="comparison">
        Comparison:
        <select
          id="comparison"
          name="comparison"
          value={ comparison }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>

      <input
        type="number"
        data-testid="value-filter"
        value={ amount }
        onChange={ ({ target }) => setAmount(target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSelectedFilter }
      >
        Filter
      </button>

      <input
        type="text"
        placeholder="Search a planet from the Star Wars universe"
        data-testid="name-filter"
        value={ filterName.input }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>

      {filters.reduce((acc, curr) => {
        acc.push(
          <div data-testid="filter" key={ acc.length }>
            <span>{`${curr.column} ${curr.comparison} ${curr.amount}`}</span>
            <button
              type="button"
              data-testid={ `remove-${curr.column}-filter-btn` }
              onClick={ () => removeSelectedFilter(curr.column) }
            >
              x
            </button>
          </div>,
        );
        return acc;
      }, [])}

      <div>
        <select
          id="sortColumn"
          name="sortColumn"
          value={ sortColumn }
          data-testid="column-sort"
          onChange={ ({ target }) => setSortColumn(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <label htmlFor="ASC">
          Ascendente:
          <input
            id="ASC"
            type="radio"
            name="ORDER"
            value="ASC"
            data-testid="column-sort-input-asc"
            onClick={ ({ target }) => setSortRadio(target.value) }
          />
        </label>

        <label htmlFor="DESC">
          Descendente:
          <input
            id="DESC"
            type="radio"
            name="ORDER"
            value="DESC"
            data-testid="column-sort-input-desc"
            onClick={ ({ target }) => setSortRadio(target.value) }
          />
        </label>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={
            () => handleSorting({ order: { column: sortColumn, sort: sortRadio } })
          }
        >
          Ordenar
        </button>

      </div>

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
