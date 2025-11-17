'https://staging.cricket-21.com/kkrscouting/app/api/wellnessreport/postworkload-men';

import axios from 'axios';
import {baseUrl} from '../Constant/BaseUrl';

export const InsertFormMenAPI = async body => {
  try {
    const res = await axios.post(
      `${baseUrl}/app/api/wellnessreport/postworkload-men`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response:', res.data);
    console.log('url', `${baseUrl}/app/api/wellnessreport/postworkload-men`);
    return res.data;
  } catch (err) {
    console.error('Error:', err);
    return 'Error';
  }
};

export const InsertFormWomenAPI = async body => {
  try {
    const res = await axios.post(
      `${baseUrl}/app/api/wellnessreport/postworkload-women`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response:', res.data);
    console.log('url', `${baseUrl}/app/api/wellnessreport/postworkload-women`);
    return res.data;
  } catch (err) {
    console.error('Error:', err);
    return 'Error';
  }
};
