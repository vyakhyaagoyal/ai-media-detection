import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/')
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', file);

    if (!file) {
      alert('Please select a file first');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      alert('Upload successful');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit' className='bg-blue-600 p-2 rounded text-white'>Upload</button>
      </form>
      
    </div>
  );
}

export default App;
