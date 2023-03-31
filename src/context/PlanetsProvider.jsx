import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchPlanets from '../helpers/fetchFunctions';
import PlanetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  // useState permite que utilize o estado do React em componentes funcionais
  const [planets, setPlanets] = useState([]);
  const [filterName, setfilterName] = useState({
    input: '',
  });

  // Atualizando o estado
  const getPlanets = async () => {
    const data = await fetchPlanets('https://swapi.dev/api/planets');
    setPlanets(data.results);
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

  // Definindo os dados que serão compartilhados para os componentes
  const value = {
    planets,
    handleChange,
    filterName,
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
