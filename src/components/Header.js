import React, { Component } from 'react'
import IconLogo from '../components/IconLogo'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="App-header">
          <IconLogo FillColor="lime"/>
          <h2>This will be team-player</h2>
          <p>However, for now it is not a lot.</p>
        </div>
      </div>
    );
  }
}