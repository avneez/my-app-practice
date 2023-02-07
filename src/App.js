
import Gallery from './components/Gallery.js';
import Welcome from './components/Welcome.js';
import TodoList from './components/ToDoList.js';

import './App.css';
import Parent from './components/PropDrilling';
import Add, {Example} from './components/Add.js';
import Clock from './components/Clock.js';



function App() {
  const obj={age: '35', d:'se'}

  return (
    <>
      <Welcome name="Avneez" role="Solution Engineer"/>
      <Welcome name="Mohit" />
      <Welcome name="Britani"/>
      <Welcome name="Jeet"/>
      <Welcome name="Zibran" role="Mentor"/>
      {/* <Welcome  {...obj}/> */}
      <Gallery />
      <TodoList />
      <Parent />
      <Example/>
    <Clock/>
    </>
  );
}

export default App;
