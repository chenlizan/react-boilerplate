import * as React from 'react';
import * as styles from '../stylesheets/HelloTs.css';

export interface HelloProps {
    compiler: string;
    framework: string;
}

export default class HelloTs extends React.Component<HelloProps, {}> {
    render() {
        return <p className={styles["hello"]}>Hello from {this.props.compiler} and {this.props.framework}!</p>;
    }
}
