import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
import { displayTime, hoursToSeconds, stringDate } from "../helper/helper";
import { MdDelete, MdDone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import {LuSearch} from 'react-icons/lu'
// import DatePicker, { TimePicker } from 'sassy-datepicker';
// import 'sassy-datepicker/dist/styles.css';
import icoon from '../assets/keys.svg'
function TaskEditor({ id, deleteIcon, setTaskOpen }) {
  const { createTask, updateTask, deleteTask, users } = useGlobalContext();
  const today = stringDate(format(new Date(), "yyyy/MM/dd"), true);
  const [formData, setFormData] = useState({
    assigned_user: "user_8c2ff2128e70493fa4cedd2cab97c492",
    task_date: today,
    task_time: 0,
    is_completed: 0,
    time_zone: 19800,
    task_msg: "",
  });

  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const refOne = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    // console.log(date);
    setDate(date);
    let stringdate = stringDate(format(date, "yyyy/MM/dd"), true);

    setFormData({ ...formData, task_date: stringdate });
    // setCalendar(format(date, "yyyy/MM/dd"));
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // set current date on component load
    // setCalendar(format(new Date(), "yyyy/MM/dd"));
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  //get a single task
  const getSingleTask = async (id) => {
    try {
      const { data } = await axios(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${
          import.meta.env.VITE_COMPANY_ID
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const {
        assigned_user,
        task_date,
        task_time,
        is_completed,
        time_zone,
        task_msg,
      } = data.results;
      const currentTaskDetails = {
        assigned_user,
        task_date,
        task_time,
        is_completed,
        time_zone,
        task_msg,
      };
      if (deleteIcon) {
        setFormData(currentTaskDetails);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSingleTask(id);
  }, []);

  // update local Task(from) details
  const updateFormData = (e) => {
    if (e?.target?.dataset?.user) {
      console.log(e.target.dataset.user);
      return;
    }
    if (e?.target?.name === "task_time") {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // creating time for select menu
  const time = Array.from({ length: 22.5 }, (_, ind) => {
    return `${Math.floor(ind * 0.5 + 1)}:${
      (ind * 0.5 + ind * 0.5) % 2 === 0 ? "00" : "30"
    }`;
  });

  // update select user
  const onChange = (date) => {
    console.log(date.toString());
  };
  return (
    <Wrapper
      style={{
        
        borderTop: deleteIcon ? null : "1px solid var(--clr-grey-50)",
      }}
    >
      <form
        onSubmit={(e) => {
          // console.log(id);
          e.preventDefault();
          {
            id ? updateTask(id, formData) : createTask(formData),
              setTaskOpen(false);
          }
        }}
      >
        {/* task description */}
        <div>
          <label>Task Description</label>
          <br />
          <input
            className="task_desc"
            type="text"
            placeholder="Task"
            name="task_msg"
            required
            value={formData.task_msg}
            onChange={updateFormData}
          />
        </div>

        {/* select date */}
        <div className="date flex-center">
          <span>
            <label htmlFor="">Date</label>
            <br />
            <div className="date1 flex-center">
              {/* <CustomDatePicker /> */}
              <CalenderWrapper className="calendarWrap">
                <div
                  className="d-flex flex-center calIcon"
                  onClick={() => setOpen((open) => !open)}
                >
                  <SlCalender className=""/>
                  {/* <input
                    name="task_date"
                    value={displayTime(formData.task_date)}
                    readOnly
                    className="inputBox"
                  /> */}
                </div>

                <div className="cal-cont" ref={refOne}>
                  {/* {console.log(new Date(stringDate(formData.task_date)))} */}
                  {open && (
                    // <Calendar
                    //   date={date}
                    //   shownDate={new Date(stringDate(formData.task_date))}
                    //   onChange={handleSelect}
                    //   className="calendarElement"
                    // />
                    // <DatePicker onChange={onChange} />
                    <></>
                    )}
                    <DatePicker 
                    

                    className="custom-picker" 
                    selected={new Date(stringDate(formData.task_date))} 
                    onChange={handleSelect}
                    // dateFormat="Pp"
                    />

                    
                  {/* <SlCalender  className="calIcon"/> */}
                </div>

              </CalenderWrapper>
            </div>

            {/* </div> */}
          </span>

          <span className="time">
            <label htmlFor="">Time</label>
            <br />
            <select
              name="task_time"
              value={formData.task_time}
              className="time"
              onChange={updateFormData}
            >
              <option value="0">12:00am</option>
              <option value={hoursToSeconds(["00", "30"])}>12:30am</option>
              {time.map((clock, index) => {
                return (
                  <option key={index} value={hoursToSeconds(clock.split(":"))}>
                    {clock}am
                  </option>
                );
              })}
              <option value={hoursToSeconds(["12", "00"])}>12:00pm</option>
              <option value={hoursToSeconds(["12", "30"])}>12:30pm</option>
              {time.map((clock, index) => {
                const time = [
                  `${Number(clock.split(":")[0]) + 12}`,
                  clock.split(":")[1],
                ];

                return (
                  <option key={index} value={hoursToSeconds(time)}>
                    {clock}pm
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        {/* user select dropdown */}
        <label>Assign User</label>
        <div className="dropdown-menu" onClick={() => setDropDown(!dropDown)}>
          {dropDown? 

          
          <LuSearch className="searchIconD"/>:
<img src={icoon}alt="" className="searchIconD keysIcon" />
        
        }
          {users.map((user) => {
            return (
              <p key={user.id} className="parent-select">
                {user.id === formData.assigned_user && user.name}
              </p>
            );
          })}
          {/* <p> {selectUser}</p> */}
          <div className={dropDown ? "enclose" : "enclose hide"}>
            <div className="up-arrow"></div>
            {users.map((user) => {
              // console.log(user.id);
              return (
                <div className="dropdown-container" key={user.id}>

                  <p
                    onClick={() => {
                      setFormData({ ...formData, assigned_user: user.id });
                    }}
                    data-user={user.name}
                    className={`dropdown-item d-flex `}
                    style={{
                      background:
                        formData.assigned_user === user.id
                          ? "#cdcdcd44"
                          : "#fff",
                    }}
                  >
                    <MdDone
                      data-user={user.name}
                      className={
                        formData.assigned_user === user.id
                          ? "mark"
                          : "mark invisible"
                      }
                    />
                    {user.name}
                  </p>
                  
                </div>
              );
            })}
          </div>
        </div>

        {/* action buttons */}
        <div
          className="btn-container flex-center "
          style={{ justifyContent: deleteIcon ? "space-between" : "end" }}
        >
          {deleteIcon && (
            <button
              type="button"
              className="deleteBtn"
              onClick={() => deleteTask(id)}
            >
              <MdDelete />
            </button>
          )}
          <div>
            <button type="button" onClick={() => setTaskOpen(false)}>
              Cancel
            </button>
            <button className="saveBtn" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default TaskEditor;

const Wrapper = styled.div`
  background-color: var(--clr-bg-1);
  padding: 0.625rem;
  .task_desc {
    height: 2rem;
  }
  input {
    border: 1px solid var(--clr-grey-50);
    border-radius: 2px;
    padding: 5px 0.625rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  /* date and time styles */
  .date {
    justify-content: space-between;
    margin: 0.625rem 0;
    margin-bottom: 1rem;

    > span {
      width: 45%;
      label {
        font-weight: 500;
      }
      input {
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        /* margin-top: 5px; */
      }

      .date1 {
        background-color: #ffffff;
        // background: red;
        height: 100%;
        width: 100%;
        justify-content: start;
        gap: 1rem;
        height: 2rem;
        margin-top: 5px;
        border: 1px solid var(--clr-grey-50);
        // padding-left: 1rem;
        // display: block;
        cursor: pointer;
      }
    }
  }

  .time {
    select {
      width: 100%;
      outline: none;
      font-size: 1rem;
      padding-left: 3rem;
      border: 1px solid var(--clr-grey-50);
      height: 2rem;
      margin-top: 5px;
      background-color: #fff;
      /** for the dropdown indicator */
      appearance: none;
      background-image: url("https://img.icons8.com/?size=512&id=3160&format=png");
      background-repeat: no-repeat;
      background-position: left 1rem center;
      background-size: 1rem;
      cursor: pointer;
    }
  }

  /* buttons */
  .btn-container {
    /* margin: 1rem 0; */
    margin-top: 1.5rem;
    margin-bottom: 0.9rem;

    .saveBtn {
      background-color: dodgerblue;
      padding: 5px 1.5rem;
      border-radius: 1rem;
      transition: var(--transition);
      color: #fff;
      margin-left: 1rem;
      :hover {
        background-color: #1a69b7;
      }
    }
  }

  .dropdown-menu {
    width: 100%;
    height: 2rem;
    background-color: #ffffff;
    border: 1px solid var(--clr-grey-50);
    .searchIconD{
      position: absolute;
      left: 90%;
      top: .4rem;
      color: grey;
      font-size: 1.1rem;
    }
    .keysIcon{
      width: 1rem;
      top: .3rem;
    }
    margin-top: 0.5rem;
    position: relative;
    align-items: center;
    cursor: pointer;
    > p {
      padding-left: 1rem;
      padding-top: 2px;
    }
    ::after {
      content: "";
      // background: url("https://img.icons8.com/?size=1x&id=59878&format=png")
      // background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAYAAACXOioTAAAAAXNSR0IArs4c6QAAAZhJREFUSEvtlk3LgkAUhY99Uv0+F7mIitonEhSBlX1QQf8gBCEIN/63iAiJ8OUOBC/lOHdctPKCIDhzHufMmcsYSZIk+EEZBSivy4V1eZ1DLuvoRBiGoQXVAsVxjMvlgkqlgna7jXK5zIaxQQRZr9fYbDao1WrifTQaCSinWKDn84ntdovVaoXX6yV0q9UqPM+Dbduo1+tKlhJEwrvdDsvlEgT8X2TdYrGA4zhoNBqZsEwQbfrhcMB8PgdZl1YUCtd1MR6P0Wq1pLBM0PF4FJD7/a60ZjabYTqdSmFSUBRF6Pf7uF6vSggNoJWdTid0u12USqWvOVJQGIYYDoe43W5fk0iI0vZ+KBjNZlPYbJpmauyloMfjISC04SRIYm/htD9WLVuZOpUA93sB4jrFT935fMZgMJAe1E8lakO+78OyrPSDLbucBEEgzoRO0ZxOp6MHotH7/R6TyYTFop5HXURWytRxYCqI6Byce10WjANhg2Q2ciFaoE+YDkQbRBMowtSpe70eKyTvQaw90lKUDC5AuV0srMtt3R88bhakXJJLzwAAAABJRU5ErkJggg==")
        no-repeat;
      position: absolute;
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 1rem;
      top: 0;
      height: 2rem;
      width: 100%;
    }
    .mark {
      color: dodgerblue;
      font-size: 1.3rem;
    }
    .parent-select{
      position: relative;
      // z-index: -11;
    }
    .enclose {
      box-shadow: 0 10px 10px #c5c5c5;
      // padding: 1rem 0 ;
      position: relative;
      top: 1.5rem;
      width: 100%;
      .up-arrow{
        position: absolute;
        top: -.5rem;
        left: 1rem;
        // background: #fff;
        z-index: 1;
        // border-top: 1rem solid red;
        // border-right: 1rem solid red;
        transform: rotate(45deg);
        background-color: #fff;
        width: 1rem;
        height: 1rem;
      }

    }
    .dropdown-container {
      display: block;
      background-color: #ffffff;
      // z-index: -11;
      // position: relative;
    }
    .dropdown-item {
      align-items: center;
      height: 2rem;
      gap: 1rem;
      padding-left: 1rem;
      position: relative;
      z-index: 10;
      cursor: pointer;
      :hover {
        background-color: #9a9a9a44;
      }
    }
  }
  .hide {
    display: none;
  }
  .invisible {
    visibility: hidden;
    opacity: 0;
  }
`;

const CalenderWrapper = styled.div`
  // display: inline-block;
  position: relative;
  // cursor: pointer;
display: flex;

  // .d-flex {
  //   padding-left: 1rem;
  //   gap: 1rem;
  // }
  // .inputBox {
  //   border: none;
  //   outline: none;
  //   cursor: pointer;
  // }
  // input.inputBox {
  //   width: 100px;
  //   border-radius: 3px;
  //   font-size: 1rem;
  //   padding: 0;
  //   margin: 0;
  // }

  // .calendarElement {
    // position: absolute;
  //   left: 85%;
  //   transform: translateX(-50%);
  //   top: 40px;
  //   border: 1px solid #ccc;
  //   z-index: 999;
  // }
  .calIcon{
    // padding-left: 1rem;
    // position: absoulute !important;
    position: absolute;
    top: .2rem;
    left: .9rem;
    // display: flex;
    // z-index: 99999999
  }
  .cal-cont{
    // position: absolute;
  }
  .custom-picker{
    // position: relative;
    border: none;
    outline: none;
      // background: red; 
      width: 100%;
      // padding-left: 2.5rem;
      // width: 70px;
      margin: 0;
      font-size: 1rem;
    padding: 0 ;
    padding-left: 2.5rem;
    background: rgba(255, 0, 0, 0);
  }
`;
