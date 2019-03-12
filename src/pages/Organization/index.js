import React,{Component} from "react";
import PropTypes from "prop-types";
import api from '../../services/api'
import { View, Text, AsyncStorage,FlatList, ActivityIndicator } from "react-native";
import styles from './styles'
import Icon from "react-native-vector-icons/FontAwesome";
import OrganizationItem from './OrganizationItem'
import Header from "../../components/Header";



const TabIcon = ({ tintColor }) => (
  <Icon name="building" size={20} color={tintColor} />
);

export default class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    data: [],
    loading: true,
    refreshing: false
  };

  async componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem("@Githuber:username");
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({
      data,
      loading: false,
      refreshing: false
    });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

export default Organizations;
