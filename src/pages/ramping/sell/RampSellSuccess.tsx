import { useState } from "react";
import { Button, Text, createStyles, Space } from "@mantine/core";
import { SuccessImage } from "../../../libs/Images";
import { FadeInOutAnimation } from "../../../libs/PageAnimation";
import { useLocation } from "react-router-dom";
import { url2 } from "../../../api";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
  },
}));

export const RampSellSuccess = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const {
    transaction_id,
    asset_code,
    token,
    type,
    fee,
    Hex,
    amount,
    refCode,
    bank_name,
    account_number,
  } = location.state;

  let config = {
    withCredentials: true,
    origin: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      transaction_id: transaction_id,
      asset_code: asset_code,
      amount,
      amount_fee: fee,
      memo_type: "text",
      hashed: Hex,
      callback: "postmessage",
      externalId: refCode,
      account: `${account_number} ${bank_name}`,
    },
  };

  const validateRequest = async () => {
    setIsLoading(true);
    try {
      let data = await axios.get(
        `${url2}/transactions/${type}/interactive/complete`,
        config
      );
      if (data.status === 200) {
        window.location.replace(
          `${url2}/transaction/more_info?id=${transaction_id}`
        );
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FadeInOutAnimation>
        <section>
          <div style={{ width: 300, margin: "0 auto" }}>
            <SuccessImage />
          </div>
          <Space h={40} />
          <Text
            style={{ fontSize: "1.5rem" }}
            weight={700}
            align="center"
            transform="capitalize"
          >
            Request Received
          </Text>
          <Space h={10} />
          <Text
            style={{ fontSize: "0.9rem", maxWidth: "80%", margin: "0 auto" }}
            weight={500}
            align="center"
            transform="capitalize"
          >
            NGN will be sent to the bank account provided.
          </Text>
          <Space h={40} />
          <Button
            size="lg"
            fullWidth
            mb="md"
            mt={20}
            style={{ fontWeight: 500 }}
            radius="md"
            className={classes.button}
            loading={isLoading && true}
            onClick={validateRequest}
          >
            Initiate Withdrawal
          </Button>
        </section>
      </FadeInOutAnimation>
    </>
  );
};
