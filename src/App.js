import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';

const getCloud = () =>
  `Ut id ornare magna Quisque sapien libero ornare nec porta vitae ornare ut odio Praesent luctus cursus facilisis Nullam eros eros tristique ut dui non congue vestibulum turpis Nulla faucibus mauris nec sollicitudin tincidunt Maecenas tincidunt rhoncus velit ac maximus diam fringilla quis Phasellus quam lectu consectetur non commodo nec luctus a arcu Proin aliquet lectus elementum lorem sodales vestibulum
Maecenas quis tortor porttitor interdum nulla eu elementum lacus Morbi imperdiet lectus non mi elementum dapibus Duis ut libero id dolor interdum interdum vel quis diam Morbi vulputate sapien libero in sollicitudin sem facilisis sagittis Donec aliquet efficitur mi in`
    .split(' ')
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

function App() {
  const [userImput, setUserInput] = useState('');

  const cloud = useRef(getCloud());

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  function processInput(value) {
    if (value.endsWith(' ')) {
      // the user has finished this word
      setActiveWordIndex((index) => index + 1);
      setUserInput('');

      //correct word
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>Typing Test</h1>
          <p>
            {cloud.current.map((word, index) => {
              return (
                <Word
                  text={word}
                  active={index === activeWordIndex}
                  correct={correctWordArray[index]}
                />
              );
            })}
          </p>
          <input
            type="text"
            value={userImput}
            onChange={(e) => processInput(e.target.value)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
