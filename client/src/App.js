import './App.css';
import Landing from './components/Landing/Landing';
import PokeDetail from './components/PokeDetail/PokeDetail.jsx'
import Home from './components/Home/Home.jsx'
import PokeCreate from './components/PokeCreate/PokeCreate.jsx'
import { Route } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/details/:id' render={({match})=><PokeDetail id={match.params.id}/>}/>
      <Route exact path='/create' component={PokeCreate}/>

    </div>
  );
}

export default App;


