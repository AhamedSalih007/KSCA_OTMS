import axios from 'axios';
import {baseUrl, stagingUrl} from '../Constant/BaseUrl';

export const GetFormDataScoutingAPI = async id => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/form/data?id=${id}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/form/data?id=${id}`);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });

  return resAPI;
};

export const GetCompetitionData_ScoutingAPI = async () => {
  try {
    const res = await axios.get(`${stagingUrl}/app/api/competition-data/get`);
    console.log('d', `${stagingUrl}/app/api/competitiondata/get`);
    return res.data?.Data ?? null;
  } catch (err) {
    console.log('d', `${stagingUrl}/app/api/competitiondata/get`);
    console.log('GetCompetitionData API Error:', err);
    return null; // always return something
  }
};

export const GetAssignedMatches_ScoutingAPI = async userid => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/scout-data/getassignedmatches/${userid}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/scout-data/getassignedmatches/${userid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(
        err,
        console.log(
          'res--->',
          `${stagingUrl}/app/api/scout-data/getassignedmatches/${userid}`,
        ),
      );
      return 'Error';
    });

  return resAPI;
};

export const GetSquadByMatch_ScoutingAPI = async (compid, matchid) => {
  const resAPI = await axios
    .get(
      `${stagingUrl}/app/api/player/squad?compid=${compid}&matchid=${matchid}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/player/squad?compid=${compid}&matchid=${matchid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(
        err,
        console.log(
          'res--->',
          `${stagingUrl}/app/api/player/squad?compid=${compid}&matchid=${matchid}`,
        ),
      );
      return 'Error';
    });

  return resAPI;
};

export const GetFormsByRoleId_ScoutingAPI = async roleId => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/form/getformsforrole?RoleID=${roleId}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/getformsforrole?RoleID=${roleId}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(
        err,
        console.log(
          'res--->',
          `${stagingUrl}/app/api/form/getformsforrole?RoleID=${roleId}`,
        ),
      );
      return 'Error';
    });

  return resAPI;
};

export const GetCompByMatchType_ScoutingAPI = async matchtype => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/competition-data/${matchtype}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/competition-data/${matchtype}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(
        err,
        console.log(
          'res--->',
          `${stagingUrl}/app/api/competition-data/${matchtype}`,
        ),
      );
      return 'Error';
    });

  return resAPI;
};

export const GetFormByIndividual_ScoutingAPI = async id => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/form/data?id=${id}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/form/data?id=${id}`);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('res--->', `${stagingUrl}/app/api/form/data?id=${id}`);
      return 'Error';
    });

  return resAPI;
};

export const GetFormEntry_ScoutingAPI = async id => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/form/getformentry?id=${id}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/getformentry?id=${id}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/getformentry?id=${id}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const GetFormEntries_ScoutingAPI = async (
  uid,
  formid,
  userid,
  matchid,
  compid,
) => {
  const resAPI = await axios
    .get(
      `${stagingUrl}/app/api/form/checkformentries?uid=${uid}&formid=${formid}&UserId=${userid}&matchid=${matchid}&compid=${compid}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/checkformentries?uid=${uid}&formid=${formid}&UserId=${userid}&matchid=${matchid}&compid=${compid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/checkformentries?uid=${uid}&formid=${formid}&UserId=${userid}&matchid=${matchid}&compid=${compid}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const SubmitForm_ScoutingAPI = async data => {
  const resAPI = await axios
    .post(`${stagingUrl}/app/api/form/submitform`, data)
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/form/submitform`, data);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('res--->', `${stagingUrl}/app/api/form/submitform`, data);
      return 'Error';
    });

  return resAPI;
};

export const UpdateForm_ScoutingAPI = async data => {
  const resAPI = await axios
    .post(`${stagingUrl}/app/api/form/updateform`, data)
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/form/submitform`, data);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('res--->', `${stagingUrl}/app/api/form/submitform`, data);
      return 'Error';
    });

  return resAPI;
};

export const GetReqTrack_ScoutingAPI = async () => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/requirement-tracker/get`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log('res--->', `${stagingUrl}/app/api/requirement-tracker/get`);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('res--->', `${stagingUrl}/app/api/requirement-tracker/get`);
      return 'Error';
    });

  return resAPI;
};

export const GetPlayersByReqTracker_ScoutingAPI = async (
  userid,
  roleid,
  reqid,
) => {
  const resAPI = await axios
    .get(
      `${stagingUrl}/app/api/requirement-tracker/get-entries?UserId=${userid}&RoleID=${roleid}&ReqID=${reqid}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/get-entries?UserId=${userid}&RoleID=${roleid}&ReqID=${reqid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/get-entries?UserId=${userid}&RoleID=${roleid}&ReqID=${reqid}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const SearchPlayer_ScoutingAPI = async text => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/player/GetPlayerBySearch?query=${text}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/player/GetPlayerBySearch?query=${text}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/player/GetPlayerBySearch?query=${text}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const AddPlayerNotes_ScoutingAPI = async data => {
  const resAPI = await axios
    .post(`${stagingUrl}/app/api/requirement-tracker/submit-suggestions`, data)
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/submit-suggestions`,
        data,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/submit-suggestions`,
        data,
      );
      return 'Error';
    });

  return resAPI;
};

export const DeletePlayerNotes_ScoutingAPI = async data => {
  const resAPI = await axios
    .post(`${stagingUrl}/app/api/requirement-tracker/delete-entry`, data)
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/delete-entry`,
        data,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/requirement-tracker/delete-entry`,
        data,
      );
      return 'Error';
    });

  return resAPI;
};

export const GetEvaluationForm_ScoutingAPI = async userid => {
  const resAPI = await axios
    .get(`${stagingUrl}/app/api/form/getevaluations?userid=${userid}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/getevaluations?userid=${userid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `${stagingUrl}/app/api/form/getevaluations?userid=${userid}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const GetPlayerStats_ScoutingAPI = async uid => {
  const resAPI = await axios
    .get(`${stagingUrl}/player/GetStatsByUID?uid=${uid}`, {
      // timeout: 7000,
    })
    .then(res => {
      console.log('res--->', `${stagingUrl}/player/GetStatsByUID?uid=${uid}`);

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('res--->', `${stagingUrl}/player/GetStatsByUID?uid=${uid}`);
      return 'Error';
    });

  return resAPI;
};

export const GetPlayerStats2_ScoutingAPI = async uid => {
  const resAPI = await axios
    .get(
      `https://staging.cricket-21.com/ams/app/api/player/GetStatsByUID?uid=${uid}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `https://staging.cricket-21.com/ams/app/api/player/GetStatsByUID?uid=${uid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `https://staging.cricket-21.com/ams/app/api/player/GetStatsByUID?uid=${uid}`,
      );
      return 'Error';
    });

  return resAPI;
};

export const GetDashboardStats_ScoutingAPI = async userid => {
  const resAPI = await axios
    .get(
      `https://staging.cricket-21.com/ams/app/api/scout-data/get-dashboard-stats?userid=${userid}`,
      {
        // timeout: 7000,
      },
    )
    .then(res => {
      console.log(
        'res--->',
        `https://staging.cricket-21.com/ams/app/api/scout-data/get-dashboard-stats?userid=${userid}`,
      );

      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log(
        'res--->',
        `https://staging.cricket-21.com/ams/app/api/scout-data/get-dashboard-stats?userid=${userid}`,
      );
      return 'Error';
    });

  return resAPI;
};
