import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchPlanets from '../helpers/fetchFunctions';
import PlanetsContext from './planetsContext';

const alternatives = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function PlanetsProvider({ children }) {
  // useState permite que utilize o estado do React em componentes funcionais
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [filterName, setfilterName] = useState({
    input: '',
  });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [amount, setAmount] = useState('0');
  const [options, setOptions] = useState(alternatives);
  const [filters, setFilters] = useState([]);

  // Atualizando o estado
  const getPlanets = async () => {
    const data = await fetchPlanets('https://swapi.dev/api/planets');
    setPlanets(data.results);
    setAllPlanets(data.results);
  };

  // A callback será executada similarmente ao componentDidMount, ou seja, rodando apenas uma vez
  useEffect(() => {
    getPlanets();
  }, []);

  // handleChange está atualizando o valor do estado de maneira que seja o mesmo que está sendo digitado no input
  const handleChange = ({ target: { value } }) => {
    setfilterName({
      input: value,
    });
  };

  const handleSelectedFilter = () => {
    // Esse código é usado para filtrar um array de opções com base na coluna selecionada pelo usuário.
    // O objetivo é remover a opção atual da lista de opções disponíveis.
    const newOptions = options.filter((option) => option !== column);
    setColumn(newOptions[0]);
    setOptions(newOptions);

    // Esse código é usado para incrementar um array de objetos com as opções de filtro selecionadas pelo usuário.
    // Seu objetivo é armazenar todos os filtros utilizados durante a navegação.
    setFilters([...filters, { column, comparison, amount }]);

    // O objetivo do código abaixo é filtrar os resultados da tabela
    // Ela utiliza a variável "comparison" para determinar qual tipo de filtro deve ser aplicado
    const filteredPlanets = planets.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(planet[column], 10) > parseInt(amount, 10);
      case 'menor que':
        return parseInt(planet[column], 10) < parseInt(amount, 10);
      case 'igual a':
        return parseInt(planet[column], 10) === parseInt(amount, 10);
      default:
        return false;
      }
    });
    setPlanets(filteredPlanets);
  };

  const removeAllFilters = async () => {
    await getPlanets();
    setColumn('population');
    setAmount('0');
    setOptions(alternatives);
    setFilters([]);
  };

  const removeSelectedFilter = (selectedFilter) => {
    const index = alternatives.indexOf(selectedFilter);
    options.splice(index, 0, selectedFilter);

    const newFilters = filters.filter((element) => element.column !== selectedFilter);
    setFilters(newFilters);

    if (newFilters.length === 0) {
      setColumn('population');
      setAmount('0');
      setOptions(alternatives);
      setPlanets(allPlanets);
    } else {
      newFilters.forEach((element) => {
        if (element.comparison === 'maior que') {
          const newData = allPlanets.filter(
            (e) => +e[element.column] > +element.amount,
          );
          setOptions(options.filter((e) => e !== element.column));
          setColumn(options[0]);
          setAmount('0');
          setPlanets(newData);
        }

        if (element.comparisonFilter === 'igual a') {
          const newData = allPlanets.filter(
            (e) => +e[element.column] === +element.amount,
          );

          setColumn(column.filter((e) => e !== element.column));
          setColumn(options[0]);
          setAmount('0');
          setPlanets(newData);
        }

        if (element.comparison === 'menor que') {
          const newData = allPlanets.filter(
            (e) => +e[element.column] < +element.amount,
          );

          setOptions(column.filter((e) => e !== element.column));
          setColumn(options[0]);
          setAmount('0');
          setPlanets(newData);
        }
      });
    }
  };

  // Definindo os dados que serão compartilhados para os componentes
  const value = {
    planets,
    handleChange,
    filterName,
    column,
    comparison,
    amount,
    setColumn,
    setComparison,
    setAmount,
    handleSelectedFilter,
    options,
    filters,
    removeAllFilters,
    removeSelectedFilter,
  };

  // Com esse retorno todos os componentes encapsulados pelo PlanetsContext.Provider terão acesso a esses dados
  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

// Validação exigida pelo Eslint
PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
