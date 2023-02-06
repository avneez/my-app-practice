
import Gallery from './components/Gallery.js';
import Welcome from './components/Welcome.js';
import TodoList from './components/ToDoList.js';

import './App.css';
import Parent from './components/PropDrilling';
import Add, {Example} from './components/Add.js';



function App() {

  return (
    <>
      {/* <Welcome name="Avneez" role="Solution Engineer"/>
      <Welcome name="Mohit" />
      <Welcome name="Britani"/>
      <Welcome name="Jeet"/>
      <Welcome name="Zibrain" role="Mentor"/> */}
      <Welcome />
      <Gallery />
      <TodoList />
      <Parent />
      <Example/>

    </>
  );
}

export default App;
