import React from "react";
import EnclosingWrapper from "../../hoc/EnclosingWrapper";

import classes from './Layout.module.css'

const layout = (props) => (
  <EnclosingWrapper>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </EnclosingWrapper>
);

export default layout;
