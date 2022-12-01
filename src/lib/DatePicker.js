import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import ChevronLeft from './assets/ChevronLeft'
import ChevronRight from './assets/ChevronRight'
import ChevronsLeft from './assets/ChevronsLeft'
import ChevronsRight from './assets/ChevronsRight'
import Home from './assets/Home'
import Select from './components/Select'
import { useOnClickOutside } from './hooks/useOnClickOutside'

const Container = styled.div`
  position: relative;
  --mainColor: #449f21;
  --lightGreen: #f3fff3;
  font-family: 'Lexend Deca', sans-serif;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  width: calc(100% - 4px);

  & label{
    font-size: 18px;
    font-weight: 600;
    color: var(--mainColor);
    margin: 5px 0;
  }

  & input{
    font-size: 18px;
    padding: .4em;
    width: calc(100% - .8em);
    border: 2px solid var(--mainColor);
    background-color: white;
    border-radius: 5px;
    color: var(--mainColor);
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 600;
    transition: all 200ms ease;
    cursor: pointer;

    &::-webkit-datetime-edit-day-field:focus,
    ::-webkit-datetime-edit-month-field:focus,
    ::-webkit-datetime-edit-year-field:focus{
      color: var(--mainColor);
      background-color: var(--lightGreen);
    }

    &:focus-visible{
      outline: none;
      background-color: var(--lightGreen);
    }

    &:hover{
      box-shadow: 0 4px 4px #ceeca464;
    }
  }
`

const CalendarContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0px 8px 10px #28420425; */
  border: 2px solid var(--mainColor);
  background-color: white;
  display: none;
  position: absolute;
  z-index: 50;
  width: 400px;

  &.active{
    display: block;
  }

  & ul.table-header{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    list-style-type: none;
    padding: 0;
    position: relative;
    opacity: .6;
    z-index: -1;

    & li{
      text-align: center;
      color: var(--mainColor);
    }

    &::before{
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -12px;
      background-color: var(--mainColor);
      border-radius: 5px;
    }
  }

  & div.header{
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    align-items: center;

    & div.date{
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      & p{
        margin: 0;
        color: var(--mainColor);
      }
    }

    & div.button-container{
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      &.prev{
        justify-content: flex-start;
      }

      & button{
        width: 35px;
        height: 35px;
        display: grid;
        place-content: center;
        border: 0;
        padding: 10px;
        margin: 0;
        border-radius: 50%;
        cursor: pointer;
        background-color: var(--mainColor);

        & svg{
          height: 15px;
          fill: var(--lightGreen);
        }
      } 
    }
  }
  
  & div.days-container{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;

    & div.day{
      border-radius: 5px;
      padding: 10px 0;
      color: var(--mainColor);
      text-align: center;
      cursor: pointer;
      transition: all 200ms ease;

      &.today{
        background-color: var(--lightGreen);
        outline: 2px solid var(--mainColor);
      }

      &:hover{
        background-color: #e4f6c7;
      }
    
      &.other-month{
        opacity: .5;
      }
    }
  }
`

const timestamp = new Date()

/**
 * DatePicker component
 * @param {String} label - Displayed label of the input 
 * @param {String} name - Name of the input
 * @param {function} onChamge - Handler for value change
 */
export default function DatePicker({ label, name, onChange }) {
  const ref = useRef()

  const [daysOfMonth, setDaysOfMonth] = useState([])
  const [year, setYear] = useState(timestamp.getFullYear())
  const [month, setMonth] = useState(timestamp.getMonth())
  const [active, setActive] = useState(false)
  const [inputDate, setInputDate] = useState(`${timestamp.getFullYear()}-${('0' + (timestamp.getMonth() + 1)).slice(-2)}-${('0' + timestamp.getDate()).slice(-2)}`)

  useOnClickOutside(ref, () => setActive(false))

  function getNumberOfDays() {
    return 40 - (new Date(2022, month, 40).getDate())
  }

  useEffect(() => {
    function getDaysOfMonth() { 
      const tempMonthArray = []
      const firstDay = new Date(year, month).getDay()
      let lastDay;
      if(new Date(year, month + 1).getDay() === 0){
        lastDay = 0
      } else {
        lastDay = 7 - new Date(year, month + 1).getDay()
      }
  
      for(let i = -firstDay + 1; i <= getNumberOfDays() + lastDay; i++){
        const day = new Date(year, month, i)
        let otherMonth = false
        if(i <= 0 || i > getNumberOfDays()){
          otherMonth = true
        }
        tempMonthArray.push({
          day: day.getDate(),
          date: day,
          otherMonth: otherMonth
        })
      }

      setDaysOfMonth(tempMonthArray)
    }
    getDaysOfMonth()

  }, [month, year])

  function handleNextMonth(e){
    e.preventDefault()
    if(month === 11){
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }
  function handlePreviousMonth(e){
    e.preventDefault()
    if(month === 0){
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  function handleToday(e){
    e.preventDefault()
    setYear(timestamp.getFullYear())
    setMonth(timestamp.getMonth())
  }

  function handleNextYear(e){
    e.preventDefault()
    setYear(year + 1)
  }
  function handlePreviousYear(e){
    e.preventDefault()
    setYear(year - 1)
  }

  function handleDayClick(e){
    const date = new Date(year, month, e.target.textContent)
    setInputDate(`${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`)
    setActive(false)
    onChange(date, name)
  }

  return daysOfMonth && (
    <Container>
      <InputContainer>
        <label htmlFor={name}>{label}</label>
        <input id={name} type='date' value={inputDate} onChange={(e) => console.log(e)} onClick={() => {setActive(!active)}}/>
      </InputContainer>
      <CalendarContainer className={active ? 'active' : ''} ref={ref}>
        <div className='header'>
          <div className='button-container prev'>
            <button onClick={handlePreviousYear}><ChevronsLeft /></button>
            <button onClick={handlePreviousMonth}><ChevronLeft /></button>
            <button onClick={handleToday}><Home /></button>
          </div>
          <div className='date'>
            <Select 
              defaultData={year}
              sendData={(e) => setYear(e)}
              dataSource='years'
              customStyle={
                {margin: 0,
                fontSize: '32px',
                fontWeight: 600}
              }
            />
            <Select 
              defaultData={month}
              sendData={(e) => setMonth(e)}
              dataSource='months'
            />
          </div>
          <div className='button-container'>
            <button onClick={handleNextMonth}><ChevronRight /></button>
            <button onClick={handleNextYear}><ChevronsRight /></button>
          </div>
        </div>
        <ul className='table-header'>
          <li>S</li>
          <li>M</li>
          <li>T</li>
          <li>W</li>
          <li>T</li>
          <li>F</li>
          <li>S</li>
        </ul>
        <div className='days-container'>
          {daysOfMonth.map((day, index) => 
            <div key={index} date={day.date} className={`day${day.otherMonth ? ' other-month' : ''} ${year === timestamp.getFullYear() && month === timestamp.getMonth() && day.day === timestamp.getDate() ? 'today': ''}`} onClick={handleDayClick}>{day.day}</div>
          )}
        </div>
      </CalendarContainer>
    </Container>
  )
}