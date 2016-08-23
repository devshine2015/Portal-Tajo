import React from 'react';
import pure from 'recompose/pure';

const PowerListContent = ({
  contentItem,
  dataList,
}) => {
  const items = dataList.map(item => {
    const ListItem = () => contentItem;

    console.log(contentItem.props);

    return (
      <li key={item.id}>
        <ListItem />
      </li>
    );
  });

  return (
    <ul>
      {items}
    </ul>
  );
};

PowerListContent.propTypes = {
  contentItem: React.PropTypes.element.isRequired,
  dataList: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]).isRequired,
};

export default pure(PowerListContent);
