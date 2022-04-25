import { Routes, Route, Link } from 'react-router-dom';

import { HomePage } from './pages/Home'
import { PostsPage } from './pages/Posts';

function App() {
  return (
    <div className="App">
      <h1>Hello React app!</h1>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/posts'>Posts</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts' element={<PostsPage />} />
      </Routes>
    </div>
  );
}

export default App;
