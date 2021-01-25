import { format } from 'date-fns';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { axiosInstance } from '../utils/axiosInstance';
import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import { SyncLoader } from 'react-spinners';
import { CASContext } from '../contexts/CASProvider';
import LogoutIcon from '../assets/logout.svg';

const StyledCloseIcon = styled(CloseIcon)`
  color: #000000;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 40px;
  margin-left: 40px;
  cursor: pointer;
  @media only screen and (max-width: 670px) {
    width: 35px;
  }
  position:absolute;
  top:10px;
  right:10px;
`;

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #c7a424;
  border: none;
  font-weight: bold;
  cursor: pointer;
  height: 40px;
  margin:10px;
  &:hover {
    color: #ffffff;
    box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.24);
  }

  width: 150px;
`;
const AdministratorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
`;

const Wrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  margin:20px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:-50px;
`;

const Text = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 5rem;
  user-select: none;
  margin-bottom:60px;
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

const DownloadSection = styled.div`
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
  const { logout } = useContext(CASContext)!;
  const { enqueueSnackbar } = useSnackbar();
  const { closeSnackbar } = useSnackbar();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const date = yyyy + '-' + mm + '-' + dd;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startFirstDate, setStartFirstDate] = useState<Date | null>(null);
  const [endFirstDate, setEndFirstDate] = useState<Date | null>(null);
  const [startSecondDate, setStartSecondDate] = useState<Date | null>(null);
  const [endSecondDate, setEndSecondDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {

    const {data} = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/commisions/export/csv`,{responseType:"blob"});

    console.log("123",xd);

    const downloadUrl = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement('a');

    link.href = downloadUrl;

    link.setAttribute('download', 'file.csv');

    document.body.appendChild(link);

    link.click();

    link.remove();
      
  };

  const uploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
    const action = (key: any) => (
      <>
        <StyledCloseIcon
          onClick={() => {
            closeSnackbar(key);
          }}
        ></StyledCloseIcon>
      </>
    );
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile as Blob);
    if (startFirstDate !== null) {
      formData.append('firstTourBegin', format(startFirstDate, 'dd.MM.yyyy'));
    }
    if (endFirstDate !== null) {
      formData.append('firstTourEnd', format(endFirstDate, 'dd.MM.yyyy'));
    }
    if (startSecondDate !== null) {
      formData.append('secondTourBegin', format(startSecondDate, 'dd.MM.yyyy'));
    }
    if (endSecondDate !== null) {
      formData.append('secondTourEnd', format(endSecondDate, 'dd.MM.yyyy'));
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/configurator/config/`,
        formData,
        config,
      );
      enqueueSnackbar('Ustawienia zostały zapisane', {
        variant: 'success',
        action,
      });
    } catch (e) {
      enqueueSnackbar('Ustawienia nie zostały zapisane', {
        variant: 'error',
        action,
      });
      console.log(e);
    }
    setLoading(false);
  };

  const xd = true;

  return (
    <AdministratorWrapper>
                  <Icon alt="logout" src={LogoutIcon} onClick={logout}/>
      <Wrap>
        <LogoWrapper>
          <Logo alt="logo" src="https://plannaplan.pl/img/logo.svg" />
          <Text> plan na plan </Text>
        </LogoWrapper>
        {xd === true ? (
          <div>
          <Form onSubmit={uploadFile}>
            <div>
              <div>Start pierwszej tury:</div>{' '}
              <div>
                <input type="date" min={date} onChange={(e) => setStartFirstDate(e.target.valueAsDate)} />
              </div>
              <div>Koniec pierwszej tury:</div>{' '}
              <div>
                <input type="date" min={date} onChange={(e) => setEndFirstDate(e.target.valueAsDate)} />
              </div>
            </div>
            <div>
              <div>Start drugiej tury:</div>{' '}
              <div>
                <input type="date" min={date} onChange={(e) => setStartSecondDate(e.target.valueAsDate)} />
              </div>
            </div>
            <div>
              <div>Koniec drugiej tury:</div>{' '}
              <div>
                <input type="date" min={date} onChange={(e) => setEndSecondDate(e.target.valueAsDate)} />
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
              <SaveButton type="submit">{loading === false ? 'Zapisz' : <SyncLoader />} </SaveButton>
            </div>
          </Form>
                      <DownloadSection>
                      <SaveButton onClick={downloadFile}>Pobierz dane.csv</SaveButton>
                    </DownloadSection>
                    </div>
        ) : (<div></div>
        )}
      </Wrap>
    </AdministratorWrapper>
  );
};
