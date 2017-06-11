// import React, { Component } from 'react';
// import IconLogo from '../components/IconLogo';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <IconLogo FillColor="orange"/>
//           <h2>This will be team-player</h2>
//         </div>
//         <p>
//           However, for now it is not a lot.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;


import React from 'react'
import FiltersContainer from './FiltersContainer'
import Header from '../components/Header';

const App = () => (
  <div>
    <Header />
    <FiltersContainer />
  </div>
)

export default App