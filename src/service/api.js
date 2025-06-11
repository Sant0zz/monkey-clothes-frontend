
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.18:8080/'
});

api.interceptors.response.use(
  response => response, // se sucesso, retorna normalmente
  error => {
    if (error.response) {
      const { status, data } = error.response;

      // Exemplo: exibe erro personalizado
      if (status === 404) {
        alert('Recurso não encontrado: ' + data);
      } else if (status === 401) {
        alert('Não autorizado: ' + data);
        // Ex: redirecionar para login
        // window.location.href = '/login';
      } else {
        alert('Erro inesperado: ' + data);
      }
    } else {
      alert('Erro de conexão com o servidor.');
    }

    return Promise.reject(error); // importante para manter o erro disponível no .catch()
  }
);

export default api;
