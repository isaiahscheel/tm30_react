import {
  SET_SPD_WAVELENGTH,
  SET_EXAMPLE_OPEN,
  SET_PASTE_OPEN,
  SET_EXAMPLE,
  SET_BIN_LABELS,
  SET_BIN_DIVIDERS,
  SET_CHROMA_ISOLINES
} from "../redux/types";

export const setSPDxWavelength = (spd, wavelengths) => dispatch => {
  dispatch({ type: SET_SPD_WAVELENGTH, payload: { spd, wavelengths } });
};

export const setExampleOpen = () => dispatch => {
  dispatch({ type: SET_EXAMPLE_OPEN });
};

export const setPasteOpen = () => dispatch => {
  dispatch({ type: SET_EXAMPLE, payload: "" });
  dispatch({ type: SET_PASTE_OPEN });
};

export const setExample = example => dispatch => {
  dispatch({ type: SET_EXAMPLE, payload: example });
};

export const setBinLabels = bin_labels => dispatch => {
  dispatch({ type: SET_BIN_LABELS, payload: bin_labels });
};
export const setBinDividers = bin_dividers => dispatch => {
  dispatch({ type: SET_BIN_DIVIDERS, payload: bin_dividers });
};
export const setChromaIsolines = chroma_isolines => dispatch => {
  dispatch({ type: SET_CHROMA_ISOLINES, payload: chroma_isolines });
};
