import React, {Component} from 'react';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {ActionTypes} from "./actionTypes";

class Results extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {height:'calc(100% - 1em)', width:'calc(100% - 1em)', fontSize:'3em', padding:'0.5em', letterSpacing:'2px', color:'rgb(130,130,130)'};
    return (<div>
        {this.props.fetching && <LinearProgress color="secondary" />}
        <Typography variant="headline" style={style}>{this.props.results.join('    ')}</Typography>
        <Snackbar open={this.props.error}
                  message={'Error while searching'} autoHideDuration={2000} onClose={()=>{this.props.clearError()}} />
      </div>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
  clearError : () =>
    dispatch({type: ActionTypes.CLEAR_ERROR})
})

export default connect(mapStateToProps, mapDispatchToProps)(Results);