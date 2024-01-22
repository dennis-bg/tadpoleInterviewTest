import React, { useState } from 'react';

import './App.css';
import { MeetingModal } from './MeetingModal';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(true);


  return (
    <div>
      <MeetingModal open={isModalOpen}/>
    </div>
  );
}

export default App;
