import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import * as floderActions from '../actions/addOrDelete'
import { bindActionCreators } from 'redux'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});


function RecursiveTreeView(props) {
  const classes = useStyles();
  const [folderId, setFolderId] = React.useState("");
  const [name, setName] = React.useState(null);
  const [isRoot, setIsRoot] = React.useState(true);
  const [noCopy, setNoCopy] = React.useState(true);

  const nodeClicked = (node) => {
    console.log(node);
    props.setCurrentNode(node);
    setFolderId(node.id);
    node.name !== "root" ? setIsRoot(false) : setIsRoot(true);
  }

  const notOpen = (e) => {
    e.preventDefault();
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id} nodeId={nodes.id}
      label={
        <div style={{ display: 'flex', width: "100%"}}>
          <div style={{ alignItems: 'center', lineHeight: '44px', marginRight: '15px' }}>{nodes.name}</div>
          <div style={{ "marginLeft": 'auto'}} >
           
            <IconButton disabled={ props.currentNode == null} onClick={addFolferClick.bind(this, nodes.id)} aria-label="newFolder" >
              <CreateNewFolderIcon fontSize="small" />
            </IconButton>
            <IconButton disabled={nodes.id == 'root' || props.currentNode == null||(props.currentNode != null && props.currentNode.id !== nodes.id) } onClick={copyFolders.bind(this, nodes.id)} aria-label="copy" >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      }
      onLabelClick={notOpen}
      onClick={nodeClicked.bind(this, nodes)}
    >
      {nodes.children && Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
    
  );
  const addFolferClick = (nodeId) => {
    if (!InputIsEmpty()) {
      props.floderActions.addF(name, nodeId, 'folder');
    }
  }

  const InputIsEmpty = () => {
    return name == null || name.trim() == "";
  }

  function CloseSquare(props) {
    return (
      <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    );
  }

  const deleteFloder = () => {
    props.setCurrentNode(null);
    props.floderActions.deleteF(props.currentNode.id);
  }

  const inputChange = (e) => {
    setName(e.target.value);
  }

  const copyFolders = (nodeId) => {
    console.log(nodeId);
    if (!isRoot && props.currentNode !== null) {
      setNoCopy(false);
      props.floderActions.copyFolder( props.currentNode, nodeId);
    }
  }

  const pasteClick = () => {
    props.floderActions.pasteFolder(folderId);
  }

  const changeName = () => {
    if (!InputIsEmpty()) {
      props.floderActions.changeName(name, folderId);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', width: "100%"}}>
      <IconButton disabled={isRoot}
             style={{ marginRight: '15px', marginLeft:'auto'}}
              onClick={deleteFloder}
              aria-label="delete" >
              <DeleteIcon fontSize="small" />
            </IconButton>
        <Button
          style={{ marginRight: '15px'}}
          disabled={props.currentNode == null || noCopy }
          onClick={pasteClick}
          variant="contained"
          size="small"
          color="primary"
          href="#contained-buttons">
          paste
         </Button>
        <Button
          onClick={changeName}
          disabled={props.currentNode == null}
          variant="contained"
          size="small"
          color="primary"
          href="#contained-buttons">
          rename
         </Button>
      </div>

      <TextField onChange={inputChange} id="standard-basic" label="Standard" />

      <TreeView
        style={{width: "100%"}}
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultEndIcon={<CloseSquare />}
      >
        {renderTree(props.addOrDelete)}
      </TreeView>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    addOrDelete: state.addOrDelete
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    floderActions: bindActionCreators(floderActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecursiveTreeView);
