import React, { Component } from 'react';
import Modal from 'react-modal'
import Canvas from './Canvas'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: 0
    }
};

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo" style={{marginLeft: 15}}><i className="material-icons">note</i>Task Board</a>
                        <ul className="right hide-on-med-and-down">
                            <li><button data-target="modal1" style={{color: 'white', background: 'none', border: 'none'}} className="modal-trigger"><i className="material-icons">note_add</i></button></li>
                        </ul>
                    </div>
                </nav>
                <Canvas />
            </div>
        );
    }
}
