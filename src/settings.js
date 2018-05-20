import React, {Component} from 'react';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import {ActionTypes} from "./actionTypes";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {keyword:props.keyword, url:props.url};
    this.props.propagateState(this.state);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => this.props.propagateState(this.state));
  };

  render() {
    const style = {width:'90%', marginTop:'2.5em'};
    return (
      <div>
        <TextField id="keyword" label="keyword" value={this.state.keyword} style={style} onChange={this.handleChange('keyword')}/>
        <TextField id="url" label="url" value={this.state.url} style={style} onChange={this.handleChange('url')}/>
      </div>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
  save : (keyword, url) =>
    dispatch({type:ActionTypes.CHANGE_SETTINGS, keyword, url})
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);