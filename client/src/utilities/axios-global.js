import axios from 'axios';

let instance = axios.create({
  'Content-Type': 'application/json',
  headers: {
    'Authorization': `Token ${localStorage.getItem('token')}`,
    'token': localStorage.getItem('token')
  }
});

export default instance;