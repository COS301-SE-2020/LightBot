import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
  return (
    <div>
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="primary" />
    </div>
  );
}

export default Loading;