import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import MobxReactForm from 'mobx-react-form';
import validator from 'validator';
const plugins = { vjf: validator };
//import validator from 'validatorjs';
//const plugins = { dvr: validator };
import { isEmail, isPhone, isPassword } from '../../common/validatorHelper'
import SignORLoginTextInput from '../../widget/SignORLoginTextInput'
import SignORLoginButton from '../../widget/SignORLoginButton'

const fields = [{
    name: 'phone',
    label: '手机',
    placeholder: '请输入手机号',
    validators: [isPhone],
}, {
    name: 'password',
    label: '密码',
    placeholder: '请输入密码',
    validators: [isPassword],
}, {
    name: 'verificationCode',
    label: '验证码',
    placeholder: '请输入验证码',
    // =t4
}];

/*const hooks = {
    onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
}*/

export default observer(({form}) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <SignORLoginTextInput Icon={require('../../img/signAndLogin/user.png')} field={form.$('phone')}  value={form.$('phone').value} />
            <SignORLoginTextInput Icon={require('../../img/signAndLogin/password.png')} field={form.$('password')} value={form.$('password').value} />
            <SignORLoginTextInput Icon={require('../../img/signAndLogin/verificationCode.png')} field={form.$('verificationCode')}value={form.$('verificationCode').value} />
            <SignORLoginButton text={'注册'} onPress={form.onSubmit} />
        </View>
    )
})

export const form = new MobxReactForm({ fields }, { plugins });