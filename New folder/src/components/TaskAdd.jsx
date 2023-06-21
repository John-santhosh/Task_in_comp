import styled from "styled-components";
import TaskEditor from "./TaskEditor";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useGlobalContext } from "../Context";
import AllTask from "./AllTask";
const TaskAdd = () => {
  const [taskOpen, setTaskOpen] = useState(false);
  const { allTask, task_loading } = useGlobalContext();

  return (
    <GridWrapper>
      <nav></nav>
      <div className="aside"></div>
      <Wrapper className="section-center">
        <div>
          <h2>Test</h2>
          <p className="">Sloovi.com</p>
          <em>Add description</em>
        </div>
        <div className="heading">
          <div className="addTask flex-center">
            <p className="flex-center">TASKS {allTask.length}</p>
            <button
              className="flex-center"
              onClick={() => setTaskOpen(!taskOpen)}
            >
              <IoMdAdd className="addIcon" />
            </button>
          </div>
          {taskOpen && <TaskEditor setTaskOpen={setTaskOpen} />}
        </div>
        {task_loading ? (
          <p className="custom-loader"></p>
        ) : (
          allTask.map((task) => {
            return <AllTask key={task.id} {...task} />;
          })
        )}
      </Wrapper>
    </GridWrapper>
  );
};

export default TaskAdd;
const Wrapper = styled.div`
  > div:first-child {
    margin-bottom: 1rem;
    p {
      color: dodgerblue;
    }
    em {
      color: grey;
      font-size: 0.8rem;
    }
  }
  .addIcon{
    font-size: 1.1rem;
    // font-weight: 600;
  }
  div.lastChild:last-child {
    border-radius: 0 0 3px 3px;
  }
  div.lastChild {
    border: 1px solid var(--clr-grey-50);
  }
  .addTask {
    background-color: #a9a9a918;
    /* border-bottom: 1px solid var(--clr-grey-50); */
    padding-left: 10px;
    height: 2.5rem;
    justify-content: space-between;

    button {
      border-left: 1px solid var(--clr-grey-50);
      padding: 0 10px;
      height: 100%;
    }
  }
  > div {
    width: 350px;
  }
  .heading {
    border-radius: 3px 3px 0 0;
    border: 1px solid var(--clr-grey-50);
  }
  .custom-loader {
    margin-left: 240px;
    margin-top: 3rem;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr 4fr;
  /* grid-template-rows: 1fr 5fr; */
  nav {
    grid-column: 2/3;
    /* margin-bottom: 1rem; */
  }
  .aside {
    grid-row: 1/3;
    grid-column: 1/2;
    background-color: var(--clr-dark);
  }
  .section-center {
    grid-template-rows: 2/3;
    min-height: calc(100vh - 4rem);
  }
`;
