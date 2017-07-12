/* eslint-disable */
import bluebird from 'bluebird';
import axios from 'axios';

window.Promise = bluebird;
axios.defaults.baseURL = API_PATH;
