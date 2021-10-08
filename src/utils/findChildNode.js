const findChildNode = (nodes, parentId) => {
  if (parentId === null) return [];
  const childs = [];

  Object.values(nodes).forEach((node) => {
    if (node.parentId == parentId) childs.push(node);
  });
  return childs;
};

export default findChildNode;
