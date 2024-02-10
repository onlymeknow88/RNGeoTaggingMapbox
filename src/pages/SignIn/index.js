import { Button, Gap, TextInput } from '../../component';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '../../component';
import React from 'react';
import {signInAction} from '../../redux/action/auth';
import { useDispatch } from 'react-redux';
import { useForm } from '../../utils';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onSubmit = () => {
    // console.log(form)
    dispatch(signInAction(form, navigation));
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Sign In"
          subTitle="Geo Tagging untuk Area Penamanan Adaro Minerals Indoensia"
        />
        <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
          <Gap height={24} />
          <Button text="Sign In" textColor="#fff" onPress={onSubmit} />
          <Gap height={12} />
          <Button
            text="Create New Account"
            color="#d4d4d8"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
