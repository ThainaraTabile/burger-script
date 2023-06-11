import { setAuthToken,
pegarAuthToken
 } from "../API/localStorage/LocalStorageToken";
describe('setAuthToken', () => {
    beforeEach(() => {
      // Limpa os dados do localStorage antes de cada teste
      localStorage.clear();
    });
  
    test('Deve definir o token e o usuário corretamente no localStorage', () => {
      const token = 'TOKEN_MOCK';
      const user = { id: 1, nome: 'Usuário Mock' };
  
      setAuthToken(token, user);
  
      // Verifica se os valores foram definidos corretamente no localStorage
      expect(localStorage.getItem('authToken')).toBe(token);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
    });
  
    test('Não deve definir o token e o usuário se algum deles estiver vazio', () => {
      const token = '';
      const user = { id: 1, nome: 'Usuário Mock' };
  
      setAuthToken(token, user);
  
      // Verifica se os valores não foram definidos no localStorage
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  
    test('Não deve definir o token e o usuário se ambos estiverem vazios', () => {
      const token = '';
      const user = null;
  
      setAuthToken(token, user);
  
      // Verifica se os valores não foram definidos no localStorage
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
  


describe('pegarAuthToken', () => {
    beforeEach(() => {
      // Limpa o localStorage antes de cada teste
      localStorage.clear();
    });
  
    it('deve retornar o token correto do localStorage', () => {
      const token = 'meu-token';
  
      // Define o token no localStorage
      localStorage.setItem('authToken', token);
  
      // Chama a função e verifica se o token retornado é o mesmo do localStorage
      expect(pegarAuthToken()).toBe(token);
    });
  
    it('deve retornar null se o token não estiver definido no localStorage', () => {
      // Chama a função e verifica se retorna null quando o token não está definido
      expect(pegarAuthToken()).toBeNull();
    });
  });