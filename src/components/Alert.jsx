import React, { useEffect } from 'react';

function Alert(props) {
	const { displayName = '', handleCloseAlert = Function.prototype } = props;

	useEffect(() => {
		const timerId = setTimeout(handleCloseAlert, 3000);

		return () => {
			clearTimeout(timerId);
		};
	}, [displayName]);

	return (
		<div id='toast-container'>
			<div className='toast'>{displayName} добавлен в корзину</div>
		</div>
	);
}

export { Alert };
