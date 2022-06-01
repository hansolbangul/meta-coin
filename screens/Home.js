import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { coins } from "../api";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import { ActivityIndicator, FlatList, View } from "react-native";
import Coin from "../components/Coin";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const Text = styled.Text``;
const Loader = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { isLoading, data } = useQuery("coins", coins);
  const [cleanData, setCleanData] = useState([]);
  useEffect(() => {
    if (data) {
      setCleanData(
        data
          .filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
          .slice(0, 400)
      );
    }
  }, [data]);
  console.log(cleanData.length);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <FlatList
        data={cleanData}
        numColumns={3}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} symbol={item.symbol} id={item.id} />
        )}
      />
    </Container>
  );
};

export default Home;
