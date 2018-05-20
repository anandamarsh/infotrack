import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import RefreshIcon from '@material-ui/icons/Refresh';

import searchService from './searchService'
import store from './store';
import Results from './results'
import Settings from './settings'
import SearchService from './searchService'
import {ActionTypes} from "./actionTypes";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {showSettings: false, keyword:null, url:null, fetching:true};
  }

  showSettings = () => {
    this.setState({...this.state, showSettings: true});
  };

  cancelSettings = () => {
    this.setState({...this.state, showSettings: false});
  };

  propagateState = ({keyword, url}) => {
    this.setState({...this.state, keyword: keyword, url: url});
  }

  saveSettings = () => {
    this.setState({...this.state, showSettings: false});
    store.dispatch({type:ActionTypes.CHANGE_SETTINGS, keyword:this.state.keyword, url:this.state.url});
  }

  fetchSearchResults = () => {
    this.setState({...this.state.fetching, fetching:true});
    SearchService.search();
  }

  componentDidMount = () => {
    this.setState({...this.state.fetching, fetching:true});
    searchService.subscribe(()=>this.setState({...this.state.fetching, fetching:false}));
    searchService.search();
    store.dispatch({type:ActionTypes.FETCH_RESULTS});
  }

  render() {
    const iconStyle = {position: 'absolute', right: '2em', color: 'whitesmoke'};
    return (
      <Provider store={store}>
        <Card style={{
          width: '30em', height: '19em', borderRadius: '4px', boxShadow: 'none',
          textAlign: 'center', border: '4px solid rgb(64,85,175)', background: '#f5fafd'
        }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" style={{color: 'whitesmoke'}}>Keyworder</Typography>
              <IconButton style={{...iconStyle, right: '2em'}} onClick={this.fetchSearchResults} disabled={this.state.fetching}>
                {!this.state.showSettings && <RefreshIcon/>}
                {this.state.showSettings && <SaveIcon onClick={this.saveSettings}/>}
              </IconButton>
              <IconButton style={{...iconStyle, right: '0.5em'}} disabled={this.state.fetching}>
                {!this.state.showSettings && <SettingsIcon onClick={this.showSettings}/>}
                {this.state.showSettings && <CancelIcon onClick={this.cancelSettings}/>}
              </IconButton>
            </Toolbar>
          </AppBar>
          {!this.state.showSettings && <Results/>}
          {this.state.showSettings && <Settings propagateState={this.propagateState}/>}

        </Card>
      </Provider>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
