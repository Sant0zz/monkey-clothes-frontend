import { Tabs } from "expo-router";

export default function layout() {
    return(
        <Tabs>
            <Tabs.Screen name="(home)" options={{title:"HOME"}}/>
            <Tabs.Screen name="perfil" options={{title:"PERFIL"}}/>
        </Tabs>
    )
}