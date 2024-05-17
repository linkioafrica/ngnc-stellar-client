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
import { useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { SlideInOutAnimation } from "../../libs/PageAnimation";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
    ":disabled": { backgroundColor: theme.colors.secondary[3], color: "white" },
    transition: "all 0.3s ease-in-out",
  },
}));

export const BuyKYC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [idCheck, setIdCheck] = useState("");
  const [IDType, setIDType] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const wallet_address = location.state.wallet_address;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setIdCheck("");

    try {
      const { data } = await axios.get(
        `${url}/stellar/customer-kyc?idType=${IDType}&idNumber=${idNumber}&email=${email}&address=${wallet_address}`
      );
      console.log(data.status);
      if (data.status === "success") {
        navigate("/stellar_deposit_2", {
          state: {
            ...location.state,
          },
        });
      } else {
        setIdCheck(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const params = {
    type: location.state.type,
    asset_code: location.state.asset_code,
    token: location.state.token,
    wallet: location.state.wallet_address,
  };

  return (
    <>
      <SlideInOutAnimation>
        <section style={{ marginTop: -40 }}>
          <IconArrowNarrowLeft
            size={30}
            color="#1565d8"
            cursor="pointer"
            onClick={() =>
              navigate({
                pathname: "/stellar_deposit_1",
                search: `?${createSearchParams(params)}`,
              })
            }
          />

          <Text size="xl" weight="bold" align="center" mt={10} color="#1565d8">
            Identification Details
          </Text>
          <Space h={10} />
          <Text size="lg" align="center" color="#000">
            Complete your KYC to continue
          </Text>
          <Space h={20} />
          <form onSubmit={handleSubmit}>
            <Select
              label="ID type"
              value={IDType}
              data={["BVN", "NIN", "Voters Card", "Driving License"]}
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
            <Space h={20} />
            <TextInput
              disabled={IDType ? false : true}
              label="ID number"
              size="md"
              type="text"
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
            <p
              className="text-gray-600"
              style={{
                color: "red",
                marginTop: "5px",
                fontWeight: "lighter",
                fontSize: "14px",
              }}
            >
              {idCheck}
            </p>

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
              Verify
            </Button>
          </form>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
