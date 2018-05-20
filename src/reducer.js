/*global chrome*/

import {ActionTypes} from './actionTypes';

const seedState = {
  keyword:'online title search',
  url:'https://www.infotrack.com.au',
  fetching: true,
  results:[]
};

export default function SessionReducer(state, action) {

  // read the state from the storage, and if not present, set it up
  if(!state){
    let keyword = window.localStorage.getItem("keyword");
    let url = window.localStorage.getItem("url");
    if(!keyword || !url) {
      state = seedState;
      window.localStorage.setItem("keyword", seedState.keyword);
      window.localStorage.setItem("url", seedState.url);
    } else
      state = {...seedState, keyword, url};
    // and communicate the state to chrome extension
    try { chrome.runtime.sendMessage(action)} catch(e){}
  }

  switch (action.type) {

    case ActionTypes.CHANGE_SETTINGS:
      try {
        window.localStorage.setItem("keyword", action.keyword);
        window.localStorage.setItem("url", action.url);
        chrome.runtime.sendMessage(action)
      } catch(e){}
      return {...state, keyword:action.keyword, url:action.url};

    case ActionTypes.FETCH_RESULTS:
      return {...state, fetching:true};

    case ActionTypes.SET_RESULTS:
      return {...state, fetching:false, results:action.results.data};

    case ActionTypes.ERROR_FETCHING_RESULTS:
      return {...state, fetching:false, error:true};

    case ActionTypes.CLEAR_ERROR:
      return {...state, error:false};

    default:
      return state;

  }

}