/* eslint-disable no-unused-vars */
import { Button } from "@mantine/core";

export const RampBuyHold = () => {
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
            fontSize: "1.2rem",
            color: "#57595e",
          }}
        >
          NGNC Deposit transactions are currently on hold.
          <br />
          maintenance ongoing.
          <br /> Will be back Shortly. Thanks
        </p>
        <Button
          size="md"
          color="green"
          component="a"
          href="https://business.linkio.africa"
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
