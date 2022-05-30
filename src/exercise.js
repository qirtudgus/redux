//리덕스에서 리덕스툴킷으로 마이그레이션하는것을 권장함
//그냥 createStore을 import시킬 시 경고문구가 계속 떠서 문구대로 수정
import { legacy_createStore as createStore } from "redux";

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성합니다.
// 굳이 변수에 할당하는 이유는 유지보수성을 위함이다!
// 추후에 해당 액션과 관련된 타입명을 모두 변경할 때 번거로움을 덜 수 있음
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성합니다.
function increase() {
  return {
    type: INCREASE, // 액션 객체에는 type 값이 필수입니다.
  };
}

const decrease = () => {
  return {
    type: DECREASE,
  };
};

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!

function reducer(state = initialState, action) {
  // state 의 초깃값을 initialState 로 지정했습니다.
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE: {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case CHANGE_TEXT: {
      return {
        ...state,
        text: action.text,
      };
    }
    case ADD_TO_LIST: {
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    }
    default:
      return state;
  }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store 안에 들어있는 상태를 조회합니다.

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
// const listener = () => {
//   const state = store.getState();
//   console.log(state);
// };

// const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.

// 액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕"));
store.dispatch(addToList({ id: "1", text: "리덕스" }));
