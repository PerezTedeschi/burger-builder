import React, { Component } from 'react';
import EnclosingWrapper from '../../hoc/EnclosingWrapper'
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <EnclosingWrapper>
                <Burger/>
                <div>Build Controls</div>
            </EnclosingWrapper>            
        );
    }
}

export default BurgerBuilder;