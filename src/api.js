import axios from 'axios';

const api = {
  async login(data) {
    try {
      const response = await axios.post('http://localhost:5000/users/login', data);
      console.log(response)
      return response; // Return the response data
    } catch (error) {
      throw new Error(error.response.data); // Throw an error with the response data
    }
  }
};

export default api;
