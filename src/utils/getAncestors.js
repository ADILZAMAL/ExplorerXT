const getAncestors = (nodes, nodeId) => {
  const ancestors = [];
  while (nodeId != null) {
    let node = nodes[nodeId];
    ancestors.push([node.id, node.label]);
    nodeId = node.parentId;
  }
  return ancestors;
};

export default getAncestors;
