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
  // useState permite que utilize o estado do React
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
  const [sortColumn, setSortColumn] = useState('population');
  const [sortRadio, setSortRadio] = useState('');
  const [order, setOrder] = useState({ order: { column: '', sort: '' } });

  // Atualiza estado para preencher a tabela
  const getPlanets = async () => {
    const data = await fetchPlanets('https://swapi.dev/api/planets');
    setPlanets(data.results);
    setAllPlanets(data.results);
  };

  // Essa callback será executada similarmente ao componentDidMount, ou seja, roda apenas uma vez
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

  // O objetivo da função abaixo é remover todos os filtros usados na tabela
  // E retornar a tabela e os filtros para sua condição inicial
  const removeAllFilters = async () => {
    await getPlanets();
    setColumn('population');
    setAmount('0');
    setOptions(alternatives);
    setFilters([]);
  };

  const removeSelectedFilter = (selectedFilter) => {
    // A seguir, o objetivo desse trecho é obter a posição exata de uma opção na seleção original
    const index = alternatives.indexOf(selectedFilter);
    // A seguir, um filtro excluído retorna para as opções de escolha
    options.splice(index, 0, selectedFilter);

    // Esse código é usado para remover os filtros excluídos do array com as opções de filtro selecionadas pelo usuário.
    // Seu objetivo é atualizar os filtros novamente após a exclusão de um.
    const newFilters = filters.filter((element) => element.column !== selectedFilter);
    setFilters(newFilters);

    if (newFilters.length === 0) { // Se não houver mais filtros selecionados, a tabela retorna para sua condição inicial
      setColumn('population');
      setAmount('0');
      setOptions(alternatives);
      setPlanets(allPlanets);
    } else {
      newFilters.forEach((element) => { // Se houver filtros selecionados restantes, esse array é percorrido gerando uma nova tabela com base nos filtros restantes
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

  // Essa função é usada para classificar os dados da tabela.
  // A função recebe um objeto como parâmetro que contém informações sobre a coluna e a direção da classificação (ascendente ou descendente): obj = { order: { column: sortColumn, sort: sortRadio } }
  // O valor bellow é usado para garantir que os elementos unknown sejam sempre enviados para o final da tabela.
  const handleSorting = (obj) => {
    setOrder(obj);
    const below = -1;
    const dataSort = [...planets];
    if (obj.order.sort === 'DESC') {
      dataSort.sort((a, b) => (
        b[obj.order.column] === 'unknown'
          ? below
          : parseInt(b[obj.order.column], 10) - parseInt(a[obj.order.column], 10)
      ));
    } else if (obj.order.sort === 'ASC') {
      dataSort.sort((a, b) => (
        b[obj.order.column] === 'unknown'
          ? below
          : parseInt(a[obj.order.column], 10) - parseInt(b[obj.order.column], 10)
      ));
    }
    setPlanets(dataSort);
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
    sortColumn,
    sortRadio,
    order,
    setSortColumn,
    setSortRadio,
    handleSorting,
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
