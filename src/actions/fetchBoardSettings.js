import { nearestDestination } from '../helper/haversine';
import { updateReportForm } from './updateReportForm';

export const SAVE_BOARD_SETTINGS = 'SAVE_BOARD_SETTINGS';
export const saveBoardSettings = data => ({
    type: SAVE_BOARD_SETTINGS,
    data
});

export const loadBoardSettings = () => async (dispatch) => {
  /* const res = await fetch(
   `https://localhost:5001/api/boardSettings/${chayns.env.site.locationId}/${chayns.env.site.tapp.id}`,
   { headers: { 'Content-Type': 'application/json' } }
  );
  if (!res.ok) return; // error
  const data = await res.json(); */
  // await new Promise(res => setTimeout(() => res(), 1000));
  const data = {
    title: 'Report System Develop',
    introduction: 'Hier wirst du neue Störfälle melden oder Reports verwalten können.',
    departments: [
    {
      id: 1,
      userGroupId: 57263,
      name: 'Labs',
    },
    {
      id: 2,
      userGroupId: 57266,
      name: 'Facility',
    },
    {
      id: 3,
      userGroupId: 57262,
      name: 'Junior Team',
    },
    {
      id: 4,
      userGroupId: 57264,
      name: 'Web Technologies',
    },
    {
      id: 5,
      userGroupId: 57265,
      name: 'Creative Team',
    }
    ],
    destinations: [
    {
      id: 1,
      locationId: 1214,
      name: 'Campus',
      latitude: 52.516156,
      longitude: 7.0565
    },
    {
      id: 2,
      locationId: 1,
      name: 'Bamboo',
      latitude: 52.516156,
      longitude: 7.0565
    },
    {
      id: 3,
      locationId: 240,
      name: 'TKWY',
      latitude: 52.516156,
      longitude: 7.0565
    },
    {
      id: 4,
      locationId: 144269,
      name: 'The Unbrexit',
      latitude: 52.516156,
      longitude: 7.0565
    },
    {
      id: 5,
      locationId: 1214,
      name: 'Campus oben',
      latitude: 52.516156,
      longitude: 7.0565
    }
    ]
  };

  dispatch(saveBoardSettings(data));

  const { id: destinationId, name: destinationName } = await nearestDestination(data.destinations);
  dispatch(updateReportForm({ destinationId, destinationName }));
};
