export const SAVE_BOARD_SETTINGS = 'SAVE_BOARD_SETTIGNS';
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
  const data = await res.json();
  */
  const data = {
    departments: [
    {
      id: 1,
      userGroupId: 1,
      name: 'Labs',
    },
    {
      id: 2,
      userGroupId: 2,
      name: 'Facility',
    },
    {
      id: 3,
      userGroupId: 3,
      name: 'Junior Team',
    },
    {
      id: 4,
      userGroupId: 4,
      name: 'Web Technologies',
    },
    {
      id: 5,
      userGroupId: 5,
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
};
