import { Group, Text } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import { PageRoutes } from "../utils/PageRoutes";

export const Frame = () => {
  return (
    <div className="frame">
      <Router>
        <PageRoutes />
      </Router>

      <Group position="center" mt={40} mb={40}>
        <Text>Powered by LINK</Text>
      </Group>
    </div>
  );
};
