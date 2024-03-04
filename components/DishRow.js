import { View, Text, TouchableOpacity, Image } from "react-native";
import { urlFor } from "../sanity/client";

export default function DishRow({ id, name, description, price, image }) {
  return (
    <TouchableOpacity className="flex-row justify-between">
      <View>
        <Text className="text-lg mb-1">{name}</Text>
        <Text className="text-gray-400">{description}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: urlFor(image).url(),
          }}
          className="w-20 h-20"
        />
      </View>
    </TouchableOpacity>
  );
}
