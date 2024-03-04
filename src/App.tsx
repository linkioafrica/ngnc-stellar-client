import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Fonts } from "./libs/Fonts";
import { Frame } from "./pages/Frame";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Sora",
        colors: {
          primary: ["#1565d8", "#2c74dc", "#4484e0", "#5b93e4", "#73a3e8"],
          secondary: [
            "#30AE4D",
            "#45b65f",
            "#5ac069",
            "#6ecb7b",
            "#82d58d",
            "#2b9d45",
          ],
          tethiary: ["#DBE7FF"],
        },
        colorScheme: "light",
      }}
      withNormalizeCSS
    >
      <Fonts />
      <Frame />
    </MantineProvider>
  );
}

export default App;
