export default {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      size: 5 * 9,
    },
    {
      id: 'node2',
      label: 'node2',
      size: 5 * 9,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: "ghj",
      labelCfg: {
        autoRotate: true,
      }
    },
  ],
}