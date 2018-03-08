import axios from 'axios';
import config from '../../server/config';

const API_URL = `http://${config.server.host}:9100/`;

export default function callApi(endpoint, method = 'get', data) {
  return axios({
    method,
    url: API_URL + endpoint,
    data
  });
}
