import {
  SET_LOADING,
  INCREASEBOXCOUNT,
  DECREASEBOXCOUNT,
  FENCESTATUS,
  ADDBOX,
  DELETEBOX,
  SELECTEDBOX,
} from "./actions";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case FENCESTATUS:
      return { ...state, fence: action.payload };
    case INCREASEBOXCOUNT:
      return { ...state, boxCount: state.boxCount + action.payload };
    case DECREASEBOXCOUNT:
      return { ...state, boxCount: action.payload };
    case ADDBOX:
      return {
        ...state,
        boxes: [action.payload, ...state.boxes],
        boxCount: state.boxCount + 1,
      };
    case DELETEBOX:
      return {
        ...state,
        boxes: state.boxes.filter((box) => box.id != action.payload),
        boxCount: state.boxCount - 1,
      };

    case SELECTEDBOX:
      return {
        ...state,
        isBoxSelected: true,
        selectedBox: action.payload,
      };

    default:
      return state;
  }
};
