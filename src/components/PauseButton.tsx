import React from 'react'

interface Props {
  onClick: () => void;
}

const PauseButton = ({onClick} : Props) => {
  return (
    <button type="button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    </button>
  )
}

export default PauseButton