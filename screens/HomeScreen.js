import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity/client";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fetauredCategory, setFeaturedCategory] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=="featured"] {
      ...,
      restaurants[] -> {
        ...,
        dishes[] ->,
      }
    }
    `
      )
      .then((data) => setFeaturedCategory(data));
  }, []);


  return (
    <View
      // Later check that why StatusBar.currentHeight is not working properly
      className={`${Platform.OS === "android" ? "pt-9" : 0} bg-white`}
    >
      <View className="flex-row items-center space-x-2 pb-3 px-4">
        <View>
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 rounded-full"
          />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 px-4">
        <View className="flex-row space-x-2 bg-gray-200 py-2 px-3 flex-1 items-center">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="restaurant and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color="#00CCBB" />
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <Categories />
        {fetauredCategory?.map((category) => (
          <FeaturedRow
            title={category.name}
            description={category.short_description}
            id={category._id}
            key={category._id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
