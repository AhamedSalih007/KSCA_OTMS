import axios from 'axios';
import {baseUrl} from '../Constant/BaseUrl';

export const LoginAPI = async (username, password) => {
  const resAPI = await axios
    .get(`${baseUrl}/app/api/auth/login/${username}/${password}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${baseUrl}/app/api/auth/login/${username}/${password}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetPlayerFormAPI = async (userid, date) => {
  const resAPI = await axios
    .get(`${baseUrl}/app/api/wellnessreport/get/${userid}/${date}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${baseUrl}/app/api/wellnessreport/get/${userid}/${date}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};
