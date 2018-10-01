import SERVER_URL from '../constants/server-url';

export const SAVE_YOUR_REPORTS = 'SAVE_YOUR_REPORTS';
export const saveYourReports = data => ({
    type: SAVE_YOUR_REPORTS,
    data
});
export const SAVE_YOUR_TASKS = 'SAVE_YOUR_TASKS';
export const saveYourTasks = data => ({
    type: SAVE_YOUR_TASKS,
    data
});
export const SAVE_OPEN_REPORTS = 'SAVE_OPEN_REPORTS';
export const saveOpenReports = data => ({
    type: SAVE_OPEN_REPORTS,
    data
});
export const SAVE_REPORTS_IN_PROGRESS = 'SAVE_REPORTS_IN_PROGRESS';
export const saveReportsInProgress = data => ({
    type: SAVE_REPORTS_IN_PROGRESS,
    data
});


export const loadOpenReports = () => async (dispatch) => {
  const result = await fetch(
    `${SERVER_URL}/api/report?type=openReports`,
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json',
        TappId: chayns.env.site.tapp.id
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveOpenReports(data));
};

export const loadYourTasks = () => async (dispatch) => {
  const result = await fetch(
    `${SERVER_URL}/api/report?type=yourTasks`,
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json',
        TappId: chayns.env.site.tapp.id
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveYourTasks(data));
};

export const loadYourReports = () => async (dispatch) => {
  const result = await fetch(
    `${SERVER_URL}/api/report?type=yourReports`,
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json',
        TappId: chayns.env.site.tapp.id
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveYourReports(data));
};

export const loadReportsInProgress = () => async (dispatch) => {
  const result = await fetch(
    `${SERVER_URL}/api/report?type=reportsInProgress`,
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json',
        TappId: chayns.env.site.tapp.id
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveReportsInProgress(data));
};

export const loadData = () => async (dispatch) => {
  dispatch(loadOpenReports());
  dispatch(loadYourTasks());
  dispatch(loadYourReports());
  dispatch(loadReportsInProgress());
};
