import React from 'react';
//import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

export default class CytoScape extends React.Component
{
  render(){
    const elements = [
      { data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
      { data: { id: 'b' } },
      { data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
      { data: { id: 'd' }, position: { x: 215, y: 175 } },
      { data: { id: 'e' } },
      { data: { id: 'f', parent: 'e' }, position: { x: 300, y: 175 } },
       
       { data: { id: 'ad', source: 'a', target: 'd'} },
       { data: { id: 'eb', source: 'e', target: 'b' } }
    ];

    return <CytoscapeComponent elements={elements} style={ { width: '100%', height: '100%' } } />;
  }
}