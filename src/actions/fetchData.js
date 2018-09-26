import { fromJS } from 'immutable';

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


/**
 * Example for an async actions, requires redux thunk middleware
 * //redux.js.org/docs/advanced/AsyncActions
 */
export const loadData = () => (dispatch) => {
    const yourReports = [
        {
            id: 1,
            creatorId: 4,
            creatorName: 'Max Muster',
            creationTime: new Date('2018-09-25 09:15'),
            revisorId: 5,
            revisorName: 'Susi Strolch',
            locationId: 1214,
            locationName: 'Tobit Software',
            description: 'Kaffeemaschine defekt',
            details: 'Kaffeemaschine in der Lounge leckt',
            image: 'https://i.ebayimg.com/images/g/JAAAAOxy~iJQ9dPi/s-l640.jpg',
            group: 'Junior Team',
            emergency: true,
            history: [
                {
                    id: 3,
                    date: new Date('2018-09-26 09:01'),
                    userId: 5,
                    userName: 'Susi Strolch',
                    message: '##user## kümmert sich ab jetzt um dieses Problem.'
                },
                {
                    id: 2,
                    date: new Date('2018-09-26 08:14'),
                    userId: 5,
                    userName: 'Susi Strolch',
                    message: '##user## hat diesen Bericht von Labs nach Junior Team verschoben.'
                },
                {
                    id: 1,
                    date: new Date('2018-09-26 08:10'),
                    userId: 4,
                    userName: 'Max Muster',
                    message: '##user## hat diesen Bericht erstellt.'
                }
            ]
        },
        {
            id: 2,
            creatorId: 5,
            creatorName: 'Susi Strolch',
            creationTime: new Date('2018-09-24 18:10'),
            locationId: 1,
            locationName: 'Bamboo',
            description: 'Tür verschlossen',
            image: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
            group: 'Labs',
            history: [
                {
                    id: 11,
                    date: new Date('2018-09-24 18:10'),
                    userId: 5,
                    userName: 'Susi Strolch',
                    message: '##user## hat diesen Bericht erstellt'
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
