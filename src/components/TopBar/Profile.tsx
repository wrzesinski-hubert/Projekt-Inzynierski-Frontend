import { Menu, MenuItem } from "@material-ui/core";
import React, { FC } from "react";


interface ProfileProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void

}

export const Profile : FC<ProfileProps> = ({anchorEl, handleClose, ...restProps}) => {

	return (
		<Menu
			className="top-bar__menu"
			id="simple-menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<MenuItem>Profile</MenuItem>
			<MenuItem>My account</MenuItem>
			<MenuItem>Logout</MenuItem>
		</Menu>
	);
};
