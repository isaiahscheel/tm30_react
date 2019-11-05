import { ME_FETCH_SUCCESS, ME_FETCH_ERROR } from "../actions/me";

// Massaging opwhse api (v3 'json api') data to work with pnnl-react-core profile popover
function formatOpwhsePerson(payload) {
  // Extract relationship data
  const department = payload.included.find(i => i.type === "department");
  const facility = payload.included.find(i => i.type === "facility");
  let space = payload.included.find(i => i.type === "space");
  const location = payload.data.relationships.locations.data.find(
    loc => loc.meta.isSpace && loc.meta.usage === 'contact'
  );
  if (location) {
    space.attributes.locationId = location.id;
  }

  const { name, email, phone, mailstop, portrait, ...person } = payload.data.attributes;

  return {
    ...person,
    ...name,
    emailAddress: email && email.address,
    phoneNumber: phone && phone.number,
    mailstop: mailstop && mailstop.msin,
    portraitLink: portrait && portrait.url,
    facility: facility && facility.attributes,
    space: space && space.attributes,
    department: department && department.attributes
  };
}

export default function me(state = {}, action) {
  switch (action.type) {
    case ME_FETCH_SUCCESS:
      return Object.assign({}, state, formatOpwhsePerson(action.payload));
    case ME_FETCH_ERROR:
      // TODO: Handle your errors
      return state;
    default:
      return state;
  }
}
