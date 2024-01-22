import React, { useState } from 'react';
import meetingDetails from './fixtures/meetingDetails.json'

import './App.css';
import { MeetingModal } from './components/MeetingModal';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(true);


  return (
    <div>
      <MeetingModal open={isModalOpen} meetingDetails={meetingDetails}/>
    </div>
  );
}

export default App;
