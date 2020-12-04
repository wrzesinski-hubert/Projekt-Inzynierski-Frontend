import { Menu, MenuItem } from '@material-ui/core';
import React, { useContext } from 'react';
import { CASContext } from '../contexts/CASProvider';

interface ProfileProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

export const Profile = ({ anchorEl, handleClose }: ProfileProps) => {
  const { logout } = useContext(CASContext)!;

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      {/* <MenuItem>Profil</MenuItem> */}
      <MenuItem onClick={logout}>Wyloguj</MenuItem>
    </Menu>
  );
};
