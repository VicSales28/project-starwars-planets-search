import testData from './testData';

// A função a seguir simula uma requisição a um servidor
// Ela retorna a propriedade json com uma promessa contendo os dados da variável testData
const mockFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(testData),
});

export default mockFetch;