import axios from 'axios';
const userId = localStorage.getItem('userId')

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
      const response = await axios.get(`http://localhost:5000/users/getBalance/${userId}`);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async getTransactions() {
    try {
      const response = await axios.get(`http://localhost:5000/users/getTransactions/${userId}`);
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
  async transaction(data) {
    try {
      const response = await axios.post(`http://localhost:5000/users/transaction`,{...data,userId});
      return response; 
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  },
};

export default api;
