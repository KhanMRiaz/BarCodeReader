import axios from 'axios';

export function getProduct(barCode) {
  return axios.get(`https://barcode.monster/api/${barCode}`);
}
