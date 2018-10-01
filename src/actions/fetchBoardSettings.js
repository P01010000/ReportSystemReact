import SERVER_URL from '../constants/server-url';
import { nearestDestination } from '../helper/haversine';
import { updateReportForm } from './updateReportForm';

export const SAVE_BOARD_SETTINGS = 'SAVE_BOARD_SETTINGS';
export const saveBoardSettings = data => ({
    type: SAVE_BOARD_SETTINGS,
    data
});

export const loadBoardSettings = () => async (dispatch) => {
  const res = await fetch(
   `${SERVER_URL}/api/boardSettings/${chayns.env.site.locationId}/${chayns.env.site.tapp.id}`,
   { headers: { 'Content-Type': 'application/json' } }
  );
  if (!res.ok) return; // error
  const data = await res.json();

  dispatch(saveBoardSettings(data));

  const { id: destinationId, name: destinationName } = await nearestDestination(data.destinations);
  dispatch(updateReportForm({ destinationId, destinationName }));
};
