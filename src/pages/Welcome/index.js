import React, { Component } from "react";
import Proptypes from "prop-types";
import api from "../../services/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import styles from "./styles";
class Welcome extends Component {
  static propTypes = {
    navigation: Proptypes.shape({
      navigate: Proptypes.func
    }).isRequired
  };
  state = {
    username: "",
    loading: false,
    error: false
  };

  chekUserExists = async username => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async username => {
    await AsyncStorage.setItem("@Githuber:username", username);
  };

  singnIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({
      loading: true
    });

    try {
      await this.chekUserExists(username);
      await this.saveUser(username);

      navigation.navigate("User");
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe o usuário do Github
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente</Text>}

        <View style={styles.form} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu Usuário"
          underlineColorAndroid="transparent"
          value={username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.singnIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Prosseguir</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Welcome;
