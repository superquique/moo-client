import axios from 'axios';

class NotebooksService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/notebooks
  createNotebook = requestBody => {
    return this.api.post('/api/notebooks', requestBody);
  };

  // GET /api/notebooks
  getAllNotebooks = () => {
    return this.api.get('/api/notebooks');
  };

  // GET /api/notebooks/:id
  getNotebook = id => {
    return this.api.get(`/api/notebooks/${id}`);
  };

  // PUT /api/notebooks/:id
  updateNotebook = (id, requestBody) => {
    return this.api.put(`/api/notebooks/${id}`, requestBody);
  };

  // DELETE /api/notebooks/:id
  deleteNotebook = id => {
    return this.api.delete(`/api/notebooks/${id}`);
  };
}

// Create one instance object
const notebooksService = new NotebooksService();

export default notebooksService;