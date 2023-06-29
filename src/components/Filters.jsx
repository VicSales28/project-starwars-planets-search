import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import PlanetsContext from '../context/planetsContext';

import '../styles/Filters.css';

function Filters() {
  // Consumindo os dados de um Context usando o Hook useContext
  const {
    amount,
    column,
    comparison,
    filterName,
    filters,
    handleChange,
    handleSelectedFilter,
    handleSorting,
    options,
    removeAllFilters,
    removeSelectedFilter,
    setAmount,
    setColumn,
    setComparison,
    setSortColumn,
    setSortRadio,
    sortColumn,
    sortRadio,
  } = useContext(PlanetsContext);

  return (
    <div className="container-filters">

      <div className="container-filters-name">
        <input
          id="search-input"
          type="text"
          data-testid="name-filter"
          placeholder="Digite aqui o nome de um planeta do Universo StarWars"
          value={ filterName.input }
          onChange={ handleChange }
        />
      </div>

      <div className="container-filters-numeric">
        <label htmlFor="column">
          Colunas:
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
          Operador:
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
          Filtrar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover todas filtragens
        </button>
      </div>

      {filters.reduce((acc, curr) => {
        acc.push(
          <div data-testid="filter" key={ acc.length }>
            <span>{`${curr.column} ${curr.comparison} ${curr.amount}`}</span>
            <IconButton
              type="button"
              data-testid={ `remove-${curr.column}-filter-btn` }
              onClick={ () => removeSelectedFilter(curr.column) }
            >
              <DeleteIcon />
            </IconButton>
          </div>,
        );
        return acc;
      }, [])}

      <div className="container-filters-order">
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

    </div>
  );
}

export default Filters;
