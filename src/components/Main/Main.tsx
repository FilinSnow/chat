import React, { FC } from 'react'

interface IMain {
  flag?: boolean;
  setFlag?: () => void
}

const Main: FC<IMain> = ({flag, setFlag}: IMain) => {
  return (
    <div>Main</div>
  )
}

export default Main