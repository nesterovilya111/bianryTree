import React from 'react';
import { BinarySearchTree } from './utils/BinarySearchTree';

const bst = new BinarySearchTree();
var lastAdd = -1;


function App() {
  function Tree(props) {
    const { data } = props;
    function onClick(num) {
      console.log(props);
      props.del(num);
    }
    function renderTree(node) {
      return Object.entries(node).map(function ([key, value]) {
        if (key === 'left' && typeof value === 'object') {
          if (value !== null) {
            return (
              <li
                key={value.data}
                
              >
                <Tree data={value} del={props.del} />
              </li>
            );
          }
          if (value === null) {
            return null;
          }
        } else if (key === 'right' && typeof value === 'object') {
          if (value !== null) {
            return (
              <li key={value.data} >
                <Tree data={value}  del={props.del}/>
              </li>
            );
          }
          if (value === null) {
            return null;
          }
        }
      });
    }
  
    return data ? (
      <>
      {console.log(data)}
        <span className={(data.data == lastAdd)?"tf-nc animate":"tf-nc"}  onClick={() => {
                onClick(data.data);
              }}>{data.data}</span>
        <ul>{renderTree(data)}</ul>
      </>
    ) : (
      'EMPTY'
    );
  }
  const [number, setNumber] = React.useState(50);
  const [root, setRoot] = React.useState(null);

  React.useEffect(() => {
    _addNumber(3);
    _addNumber(5);
    _addNumber(2);
    lastAdd = -1;
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }, []);

  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }

  function addNumber(e) {
    e.preventDefault();
    _addNumber(number);
  }
  function _addNumber(_number){
    lastAdd = _number;
    bst.add(_number);
    setRoot((prev) => ({ ...prev, ...bst.root }))
  }
  function removeNumber(e) {
    e.preventDefault();
    bst.remove(number);
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }
  function _removeNumber(_number) {
    bst.remove(_number);
    setRoot((prev) => ({ ...prev, ...bst.root }));
  }


  return (
    <div className="container">
      <h1>Binary Search Tree Visualization</h1>
      <h4 style={{margin:"5px"}}>You can delete node by clicking it!</h4>
      <form onSubmit={addNumber} className="form-control">
        <input type="number" min="1" name="add" onChange={changeNumber} required />
        <button type="submit" className="input-button">
          Add
        </button>
      </form>
 
      <div className="tf-tree tf-custom">
        <ul>
          <li>
            <Tree data={root} parent={bst.root} del={_removeNumber}/>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
