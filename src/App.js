import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import data from './demo'
import objects from './obj';

console.log(objects)

function App() {
  const refreshDragedNodePosition = (e) => {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  }
  useEffect(() => {
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      layout: {
        type: 'force',
        nodeSize: 10,
        nodeStrength: 20,
        edgeStrength: 0.1,
        // nodeSpacing: (val) => {
        //   console.log(val)
        //   return val.size / 2;
        // },
        preventOverlap: true,
      },
      defaultNode: {
        size: 15,
        color: '#5B8FF9',
        style: {
          lineWidth: 2,
          fill: '#C6E5FF',
        },
      },
      defaultEdge: {
        size: 1,
        color: '#e2e2e2',
      },
    });
    graph.data({
      nodes: data.nodes,
      edges: data.edges.map(function(edge, i) {
        edge.id = `${edge.source}->${edge.target}`;
        return Object.assign({}, edge);
      }),
    });

    graph.render();

    const forceLayout = graph.get('layoutController').layoutMethod;
    graph.on('node:dragstart', function(e) {
      graph.layout()
      refreshDragedNodePosition(e);
    });
    graph.on('node:drag', function(e) {
      forceLayout.execute();
      refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', function(e) {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    });
    return () => graph.destroy();
  })
  return (
    <div className="App">
      <div id="container" />
    </div>
  );
}

export default App;
