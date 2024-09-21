import styled from "styled-components";


export const FormContainer = styled.form`
display: flex;
align-item: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px
`;

export const InputArea = styled.div`
display: flex;
flex-direction: column;
`;

export const Label = styled.label`
`;

export const Input = styled.input`
width: 120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`;

export const Button = styled.button`
padding: 10px;
cursor: pointer;
border-radius: 5px;
border: none;
background-color: #2c73d2;
color: white;
height: 42px;
`;

export const Table = styled.table`
width: 100%;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-widht: 800px;
margin: 20px auto;
word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
text-align: start;
border-bottom: inset;
padding-bottom: 5px;


@media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
}
`;

export const Td = styled.td`
    text-align: ${(props) => (props.alignCente ? "center" : "start")};
    padding-bottom: 15px;
    width: ${(props) => (props.width ? props.width : "auto")};
    
    
    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
        `;

export const Tbody = styled.tbody``;

export const Div = styled.div`

`;