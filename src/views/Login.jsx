/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Form, Icon, Input, message} from 'antd';
import HelloTs from '../components/HelloTs';
import styles from '../stylesheets/Login.css'

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    getChildContext() {
    }

    componentDidUpdate() {
        const {result} = this.props;
        void (result ? this.info(result) : '');
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
            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
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
                    <a className={styles.login_form_forgot} href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
                <HelloTs compiler="TypeScript" framework="React"/>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    account: PropTypes.object,
    result: PropTypes.string
};

LoginForm.contextTypes = {};

LoginForm.childContextTypes = {};

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
