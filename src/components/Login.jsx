/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import {Button, Checkbox, Form, Icon, Input, message} from 'antd';

const FormItem = Form.Item;

import styles from '../stylesheets/Login.css'

class LoginForm extends React.Component {

    componentDidUpdate() {
        const {result} = this.props;
        result ? this.info(result) : '';
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLoginRequested(values);
                console.log('Received values of form: ', values);
            }
        });
    };

    info = (msg) => {
        message.info(msg);
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className={styles["login-form-forgot"]} href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
