import React from 'react';
import Grid from '@material-ui/core/Grid';
import FolderTree from './component/folderTree'
import { connect } from 'react-redux'
import * as counterActions from './actions/counter'
import * as floderActions from './actions/addOrDelete'
import { bindActionCreators } from 'redux'



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentNode: null,
      currentTime: "0",
    }
    this.inputArea = React.createRef();
  }

  setshowInputField = (flag) => {
    this.setState({showInputArea : flag});
  }

  setCurrentNode = (node) => {
    // console.log(cmd);
    this.setState({ currentNode: node });
  }

  timer = () => {
    this.setState({currentTime: new Date().getTime()/1000})
  }

  componentDidMount() {
    setInterval(
      this.timer, 
    1000);
  }
  

  render() {
    // console.log(this.props.addOrDelete.children.length);
    // const { increment, decrement } = this.props;
    const { currentNode} = this.state;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FolderTree
              setCurrentNode={this.setCurrentNode}
              setshowInputField={this.setshowInputField}
              currentNode={currentNode}
            />
          </Grid>
          <Grid item xs={8}>
            {
              
              currentNode !== null &&
                currentNode.id !== 'root' ?
                <div>
                  <h3>{currentNode.name} life Time</h3>
                  {
                    Math.round(this.state.currentTime - currentNode.content)
                  }
                </div>
                : null
            }
          </Grid>
        </Grid>
        </div>
    );
  }
}

export default App;
