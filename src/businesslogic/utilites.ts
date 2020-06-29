export const redirectToCASLogoutService = () => {
	window.location.replace(`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`);
};

export const redirectToCASLoginService = () => {
	window.location.replace(`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`);
};
