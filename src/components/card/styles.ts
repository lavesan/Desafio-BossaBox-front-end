import styled from 'styled-components';

export const StyledModalBody = styled.div`
padding: 20px;
display: flex;
flex-flow: column nowrap;
.button-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    button:not(:last-child) {
        margin-right: 10px;
    }
}
`


export const StyledCard = styled.section`
    display: flex;
    flex-flow: column nowrap;
    margin-top: 20px;
    border-radius: 2px;
    box-shadow: 3px 3px 8px #EBEAED;
    border: thin solid #EBEAED;
    padding: 20px;
    .header-box {
        display: flex;
        flex-flow: row nowrap;
        h3 {
            font-size: 1.5rem;
            display: inline-block;
            margin: 0;
        }
        div {
            display: flex;
            justify-content: flex-end;
            flex: 1;
        }
    }
`