/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  createStyles,
  Group,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../../../api/";
import { cleanup } from "../../../features/rampingSlice";
import { bankList } from "../../../libs/bankList";
import { SlideInOutAnimation } from "../../../libs/PageAnimation";
import { useSellRampMutation } from "../../../services/transactionApi";
import axios from "axios";
import toast from "react-hot-toast";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
    ":disabled": { backgroundColor: theme.colors.secondary[3], color: "white" },
    transition: "all 0.3s ease-in-out",
  },
}));

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  value: string;
  image: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, image, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} size="sm" variant="filled" radius="xl" />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

export const RampSell_1 = () => {
  const [amount, setAmount] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState<string | any>();
  const [fee, setFee] = useState(0);
  const [amountInNgn, setAmountInNgn] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [accNameCheck, setAccNameCheck] = useState("");

  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const transaction = searchParams.get("type");
  const asset_code = searchParams.get("asset_code");
  const transaction_id = searchParams.get("transaction_id");
  const token = searchParams.get("token");
  const wallet_address = searchParams.get("wallet");

  // eslint-disable-next-line array-callback-return
  const filterBankCode = bankList.filter((bank: any) => {
    if (bankCode === bank.value) {
      return bank;
    }
  });

  let refCode = Math.floor(Math.random() * 99999999999).toString();

  const checkIDNumber = () => {
    if (accountNumber.length >= 1 && accountNumber.length !== 10) {
      setAccNameCheck("🚫 provide 10 digits of account number");
      setAccountName("");
    } else {
      setAccNameCheck("");
    }
    if (accountNumber.length >= 10) {
      setAccountNumber(accountNumber.slice(0, 10));
      setAccNameCheck("Fetching account name...");
      handleCheckAccountNumber();
    }
  };

  const handleCheckAccountNumber = async () => {
    const loading = toast.loading("Fetching account name...");

    try {
      const { data } = await axios.get(
        `${url}/account/verify-account-number?num=${accountNumber}&bankCode=${filterBankCode[0]?.value}`
      );
      // console.log(data);
      if (data.status === "success") {
        setAccountName(data.customer_name);
        setAccNameCheck("");
      } else {
        toast.error("Account name invalid", { id: loading });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to get account name", { id: loading });
    }
  };

  const calculateFee = (amount: string) => {
    const amountInNgn = Number(amount);
    if (amountInNgn >= 10000 && amountInNgn <= 5000000) {
      setFee(760);
      setAmountInNgn(amountInNgn - 760);
    }
  };

  const setLimit = (amount: number) => {
    if (amount > 5000000) {
      setAmount("5000000");
    }
  };

  useEffect(() => {
    checkIDNumber();
    setLimit(Number(amount));
  }, [accountNumber, amount]);

  useEffect(() => {
    calculateFee(amount);
  }, [amount]);

  const [sellRamp] = useSellRampMutation();

  const handleNext = async () => {
    setIsLoading(true);
    console.log(amount);
    try {
      const { data } = await axios.get(
        `${url}/account/validate-wallet-address?address=${wallet_address}`
      );
      if (data.validWallet === null) {
        navigate("/withdraw_kyc", {
          state: {
            transaction_id,
            asset_code,
            token,
            type: transaction,
            fee,
            Hex: data.HexValue,
            wallet_address,
            amount: amount,
            refCode: refCode,
            account_name: accountName,
            account_number: accountNumber,
            bank_name: filterBankCode[0]?.label,
          },
        });
      } else {
        await sellRamp({
          transaction,
          transaction_id,
          asset_code,
          reference: refCode,
          amount: amountInNgn,
          fee,
          wallet_address,
          account_name: accountName,
          account_number: accountNumber,
          bank_name: filterBankCode[0]?.label,
          type: "sell_ramp",
        }).unwrap();
        navigate("/stellar_withdraw_success", {
          state: {
            transaction_id,
            asset_code,
            token,
            type: transaction,
            fee,
            Hex: data.HexValue,
            amount: amountInNgn,
            refCode: refCode,
            account_name: accountName,
            account_number: accountNumber,
            bank_name: filterBankCode[0]?.label,
          },
        });
      }
    } catch (error: any) {
      navigate("/bad-request");
    } finally {
      dispatch(cleanup());
      setIsLoading(false);
    }
  };

  return (
    <>
      <SlideInOutAnimation>
        <section>
          <Text
            size="xl"
            weight="semi-bold"
            align="center"
            mt={30}
            color="#000"
          >
            Withdraw
          </Text>
          <Space h={10} />
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
          <Text size="xs" align="left" color="#696F79">
            (Fixed merchant fee of 760 NGN included)
          </Text>
          <Space h={15} />
          <Select
            label="Bank name"
            onChange={(value) => {
              setBankCode(value);
            }}
            placeholder="Select bank"
            itemComponent={SelectItem}
            data={bankList}
            searchable
            size="md"
            transition="pop-top-left"
            transitionTimingFunction="ease"
            transitionDuration={80}
            maxDropdownHeight={200}
            nothingFound="Empty list"
            filter={(label: string, item: any) =>
              item.label?.toLowerCase().includes(label.toLowerCase().trim())
            }
          />
          <Space h={15} />
          <TextInput
            label="Account number"
            type="number"
            size="md"
            placeholder={`Enter account number`}
            value={accountNumber}
            disabled={bankCode ? false : true}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAccountNumber(event.target.value);
            }}
          />
          <p
            className="text-gray-600"
            style={{
              color: "red",
              marginTop: "0px",
              fontWeight: "lighter",
              fontSize: "14px",
            }}
          >
            {accNameCheck}
          </p>
          {/* <Space h={10} /> */}
          <TextInput
            label="Account name"
            type="text"
            size="md"
            placeholder={`Enter Account name `}
            value={accountName}
            readOnly
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAccountName(event.target.value);
            }}
          />

          <Space h={10} />
          <Button
            size="lg"
            fullWidth
            mt={20}
            style={{ fontWeight: 500 }}
            radius="md"
            className={classes.button}
            onClick={handleNext}
            loading={isLoading && true}
            disabled={
              accountName === "" ||
              accountNumber === "" ||
              parseFloat(amount) < 20000
                ? true
                : false
            }
          >
            Continue
          </Button>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
