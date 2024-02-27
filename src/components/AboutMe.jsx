import React, { useEffect, useState } from 'react'
import style from "../css_modules/aboutMe.module.css"
import { base_url, period_month } from "../utils/constants"

const AboutMe = () => {
  const [hero, setHero] = useState()

  useEffect(() => {
    const hero = JSON.parse(localStorage.getItem("hero"));
    if (hero && (Date.now()) - (hero.time) < period_month) {
setHero(hero.payload)
    }else {
      fetch(`${base_url}/v1/peoples/1`)
      .then(response => response.json())
      .then(data => {
        const info = {
          "name": data.name,
          "height": data.height,
          "mass": data.mass,
          "hair_color": data.hair_color,
          "skin_color": data.skin_color,
          "eye_color": data.eye_color,
          "birth_year": data.birth_year,
          "gender": data.gender
        };
        setHero(info);
        localStorage.setItem("hero", JSON.stringify({time: Date.now(), payload: info}));
      });
    }
   
  }, [])

  return (
    <div>
      {(!!hero) &&
        <div className={`${style.farGalaxy} ${style.hero_box}`}>
          <p><span className={style.hero_titles}>name:</span> {hero.name}</p>
          <p><span className={style.hero_titles}>height:</span> {hero.height}</p>
          <p><span className={style.hero_titles}>birth year:</span> {hero.birth_year}</p>
          <p><span className={style.hero_titles}>gender:</span> {hero.gender}</p>
          <p><span className={style.hero_titles}>mass:</span> {hero.mass}</p>
          <p><span className={style.hero_titles}>hair color:</span> {hero.hair_color}</p>
          <p><span className={style.hero_titles}>skin color:</span> {hero.skin_color}</p>
          <p><span className={style.hero_titles}>eye color:</span> {hero.eye_color}</p>
        </div>
      }
    </div>
  )
}

export default AboutMe