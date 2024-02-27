import React from 'react'
import { starWarsInfo } from '../utils/constants'
import style from '../css_modules/farGalaxy.module.css';

const StarWars = () => {
  return (
    <div className={style.farGalaxy}>{starWarsInfo}</div>
  )
}

export default StarWars