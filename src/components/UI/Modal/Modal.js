import React from 'react';
import classes from './Modal.module.css';
import EnclosingWrapper from '../../../hoc/EnclosingWrapper';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <EnclosingWrapper>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </EnclosingWrapper>
);

export default modal;
