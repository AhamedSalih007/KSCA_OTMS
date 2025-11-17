import axios from 'axios';
import {baseUrl, stagingUrl} from '../Constant/BaseUrl';

export const GetUploadedVideos_CoachAPI = async userid => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/videoreport/getuploadedvideos/${userid}`, {
      timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/videoreport/getuploadedvideos/${userid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetPlayers_CoachAPI = async userid => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/videoreport/getcoachplayers/${userid}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/videoreport/getcoachplayers/${userid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetTagFields_CoachAPI = async () => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/videoreport/tagsfileds`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/videoreport/tagsfileds`);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetCommentsByVideo_CoachAPI = async id => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/videoreport/getcomments/${id}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/videoreport/getcomments/${id}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetVideoFramesByVideo_CoachAPI = async id => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/videoreport/getvideoframes/${id}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/videoreport/getvideoframes/${id}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const editVideoTags = async (tagsArray, videoId) => {
  try {
    const formData = new FormData();

    // append tags from your array
    tagsArray.forEach(tagObj => {
      const [key, value] = Object.entries(tagObj)[0];

      formData.append(key, value);
    });

    // console.log('formdata', formData, videoId);

    formData.append('VideoId', videoId);
    formData.append('type', 'tags');

    const response = await axios.post(
      `${baseUrl}app/api/videoreport/updatevideotags`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('✅ Upload success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);

    return 'Error';
  }
};

export const postVideoTags = async (tagsArray, videoId) => {
  try {
    // 🧩 Merge array of { key: value } objects into a single object
    const tagsObject = Object.assign({}, ...tagsArray);

    // ➕ Add static fields
    tagsObject.VideoId = videoId;
    tagsObject.type = 'tags';

    console.log('📦 Tags Object before sending:', tagsObject);

    // 🚀 Send as JSON
    const response = await axios.post(
      `${stagingUrl}/app/api/videoreport/updatevideotags`,
      tagsObject, // directly send object as JSON
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('✅ Upload success:', response.data);
    return response.data;
  } catch (error) {
    return 'Error';
  }
};

export const saveCommentsAPI = async (comments, videoId, userId, frameId) => {
  const data = {
    comments,
    videoId,
    userId,
    frameId,
  };

  try {
    const response = await axios.post(
      `${stagingUrl}/app/api/videoreport/SaveComments`,
      data, // directly send object as JSON
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('✅ Upload success:', response.data);
    return response.data;
  } catch (error) {
    return 'Error';
  }
};

export const CreateNewFrameAPI = async data => {
  try {
    const response = await axios.post(
      `${stagingUrl}/app/api/videoreport/uploadframeimage`,
      data,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    console.log('✅ Upload success:', response.data);

    return response.data;
  } catch (error) {
    console.log('err', error);
    return 'Error';
  }
};

export const UpdateFrameImageAPI = async data => {
  try {
    const response = await axios.post(
      `${stagingUrl}/app/api/videoreport/uploadeditedframe`,
      data,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );

    console.log('✅ Upload success:', response.data);

    return response.data;
  } catch (error) {
    console.log('err', error);
    return 'Error';
  }
};

export const PostFrameImage_CoachAPI = async (
  framebase64,
  videoid,
  frametime,
) => {
  const resAPI = await axios
    .post(
      `${stagingUrl}/app/api/videoreport/uploadframeimage/${framebase64}/${videoid}/${frametime}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/videoreport/uploadframeimage/${framebase64}/${videoid}/${frametime}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const EditTextCommentAPI = async data => {
  try {
    const response = await axios.post(
      `${stagingUrl}/app/api/videoreport/edittextcomment/${commentid}/${text}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );

    console.log('✅ Upload success:', response.data);

    return response.data;
  } catch (error) {
    console.log('err', error);
    return 'Error';
  }
};
