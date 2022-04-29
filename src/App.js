import './App.css'; //a file style for app file
import './cal.css'; // a file style for calendar component
import $ from 'jquery';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { Note } from './Component/Note';

/* 
calendar is a component was dowload
we using one hook name val and handle setVal to set value for him!
note was declare here, not click to return, just click to show!
*/

function App() {
  const [val, setVal] = useState(() => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const showNote = () => {
    $(".note").show();
  }

  return (
    <div className="App">
      <Calendar className='cal' onChange={setVal} value={val} onClickDay={showNote}></Calendar>
      <Note props={val}></Note>
    </div>
  );
}

export default App;
