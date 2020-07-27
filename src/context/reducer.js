import {
  INCREASEBOXCOUNT,
  DECREASEBOXCOUNT,
  FENCESTATUS,
  ADDBOX,
  DELETEBOX,
  SELECTEDBOX,
  SELECTEDKEY,
} from "./actions";

export default (state, action) => {
  switch (action.type) {
    case FENCESTATUS:
      return {
        ...state,
        fence: action.payload,
        boxes: [],
        boxCount: 0,
        fenceBottom: state.fence ? state.fenceBottom - 50 : state.fenceBottom,
        fenceRight: state.fence ? state.fenceRight - 50 : state.fenceRight,
      };
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
        boxes: state.boxes.filter((box) => box.id !== action.payload),
        boxCount: state.boxCount - 1,
      };

    case SELECTEDBOX:
      return {
        ...state,
        isBoxSelected: true,
        selectedBox: action.payload,
      };
    case SELECTEDKEY:
      return {
        ...state,
        selectedKey: action.payload,
      };
    default:
      return state;
  }
};
