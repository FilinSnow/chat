import React, { ReactElement, useEffect, useState } from 'react'
import { ITextProps } from '../../utils/interfaces/interfaces'
import './Text.scss'

const Text = ({item}: ITextProps) => {
  const [element, setElement] = useState<ReactElement<HTMLElement>>(<div>{item.text}</div>)

  useEffect(() => {
      if (item.text) {   
        if (item.text.indexOf('://') > 0 || !(item.text.indexOf('://') < 0)) {
          setElement(<img className='animated__emoji' src={item.text} alt="" />)
        }
      } else {
        setElement( <audio src={item.voice} controls></audio>)
      }
  }, [item])
  
  return (
    <React.Fragment>
      {element}
    </React.Fragment>
  )
}

export default Text