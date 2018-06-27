import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import MobxReactForm from 'mobx-react-form';
import validator from 'validator';

import ModifyInfoItem from './ModifyInfoItem';

const plugins = { vjf: validator };
const fields = [{
    name: 'username',
    label: '用户名',
}, {
    name: 'password',
    label: '旧密码',
}, {
    name: 'newPassword',
    label: '新密码',
}];

export default observer(({form}) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <ModifyInfoItem field={form.$('username')} />
            <ModifyInfoItem field={form.$('password')} />
            <ModifyInfoItem field={form.$('newPassword')} />
            <TouchableOpacity style={styles.modify} onPress={form.onSubmit}>
                <Text style={styles.modifyText}>确认修改</Text>
            </TouchableOpacity>
        </View>
    )
})

export const form = new MobxReactForm({ fields }, { plugins });