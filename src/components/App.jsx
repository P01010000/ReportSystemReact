import React from 'react';
import { hot } from 'react-hot-loader';
import Intro from './intro/Intro';
import ReportForm from './reportForm/ReportForm';
import ReportList from './reportOverview/ReportList';

const App = () => (
    <div>
        <Intro />
        <div className="tapp__content">
            <ReportList
                title="Offene Reports"
                data={[
                {
                    id: 1,
                    creator: 'Max Muster',
                    creationTime: new Date('2018-09-25 09:15'),
                    locationId: 1,
                    locationName: 'Bamboo',
                    description: 'Kaffeemaschine defekt',
                    details: 'Kaffeemaschine in der Lounge leckt',
                    image: 'https://chayns.tobit.com/storage/77890-17410/Images/icon-72.png?_=1537865820',
                    group: 'Junior Team',
                    emergency: true,
                    history: [
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' },
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' },
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' }
                    ]
                },
                {
                    id: 2,
                    creator: 'Susi Strolch',
                    creationTime: new Date('1900-01-01 10:45'),
                    locationId: 157669,
                    locationName: 'P01010000',
                    description: 'Tür verschlossen',
                    image: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
                    group: 'Labs',
                }
                ]}
            />
            <ReportList
                title="Deine Aufgaben"
                data={[
                {
                    id: 1,
                    creator: 'Max Muster',
                    creationTime: new Date('2018-09-25 09:15'),
                    locationId: 1,
                    locationName: 'Bamboo',
                    description: 'Kaffeemaschine defekt',
                    details: 'Kaffeemaschine in der Lounge leckt',
                    image: 'https://chayns.tobit.com/storage/77890-17410/Images/icon-72.png?_=1537865820',
                    group: 'Junior Team',
                    emergency: true,
                    history: [
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' },
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' },
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' }
                    ]
                },
                {
                    id: 2,
                    creator: 'Susi Strolch',
                    creationTime: new Date('1900-01-01 10:45'),
                    locationId: 157669,
                    locationName: 'P01010000',
                    description: 'Tür verschlossen',
                    image: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
                    group: 'Labs',
                }
                ]}
            />
            <ReportList
                title="Deine Reports"
                data={[
                {
                    id: 1,
                    creator: 'Max Muster',
                    creationTime: new Date('2018-09-25 09:15'),
                    locationId: 1,
                    title: 'Kaffeemaschine defekt',
                    description: 'Kaffeemaschine in der Lounge leckt',
                    image: 'https://chayns.tobit.com/storage/77890-17410/Images/icon-72.png?_=1537865820',
                    group: 'Junior Team',
                    emergency: true,
                    history: [
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' }
                    ]
                },
                {
                    id: 2,
                    creator: 'Susi Strolch',
                    creationTime: '2018-02-01 10:45',
                    locationId: 157669,
                    description: 'Tür verschlossen',
                    image: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
                    group: 'Labs',
                }
                ]}
            />
            <ReportList
                title="In Bearbeitung"
                data={[
                {
                    id: 1,
                    creator: 'Max Muster',
                    creationTime: '2018-09-25 09:15',
                    locationId: 1,
                    title: 'Kaffeemaschine defekt',
                    description: 'Kaffeemaschine in der Lounge leckt',
                    image: 'https://chayns.tobit.com/storage/77890-17410/Images/icon-72.png?_=1537865820',
                    group: 'Junior Team',
                    emergency: true,
                    history: [
                        { date: '2014-01-02', user: 'Max Muster', message: 'hat diesen Bericht erstellt' }
                    ]
                },
                {
                    id: 2,
                    creator: 'Susi Strolch',
                    creationTime: '2018-02-01 10:45',
                    locationId: 157669,
                    description: 'Tür verschlossen',
                    image: 'https://st.depositphotos.com/1704023/5157/i/950/depositphotos_51577131-stock-photo-double-green-closed-door-detail.jpg',
                    group: 'Labs',
                }
                ]}
            />
            <ReportForm />
        </div>
    </div>
);

export default hot(module)(App);
