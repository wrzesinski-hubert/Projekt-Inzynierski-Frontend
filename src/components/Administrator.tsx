import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { axiosInstance } from '../utils/axiosInstance';

const AdministratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin:0 auto;
  height:100vh;
`;

const Wrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 5rem;
  user-select: none;
`;

const Logo = styled.img`
  width: 400px;
  height: 400px;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 210px;
  }
`;

export const Administrator = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const date = yyyy + '-' + mm + '-' + dd;

  const [selectedFile, setSelectedFile] = useState<File|null>(null);

  const destination = `${process.env.REACT_APP_API_URL}/api/v1/configurator/config`;

  useEffect(() => {
  }, [selectedFile]);

  const uploadFile = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file",selectedFile as Blob);

    const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/v1/configurator/config`, formData)

    console.log(response);
  }
  

  return (
    <AdministratorWrapper>
      <Wrap>
      <LogoWrapper>
        <Logo alt="logo" src="https://plannaplan.pl/img/logo.svg" />
        <Text> plan na plan </Text>
      </LogoWrapper>
      <Form
        onSubmit={uploadFile}
      >
        <div>
          <div>Start:</div>{' '}
          <div>
            <input type="date" min={date} />
          </div>
        </div>
        <div>
          <div>Koniec:</div>{' '}
          <div>
            <input type="date" min={date} />
          </div>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setSelectedFile(file);
              }
            }}
          />
        </div>
        <div>
          <input type="submit"/>
        </div>
      </Form>
      </Wrap>
    </AdministratorWrapper>
  );
};
