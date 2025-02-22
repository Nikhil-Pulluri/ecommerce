'use client'
import React from 'react'
import styled from 'styled-components'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div className="checkmark" />
      </label>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .container {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
  }

  /* Smaller custom checkbox */
  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 1.2em;
    width: 1.2em;
    background-color: #ccc;
    border-radius: 50%;
    transition: 0.3s;
  }

  .container input:checked ~ .checkmark {
    background-color: limegreen;
    transform: rotateX(360deg);
  }

  /* Larger checkmark/tick */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 0.45em;
    top: 0.3em;
    width: 0.3em;
    height: 0.6em;
    border: solid white;
    border-width: 0 0.2em 0.2em 0;
    transform: rotate(45deg);
  }
`

export default Checkbox
