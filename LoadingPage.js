import React, { Component } from 'react'
 import loaded from './loaded.gif'

export default class LoadingPage extends Component {
    render() {
        return (
            <div className= "text-center">
                
                 <img src={loaded} alt="loading" />

            </div>
        )
    }
}
