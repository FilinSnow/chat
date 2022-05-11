import React, { useState } from 'react'
import voiceImg from '../../img/Dictation.svg'
import { api } from '../api/api';

const RecordVoice = ({ setVoiceUrl, setBlockWriteInput }: any) => {
  const [isVoice, setIsVoice] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
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
    setBlockWriteInput(true); // блок инпут ввода текста
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsVoice(true);
    };

    recorder.onstop = () => {
      setIsVoice(false);
      chunks = [];
      recorder.stream.getTracks().forEach(i => i.stop());
    };
    
    recorder.ondataavailable = e => {
      const file = new File([e.data], 'audio.webm');
      chunks.push(file);
      const blob = new Blob(chunks, { 'type': 'audio/webm; codecs=opus' });
      const formData = new FormData();
      formData.append('file', blob);
      api.uploadFile(formData)
        .then(res => {
          if (res) {
            setVoiceUrl(res.data)
          }
        })
    };
  }

  const stopRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  return (
    <div className="voice-audio" onClick={() => isVoice ? stopRecord() : onRecord()}>
      <img style={{ background: isVoice ? 'red' : '', borderRadius: '50%' }} src={voiceImg} alt="startVoice" />
    </div>
  )
}

export default RecordVoice