import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { OnboardingData } from "../../data/data";
import { SharedValue } from "react-native-reanimated";
import Dot from './Dot'

const Pagination = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
        {data.map((_, index) => {
            return <Dot index={index} x={x} key={index} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
    paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },});

export default Pagination;
