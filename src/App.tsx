import './App.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import CsvUploader from './components/CsvUploader';
import Map from './components/Map';
import BottomSheet from './components/BottomSheet';


function App() {

  return (
    <MantineProvider>
    <div className='bg'>
      <div className='container'>
        <div className='inner'>
          <Map />
          <CsvUploader />
          <BottomSheet />
        </div>
      </div>
    </div>
    </MantineProvider>
  )
}

export default App
