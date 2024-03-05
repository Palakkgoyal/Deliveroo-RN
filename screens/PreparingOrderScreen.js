import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])
  return (
    <View className="pt-9 bg-[#00CCBB] flex-1 items-center justify-center">
        <Animatable.Image 
            source={require("../assets/loading.gif")}
            animation="slideInUp"
            className="w-96 h-96"
            iterationCount={1}
        />
        <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
        >
            Waiting for restaurant to accept your order
        </Animatable.Text>

        <Progress.Circle size={60}  indeterminate={true} color="white"/>
    </View>
  );
};

export default PreparingOrderScreen;
