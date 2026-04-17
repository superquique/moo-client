import axios from 'axios';

class SheetsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL
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

  // POST /api/sheets
  createSheet = requestBody => {
    return this.api.post('/api/sheets', requestBody);
  };

  // GET /api/sheets
  getAllSheets = () => {
    return this.api.get('/api/sheets');
  };

  // GET /api/sheets?favorite=true
  getFavoriteSheets = () => {
    return this.api.get('/api/sheets?favorite=true');
  }

  getSheetsWithTitle = (title) => {
    return this.api.get(`/api/sheets?title=${title}`);
  }

  // GET /api/sheets
  getAllSheetsFromNotebook = (notebookId) => {
    return this.api.get(`/api/sheets/notebook/${notebookId}`);
  };

  // GET /api/sheets
  getAllSheetsFromNotebookWithTitle = (notebookId, title) => {
    return this.api.get(`/api/sheets/notebook/${notebookId}?title=${title}`);
  };

  // GET /api/sheets/:id
  getSheet = id => {
    return this.api.get(`/api/sheets/${id}`);
  };

  // PUT /api/sheets/:id
  updateSheet = (id, requestBody) => {
    return this.api.put(`/api/sheets/${id}`, requestBody);
  };

  // DELETE /api/sheets/:id
  deleteSheet = id => {
    return this.api.delete(`/api/sheets/${id}`);
  };
}

// Create one instance object
const sheetsService = new SheetsService();

export default sheetsService;