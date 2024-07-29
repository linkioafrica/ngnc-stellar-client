/* eslint-disable no-unused-vars */
import { Button } from "@mantine/core";

export const BusinessKyb = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          NOTICE
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.3rem",
            color: "#57595e",
          }}
        >
          LINK Business has been moved to a new URL. Please click the button
        </p>
        <Button
          size="md"
          color="green"
          component="a"
          href="https://www.linkio.world/ngnc"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            margin: "0 auto",
            fontWeight: "500",
          }}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
