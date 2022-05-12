import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { IWaveFormProps } from '../../utils/interfaces/interfaces';
const track = require('../../files/track.mp3');

const WaveForm = ({ voiceUrl }: IWaveFormProps) => {
  const [playing, setPlaying] = useState(false)
  const waveform = useRef<any>()

  const handlePlay = () => {
    setPlaying(!playing);
    waveform?.current.playPause();
  }

  useEffect(() => {
    if (!waveform.current) {
      waveform.current = WaveSurfer.create({
        barWidth: 1,
        cursorWidth: 1,
        container: '#waveform',
        backend: 'WebAudio',
        height: 80,
        progressColor: '#2D5BFF',
        responsive: true,
        waveColor: '#EFEFEF',
        cursorColor: 'transparent',
        // maxCanvasWidth: 300
      });
    }
    // waveform.current?.load(`https://exceed-chat-app.herokuapp.com/voices/${voiceUrl}`)
  }, [])

  return (
    <div className='waveform__container'>
      <button className='waveform__play' onClick={handlePlay}>
        {!playing ? 'Play' : 'Pause'}
      </button>
      <div id='waveform'></div>
      <audio id='track' src={`https://exceed-chat-app.herokuapp.com/voices/${voiceUrl}`}></audio>
    </div>
  )
}

export default WaveForm