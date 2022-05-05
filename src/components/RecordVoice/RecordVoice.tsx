import React, { useState } from 'react'
import voiceImg from '../../img/Dictation.svg'

const RecordVoice = () => {
  const [voice, setVoice] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()
  let chunks: Array<Blob> = []

  const onRecord = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        startRecord(stream)
      });
    }
  };

  
  const startRecord = (stream: MediaStream) => {
    const recorder = new MediaRecorder(stream);

    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setVoice(true);
    };

    recorder.onstop = () => {
      setVoice(false);
      // const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
      chunks = [];
      // const audioURL = URL.createObjectURL(blob);

      recorder.stream.getTracks().forEach(i => i.stop());
    };

    recorder.ondataavailable = e => {
      const file = new File([e.data], 'audio.webm');
      console.log(file);
      
      chunks.push(e.data)
    };
  }


  const stopRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  return (
    <div className="voice-audio" onClick={() => voice ? stopRecord() : onRecord()}>
      <img style={{ color: voice ? 'red' : 'grey' }} src={voiceImg} alt="startVoice" />
    </div>
  )
}

export default RecordVoice