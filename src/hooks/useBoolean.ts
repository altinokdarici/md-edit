import React from 'react';

export const useBoolean = (defaultValue: boolean | (() => boolean)): [boolean, () => void, () => void] => {
	const [value, setValue] = React.useState<boolean>(defaultValue);

	const setTrue = () => setValue(true);

	const setFalse = () => setValue(false);

	return [value, setTrue, setFalse];
};
