import React from 'react';
import './Reel.css';

const Spinner = (props) => {
  return(
    <div className="img_container col-4 text-center">
      <img 
      src={`/fruits/${props.fruit}.jpg`} 
      alt={props.fruit}
      className="img-fluid"/>
    </div>
  )
}

export default Spinner;