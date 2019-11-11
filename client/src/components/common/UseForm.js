import { useState } from 'react';

const UseFormState = initialValues => {
  const [state, setState] = useState(initialValues);

  const onChangeHandler = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const reset = field => {
    if (field) {
      setState({ ...state, [field]: initialValues[field] });
    } else {
      setState({ ...initialValues });
    }
  };

  return [state, onChangeHandler, reset];
};

export default UseFormState;