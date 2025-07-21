// import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((res) => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default App;
