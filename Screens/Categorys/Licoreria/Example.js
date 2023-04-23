import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Example() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCategoryIndex(index);
          flatListRef.current.scrollToIndex({ index });
        }}
        activeOpacity={0.8}
        style={{ marginTop: 18 }}
      >
        <Text
          style={[
            styles.categoryText,
            index > 0 && { marginLeft: 30 },
            categoryIndex == index && styles.selectedCategoryText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]}
        renderItem={renderCategories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.x)
        }
      />
      <View style={styles.scrollIndicator}>
        <View
          style={[
            styles.scrollIndicatorProgress,
            { width: scrollPosition / 5 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    lineHeight: 22,
    color: "#525C67",
  },
  selectedCategoryText: {
    color: "red",
  },
  scrollIndicator: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
  },
  scrollIndicatorProgress: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
