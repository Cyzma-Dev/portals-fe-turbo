import { List } from 'lucide-react';
import React from 'react';

const MyList = ({ items }) => (
    <List
        height={500}
        itemCount={items.length}
        itemSize={35}
        width={300}
    >
        {({ index, style }) => (
            <div style={style}>
                {items[index]}
            </div>
        )}
    </List>
);

export default MyList;
