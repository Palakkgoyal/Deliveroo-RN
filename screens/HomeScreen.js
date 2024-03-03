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
  const [fetauredCategory, setFeaturedCategory] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type=="featured"] {
      ...,
      restaurants[] -> {
        ...,
        dishes[] ->,
      }
    }
    `).then(data => setFeaturedCategory(data))
  }, [])

  console.log(fetauredCategory)

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

      <ScrollView className="bg-gray-100" contentContainerStyle={{paddingBottom: 130}}>
        <Categories />

        {/* Featured */}
        <FeaturedRow
          title="Featured"
          description="Paid placements from our partners"
          id="123"
        />

        {/* Tasty Discounts */}
        <FeaturedRow
          title="Tasty Discounts"
          description="Everyone's been enjoying these juicy discounts!"
          id="1234"
        />

        {/* Offers near you */}
        <FeaturedRow
          title="Offers near you"
          description="Why not support your local restaurant tonight!"
          id="1235"
        />
      </ScrollView>
    </View>
  );
}
