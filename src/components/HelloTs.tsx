/**
 * Created by chenlizan on 2018/8/4.
 */

import React from "react";
import styles from "../stylesheets/HelloTs.module.less";

export interface HelloProps {
  compiler: string;
  framework: string;
}

export default class HelloTs extends React.Component<HelloProps, {}> {
  render() {
    return (
      <p className={styles["hello-ts-p"]}>
        Hello from {this.props.compiler} and {this.props.framework}!
      </p>
    );
  }
}
