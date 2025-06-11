import api from './api';

export async function login(emailLogin, senhaLogin) {
  try {
    const response = await api.get("/usuario", {
        params: {
          email: emailLogin,
          senha: senhaLogin
        }});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erro desconhecido' };
  }
}