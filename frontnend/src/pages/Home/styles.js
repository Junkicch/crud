import styled from "styled-components";

export const Container = styled.div``;

export const Login = styled.button`
padding: 10px;
    cursor: pointer;
    margin-left: 70%;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

export const Strong = styled.strong`
margin-left: 70%;

`;

export const Title = styled.h2``;

export const Table = styled.table`
  width: 165px;
  height: 22%;
  position: absolute;
  top: 1rem;
  right: 38%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;

  @media (max-width: 500px) {
    width: 165px;
    right: 1rem;
  }
`;


export const Tr = styled.tr`
font-size: 20px;
position: center;
text-align: start;
border-bottom: inset;
padding-bottom: 5px;
cursor: pointer;
`;

export const Td = styled.td`
    text-align: ${(props) => (props.alignCente ? "center" : "start")};
    padding-bottom: 15px;
    width: ${(props) => (props.width ? props.width : "auto")};
    `;