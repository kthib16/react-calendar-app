import React from 'react';
import { US_STATES } from '../data/states';

const StateSelect = ({ id, name, value, onChange, placeholder }) => (
  <select id={id} name={name} value={value} onChange={onChange} className='form-control'>
    {placeholder && <option value=''>{placeholder}</option>}
    {US_STATES.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>
);

export default StateSelect;
