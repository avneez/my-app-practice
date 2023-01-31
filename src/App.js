
import Gallery from './components/Gallery.js';
import Welcome from './components/Welcome.js';
import TodoList from './components/ToDoList.js';

import './App.css';
import Parent from './components/PropDrilling';



function App() {

  return (
    <>
      <Welcome name="Avneez" role="Solution Engineer"/>
      <Welcome name="Mohit" />
      <Welcome name="Britani"/>
      <Welcome name="Jeet"/>
      <Welcome name="Zibrain" role="Mentor"/>
      <Gallery />
      <TodoList />

      <Parent />

    </>
  );
}

export default App;
