/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  createStyles,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
// import { DatePicker } from "@mantine/dates";
import { IconArrowNarrowLeft } from "@tabler/icons";
import axios from "axios";
import { url } from "../../api/";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SlideInOutAnimation } from "../../libs/PageAnimation";
import { useSellRampMutation } from "../../services/transactionApi";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
    ":disabled": { backgroundColor: theme.colors.secondary[3], color: "white" },
    transition: "all 0.3s ease-in-out",
  },
}));

export const SellKYC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [sellRamp] = useSellRampMutation();

  const [IDType, setIDType] = useState();
  const [idNumber, setIDNumber] = useState();
  // const [dateOfBirth, setDateOfBirth] = useState();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const wallet_address = location.state.wallet_address;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${url}/transaction/customer-kyc?idType=${IDType}&idNumber=${idNumber}&email=${email}&address=${wallet_address}`
      );
      if (data.status === "success") {
        toast.success(data.message);
        await sellRamp({
          transaction: location.state.type,
          transaction_id: location.state.transaction_id,
          asset_code: location.state.asset_code,
          reference: location.state.refCode,
          amount: location.state.amountInNgn,
          fee: location.state.fee,
          wallet_address,
          account_name: location.state.account_name,
          account_number: location.state.account_number,
          bank_name: location.state.bank_name,
        }).unwrap();
        navigate("/stellar_withdraw_success", {
          state: {
            ...location.state,
          },
        });
      } else {
        toast.error(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SlideInOutAnimation>
        <section style={{ marginTop: -40 }}>
          <IconArrowNarrowLeft
            size={30}
            color="#1565d8"
            cursor="pointer"
            onClick={() => navigate("/stellar_withdraw_1")}
          />

          <Text size="xl" weight="bold" align="center" mt={10} color="#1565d8">
            Identification Details
          </Text>
          <Space h={10} />
          <Text size="md" align="center" color="#000">
            Complete your KYC to continue
          </Text>
          <Space h={20} />
          <form onSubmit={handleSubmit}>
            <Select
              label="ID type"
              value={IDType}
              data={[
                "BVN",
                "Passport",
                "NIN",
                "Driving License",
                "Voters Card ",
                "National ID",
              ]}
              searchable
              size="md"
              transition="pop-top-left"
              transitionTimingFunction="ease"
              transitionDuration={80}
              maxDropdownHeight={200}
              nothingFound="Empty list"
              filter={(value: string, item: any) =>
                item.label?.toLowerCase().includes(value.toLowerCase().trim())
              }
              onChange={(value: any) => setIDType(value)}
            />
            <Space h={30} />
            <TextInput
              label="ID number"
              size="md"
              type="number"
              value={idNumber}
              onChange={(event: any) => setIDNumber(event.target.value)}
            />
            <Space h={20} />
            <TextInput
              label="Email"
              size="md"
              type="text"
              value={email}
              onChange={(event: any) => setEmail(event.target.value)}
            />
            {/* <Space h={30} />
            <DatePicker
              placeholder="Pick date"
              label="Date of birth"
              value={dateOfBirth}
              onChange={(value: any) => setDateOfBirth(value)}
            /> */}

            <Space h={35} />
            <Button
              size="lg"
              fullWidth
              mb="md"
              mt={20}
              style={{ fontWeight: 500 }}
              radius="md"
              className={classes.button}
              loading={isLoading}
              type="submit"
              disabled={
                IDType === "" || idNumber === "" || email === "" ? true : false
              }
            >
              Continue
            </Button>
          </form>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
