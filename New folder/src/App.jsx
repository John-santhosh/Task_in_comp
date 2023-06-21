import styled from "styled-components";
import TaskAdd from "./components/TaskAdd";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="bottom-center"></ToastContainer>
      <Wrapper>
        <TaskAdd />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: var(--clr-bg-primary-1);
  min-height: calc(100vh - 4rem);
`;
