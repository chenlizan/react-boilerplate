/**
 * Created by chenlizan on 2017/6/18.
 */

import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div>
                <div>外壳</div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
