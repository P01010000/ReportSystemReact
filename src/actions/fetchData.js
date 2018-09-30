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
    'https://localhost:5001/api/report?type=open',
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveOpenReports(data));
};

export const loadYourTasks = () => async (dispatch) => {
  const result = await fetch(
    'https://localhost:5001/api/report?type=yourTasks',
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveYourTasks(data));
};

export const loadYourReports = () => async (dispatch) => {
  const result = await fetch(
    'https://localhost:5001/api/report?type=yourReports',
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveYourReports(data));
};

export const loadReportsInProgress = () => async (dispatch) => {
  const result = await fetch(
    'https://localhost:5001/api/report?type=reportsInProgress',
    {
      headers:
      {
        Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  if (!result.ok) return;
  const data = await result.json();

  dispatch(saveReportsInProgress(data));
};


/**
 * Example for an async actions, requires redux thunk middleware
 * //redux.js.org/docs/advanced/AsyncActions
 */
export const loadData = () => async (dispatch) => {
  dispatch(loadOpenReports());
  dispatch(loadYourTasks());
  dispatch(loadYourReports());
  dispatch(loadReportsInProgress());

    const yourReports = [
        {
            id: 1,
            creatorId: 4,
            creatorFirstName: 'Max',
            creatorLastName: 'Muster',
            creationTime: new Date('2018-09-25 09:15'),
            revisorId: 5,
            revisorFirstName: 'Susi',
            revisorLastName: 'Strolch',
            destinationId: 5,
            destinationName: 'Tobit Software',
            locationId: 1214,
            description: 'Kaffeemaschine defekt',
            details: 'Kaffeemaschine in der Lounge leckt',
            imageUrl: 'https://i.ebayimg.com/images/g/JAAAAOxy~iJQ9dPi/s-l640.jpg',
            departmentName: 'Junior Team',
            emergency: true,
            history: [
                {
                    id: 3,
                    creationTime: new Date('2018-09-26 09:01'),
                    message: 'Susi Strolch kümmert sich ab jetzt um dieses Problem.'
                },
                {
                    id: 2,
                    creationTime: new Date('2018-09-26 08:14'),
                    message: 'Susi Strolch hat diesen Bericht von Labs nach Junior Team verschoben.'
                },
                {
                    id: 1,
                    creationTime: new Date('2018-09-26 08:10'),
                    message: 'Max Muster hat diesen Bericht erstellt.'
                }
            ]
        },
        {
            id: 2,
            creatorId: 5,
            creatorFirstName: 'Susi',
            creatorLastName: 'Strolch',
            creationTime: new Date('2018-09-24 18:10'),
            destinationId: 2,
            destinationName: 'Bamboo',
            locationId: 1,
            departmentName: 'Labs',
            description: 'Tür verschlossen',
            imageUrl: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
            history: [
                {
                    id: 11,
                    creationTime: new Date('2018-09-24 18:10'),
                    message: 'Susi Strolch hat diesen Bericht erstellt'
                }
            ]
        }
    ];

    if (!chayns.env.user.isAuthenticated) return;

    dispatch(saveYourReports([yourReports[1]]));
    dispatch(saveOpenReports(yourReports));
    dispatch(saveYourTasks([yourReports[0]]));
    dispatch(saveReportsInProgress(yourReports));
};
