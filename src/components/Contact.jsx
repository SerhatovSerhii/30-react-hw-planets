import React, { useState, useEffect } from 'react'
import style from "../css_modules/contact.module.css"
import { base_url } from "../utils/constants"

const Contact = () => {
  // Мы используем хук состояния useState, чтобы создать состояние planets, которое изначально устанавливается в массив ['wait...']. Этот массив будет содержать имена планет, полученные из API.
  const [planets, setPlanets] = useState(['wait...']);
  // Функция fillPlanets: Это асинхронная функция, которая принимает URL и выполняет запрос к API для получения списка планет. Она использует fetch для отправки запроса и дожидается ответа с помощью ключевого слова await. Затем она преобразует полученные данные в формат JSON и извлекает только имена планет, сохраняя их в локальную переменную planets. После этого она обновляет состояние planets с помощью функции setPlanets.
  async function fillPlanets(url) {
    const response = await fetch(url);
    const json = await response.json();
    const planets = json.map(item => item.name);
    setPlanets(planets);
  }
  // Эффект useEffect: Мы используем хук useEffect, чтобы вызвать функцию fillPlanets один раз при монтировании компонента. Мы передаем ей URL, который указывает на эндпоинт API для получения списка планет.
  useEffect(() => {
    const newPlanets = JSON.parse(localStorage.getItem("planets"));
    if (newPlanets && (Date.now()) - (newPlanets.time) < period_month) {
      setPlanets(newPlanets.payload)
    } else {
      fillPlanets(`${base_url}/v1/planets`)
        .then(planets => {
          setPlanets(planets);
          localStorage.setItem("planets", JSON.stringify({ time: Date.now(), payload: planets }));
        })
        .catch(e => console.error('Ошибка при загрузке планет:', e));
    }
  }, [])

  return (
    <div>
      <form className={style.container}
        // onSubmit={(e) => { e.preventDefault(); }} - это обработчик события, который вызывается при отправке формы. Он использует функцию стрелки, чтобы предотвратить стандартное поведение отправки формы, вызывая e.preventDefault().
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <label>First Name
          <input type="text" name="firstname" placeholder="Your first name..." />
        </label>
        <label>Last Name
          <input type="text" name="lastname" placeholder="Your last name..." />
        </label>
        <label>Planet
          <select name="planet">{
            planets.map(item => <option value={item} key={item}>{item}</option>)
          }
          </select>
        </label>
        <label>Subject
          <textarea name="subject" placeholder="Write something..." />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )

}

export default Contact