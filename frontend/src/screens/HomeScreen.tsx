import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Home" navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;



