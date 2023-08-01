
import Gallery from './components/Gallery.js';
import Welcome from './components/Welcome.js';
import TodoList from './components/ToDoList.js';

import './App.css';
import Parent from './components/PropDrilling';
import Add, {CounterP} from './components/Add.js';
import Clock from './components/Clock.js';
import HandleEvent from './components/HandleEvent.js';
import Button from './components/Button.js';
import List from './components/List.js';
import Player from './components/Player'
import Counter from './components/Counter.js';
import Colorizer from './components/Hooks/Colorizer.js';
import UseEffectt from './components/Hooks/useEffectt.js';
import FilterSearch from './components/FilteredSearch/FilterSearch.jsx'

function App() {
  const obj={age: '35', d:'se'}

  function addC(){
    alert('yo')
  }

  return (
    <>
       <Welcome name="Avneez" role="Solution Engineer"/>
      {/*<Welcome name="Mohit" />
      <Welcome name="Britani"/>
      <Welcome name="Jeet"/>
      <Welcome name="Zibran" role="Mentor"/>
      <Welcome  {...obj}/>
      <Gallery />
      <TodoList />
      <Parent />
      <Example/>
    <Clock/>
    <HandleEvent/> */}
    {/* <CounterP/> */}
    {/* <List/> */}
    {/* <Counter/> */}

    {/* <Player url='https://soundcloud.com/pixeladed-le/long-playlist-of-relaxing-soft?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'/> */}

    {/* <Colorizer/> */}
    {/* <CounterP/> */}
    <br></br>
    {/* <UseEffectt/> */}
    <FilterSearch/>
    </>
  );
}

export default App;
