import {
  SET_SPD_WAVELENGTH,
  SET_EXAMPLE_OPEN,
  SET_PASTE_OPEN,
  SET_EXAMPLE,
  SET_BIN_LABELS,
  SET_BIN_DIVIDERS,
  SET_CHROMA_ISOLINES
} from "../redux/types";

const initialState = {
  spd: [],
  wavelengths: [],
  loading: false,
  example_open: false,
  paste_open: false,
  example: "",
  bin_labels: true,
  bin_dividers: true,
  chroma_isolines: true
  //cvg_options: { bin_labels: true, bin_dividers: true, chroma_isolines: true }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPD_WAVELENGTH:
      return {
        ...state,
        spd: action.payload.spd,
        wavelengths: action.payload.wavelengths
      };
    case SET_EXAMPLE_OPEN:
      return {
        ...state,
        example_open: true,
        paste_open: false
      };
    case SET_PASTE_OPEN:
      return {
        ...state,
        example_open: false,
        paste_open: true
      };
    case SET_EXAMPLE:
      return {
        ...state,
        example: action.payload
      };
    case SET_BIN_LABELS:
      return {
        ...state,
        bin_labels: action.payload
      };
    case SET_BIN_DIVIDERS:
      return {
        ...state,
        bin_dividers: action.payload
      };
    case SET_CHROMA_ISOLINES:
      return {
        ...state,
        chroma_isolines: action.payload
      };
    default:
      return state;
  }
}
