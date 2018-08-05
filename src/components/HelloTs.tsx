/**
 * Created by chenlizan on 2018/8/4.
 */

import * as React from 'react';
import * as styles from '../stylesheets/HelloTs.less';

export interface HelloProps {
    compiler: string;
    framework: string;
}

export default class HelloTs extends React.Component<HelloProps, {}> {
    render() {
        return <p className={styles.hello_ts_p}>Hello from {this.props.compiler} and {this.props.framework}!</p>;
    }
}
