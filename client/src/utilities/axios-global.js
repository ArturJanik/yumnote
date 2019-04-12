import axios from 'axios';

let instance,
    config;
if(process.env.NODE_ENV === 'production'){
  config = {
    baseURL: 'https://calories.today/',
    'Content-Type': 'application/json',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'token': localStorage.getItem('token')
    }
  }
} else {
  config = {
    'Content-Type': 'application/json',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'token': localStorage.getItem('token')
    }
  }
}
instance = axios.create(config);

export default instance;