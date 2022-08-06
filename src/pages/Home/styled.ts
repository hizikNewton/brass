import styled from "styled-components";

export const FormContainer = styled.div`
  display: grid;
  margin: auto;
  width: fit-content;
  min-width: 350px;
  padding: 2em;
  background: linear-gradient(150deg, #f731db, #4600f1 100%);
  form {
    div {
      width: 100%;
      margin-bottom: 4px;
      label {
        display: block;
        padding-bottom: 4px;
      }
      input,
      select,
      textarea {
        padding: 1em;
        width: fill-available;
      }
    }
    div.btn-container {
      width: 100%;
      margin-top: 1em;
      text-align: center;
      button {
        padding: 8px;
        border-radius: 4px;
      }
    }
  }
`;

export const HomeHeaderTopPanel = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 50px;
  button {
    padding: 8px;
    background: #0bce5a;
    color: #fff;
    cursor: pointer;
    border: none;
  }

  @media (max-width: 1200px) {
    display: block;
  }

  .title {
    display: flex;
    align-items: center;
    margin-right: 24px;
    font-weight: 800;
    font-size: 20px;

    & > svg {
      margin-right: 8px;
    }

    @media (max-width: 1200px) {
      margin-bottom: 20px;
    }
    @media (max-width: 375px) {
      font-size: 16px;
      margin-bottom: 14px;
    }
  }

  .search {
    height: 38px;
    width: 600px;
    flex-grow: 2;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
`;

export const TransactionContainer = styled.div`
  display: flex;
  padding: 2em;
  column-gap: 50px;
  table {
    margin: 0 auto;
  }
  tbody {
    tr {
      background: #fff;
      :hover {
        background: #e9e7de;
      }
    }
    tr.selected {
      background: #9edab6;
    }
  }
  thead {
    color: #fff;
    tr {
      background: #181c27;
    }
  }
  th,
  td {
    padding: 8px;
    width: 15em;
    text-align: center;
  }
`;

export const Detail = styled.div`
  padding: 1em 2em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  div.detail_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    width: fit-content;
    height: fit-content;
  }
`;
