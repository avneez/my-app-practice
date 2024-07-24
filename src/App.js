
import Gallery from './components/smallJsComponents/Gallery.js';
import Welcome from './components/smallJsComponents/Welcome.js';
import TodoList from './components/smallJsComponents/ToDoList.js';

import './App.css';
import Parent from './components/smallJsComponents/PropDrilling.js';
import Add, {CounterP} from './components/smallJsComponents/Add.js';
import Clock from './components/smallJsComponents/Clock.js';
import HandleEvent from './components/smallJsComponents/HandleEvent.js';
import Button from './components/smallJsComponents/Button.js';
import List from './components/smallJsComponents/List.js';
import Counter from './components/smallJsComponents/Counter.js';
import Colorizer from './components/Hooks/Colorizer.js';
import UseEffectt from './components/Hooks/useEffectt.js';
import FilterSearch from './components/FilteredSearch/FilterSearch.jsx'
import PasswordGen from './components/PasswordGenerator/PasswordGen.jsx';
import Playercard from './components/PlayerScoreCard/Playercard.jsx';
import SoloLevelingV1 from './components/SoloLevelingGame/SoloLevelingV1/SoloLevelingV1.jsx';
import SoloLevelingV2 from './components/SoloLevelingGame/SoloLevelingV2/SoloLevelingV2.jsx';
import FolderStructureDesign from './components/FolderStructureDesign/FolderStructureDesign.jsx';
import Pagination from './components/pagination/Pagination.jsx';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Login from './components/LoginOTP/Login.jsx';
import StarRating from './components/StarRating/StarRating.jsx';

function App() {
  const obj={age: '35', d:'se'}

  function addC(){
    alert('yo')
  }

  return (
    <div>
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
    {/* <br></br> */}
    {/* <UseEffectt/> */}
    {/* <FilterSearch/>
    <PasswordGen/> */ }
    {/* <Playercard/>  */}
    {/* <SoloLevelingV1/> */}
    {/* <SoloLevelingV2/> */}
    {/* <FolderStructureDesign/> */}
    {/* <Pagination/> */}
    {/* <Autocomplete/> */}
    {/* <Login/> */}
    <StarRating />
    </div>
  );
}

export default App;
