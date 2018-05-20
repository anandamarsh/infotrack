import {ActionTypes} from "./actionTypes";
import store from "./store"
import Axios from "axios";
import config from './config'

class SearchService {

  async search() {
    try {
      store.dispatch({type: ActionTypes.FETCH_RESULTS});
      const {keyword, url} = store.getState();
      const results = await Axios.get(config.url, {params: {keyword, url}});
      store.dispatch({type:ActionTypes.SET_RESULTS, results});
      this.callbacks && this.callbacks.forEach(callback=>callback(true));
    } catch(err) {
      store.dispatch({type:ActionTypes.ERROR_FETCHING_RESULTS});
      this.callbacks && this.callbacks.forEach(callback=>callback(false));
    }
  }

  subscribe(callback) {
    this.callbacks = this.callbacks ? this.callbacks : [];
    this.callbacks.push(callback)
  }

}

export default new SearchService();


























