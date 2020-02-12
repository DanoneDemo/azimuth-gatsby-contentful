import React from 'react';
import _ from 'lodash';

import Action from './Action';

export default class Social extends React.Component {
    render() {
        return (
            <ul className="social-links">
                {_.map(_.get(this.props, 'socialLinks'), (action, action_idx) => (
                    <li key={action_idx}>
                        <Action action={action}/>
                    </li>
                ))}
            </ul>
        );
    }
}
