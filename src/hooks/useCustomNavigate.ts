// navigateUtils.js
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
	const navigate = useNavigate();

	const goToRoute = (to: To, options?: NavigateOptions | undefined) => {
		navigate(to, options);
	};

	const goToReturn = () => {
		navigate(-1);
	};

	return {
		goToRoute,
		goToReturn,
	};
};
