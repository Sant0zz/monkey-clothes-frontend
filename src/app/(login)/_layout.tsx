import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";

export default function layout() {
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="cadastro" options={{headerShown:false}}/>
        </Stack>
    );
}