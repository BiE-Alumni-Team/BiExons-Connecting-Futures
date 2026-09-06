import { useState } from 'react';

const useInputFields = (defaultValue) => {

    const [fieldValue, setFieldValue] = useState(defaultValue)

    const handleOnchange = (e) => {

        setFieldValue(e.target.value)

    }

    return [fieldValue, handleOnchange];
};

export default useInputFields;