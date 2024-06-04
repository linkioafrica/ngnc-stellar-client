/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Grid,
  Card,
  createStyles,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlideInOutAnimation } from "../../../libs/PageAnimation";
import axios from "axios";
import { stellarFees, url } from "../../../api";
// import { ImSpinner2 } from "react-icons/im";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
    ":disabled": { backgroundColor: theme.colors.secondary[3], color: "white" },
    transition: "all 0.3s ease-in-out",
  },
}));

export const RampBuy_1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [charge, setCharge] = useState(0);
  const [fees, setFees] = useState(0);

  let wallet_address: any = "";

  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const transaction = searchParams.get("type");
  const asset_code = searchParams.get("asset_code");
  const transaction_id = searchParams.get("transaction_id");
  const token = searchParams.get("token");
  wallet_address = searchParams.get("wallet");

  // Use Effect
  useEffect(() => {
    const feeCharge = numCalc(amount);
    setCharge(feeCharge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    setLimit(Number(amount));
  }, [amount]);

  // Set Limit
  const setLimit = (amount: number) => {
    if (amount > 2000000) {
      setAmount("2000000");
    }
  };

  // calculating fee
  const numCalc = (numb: any) => {
    if (numb < 20000) {
      return 0;
    } else if (numb >= 20000 && numb < 100000) {
      return numb * (1.5 / 100);
    } else if (numb >= 100000 && numb < 2000000) {
      return numb * (0.8 / 100) + 1050;
    } else return 0;
  };

  const handleGetStellarFees = async () => {
    try {
      const { data } = await axios.get(`${stellarFees}`);
      setFees(data.fees);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    handleGetStellarFees();
  }, []);

  const handleNextSlide = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${url}/account/validate-wallet-address?address=${wallet_address}`
      );
      navigate(
        data.validWallet === null ? "/deposit_kyc" : "/stellar_deposit_2",
        {
          state: {
            type: transaction,
            asset_code: asset_code,
            transaction_id: transaction_id,
            token: token,
            wallet_address: wallet_address,
            fee: charge,
            network: "stellar",
            amount: amount,
            Hex: data.HexValue,
            fee_percent: charge,
            user_name: data.username,
          },
        }
      );
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <>
      <SlideInOutAnimation>
        <section>
          <Text size="xl" weight="semi-bold" align="center" mt={20}>
            Deposit
          </Text>
          <Space h={5} />
          <div>
            <Card
              p="sm"
              radius={8}
              mt={20}
              style={{ backgroundColor: "#F4F8FF" }}
            >
              <Grid justify="space-between" align="flex-start">
                <Grid.Col span={1}>
                  <IconInfoCircle size={35} stroke={1.5} color="#1565d8" />
                </Grid.Col>
                <Grid.Col span={10}>
                  <Card.Section>
                    <Text size="xs" color="#1565d8">
                      Before you confirm make sure the AMOUNT and WALLET ADDRESS
                      are correct. Any errors will result in loss of funds!
                    </Text>
                  </Card.Section>
                </Grid.Col>
              </Grid>
            </Card>
          </div>
          <Space h={20} />
          <TextInput
            label="Amount"
            size="md"
            value={amount}
            type="number"
            placeholder={`min: 20,000`}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(event.target.value);
            }}
          />
          <Space h={25} />
          <TextInput label="Network" size="md" value="Stellar" disabled />
          <Space h={25} />
          <TextInput
            label="Wallet address"
            size="md"
            disabled
            type="string"
            value={wallet_address}
          />

          <Space h={30} />
          <Button
            size="lg"
            fullWidth
            style={{ fontWeight: 500 }}
            radius="md"
            className={classes.button}
            onClick={handleNextSlide}
            loading={isLoading && true}
            disabled={
              wallet_address === "" ||
              amount === "" ||
              parseFloat(amount) < 20000
                ? true
                : false
            }
          >
            Continue{" "}
            {/* {isLoading && <ImSpinner2 className="text-white animate-spin " />} */}
          </Button>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
