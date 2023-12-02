import axios from 'axios';
const token = localStorage.getItem('token') || 'No Token';

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


const api = {
  async login(data) {
    try {
      const response = await axios.post('http://localhost:5000/users/login', data);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async getBalance() {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(`http://localhost:5000/users/getBalance/${userId}`);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async getTransactions() {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(`http://localhost:5000/users/getTransactions/${userId}`);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async transaction(data) {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.post(`http://localhost:5000/users/transaction`,{...data,userId});
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async bankerLogin(data) {
    try {
      const response = await axios.post('http://localhost:5000/bankers/login', data);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async getUsers(data) {
    try {
      const response = await axios.get('http://localhost:5000/bankers/getUsers');
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async getTransactionsOfUser(userId) {
    try {
      const response = await axios.get(`http://localhost:5000/bankers/getTransactions/${userId}`);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
};

export default api;
