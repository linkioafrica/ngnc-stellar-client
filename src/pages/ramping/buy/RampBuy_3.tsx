/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useState,
  forwardRef,
  ComponentPropsWithoutRef,
  useEffect,
} from "react";
import axios from "axios";
import { url } from "../../../api/";
import { useLocation, useNavigate } from "react-router-dom";
import { SlideInOutAnimation } from "../../../libs/PageAnimation";
import { bankList } from "../../../libs/bankList";
import { IconArrowNarrowLeft, IconInfoCircle } from "@tabler/icons";
import { useBuyRampMutation } from "../../../services/transactionApi";
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

export const RampBuy_3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accNameCheck, setAccNameCheck] = useState("");
  const [bankCode, setBankCode] = useState<string | any>();
  const [verify, setVerify] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line array-callback-return
  const filterBankCode = bankList.filter((bank: any) => {
    if (bankCode === bank.value) return bank;
  });

  const checkIDNumber = () => {
    if (accountNumber.length >= 1 && accountNumber.length !== 10) {
      setAccNameCheck("🚫 provide 10 digits of account number");
    } else {
      setAccNameCheck("");
    }
    if (accountNumber.length >= 10) {
      setAccountNumber(accountNumber.slice(0, 10));
      setAccNameCheck("Checking account name...");
      handleCheckAccountNumber();
    }
  };

  const handleCheckAccountNumber = async () => {
    const loading = toast.loading("Fetching account name...");

    try {
      const { data } = await axios.get(
        `${url}/account/verify-account-number?num=${accountNumber}&bankCode=${filterBankCode[0]?.value}`
      );
      if (data.status === "success") {
        setVerify(true);
        setAccNameCheck("✅ Account number valid");
      } else {
        setAccNameCheck("❌ Account number invalid");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to get account name", { id: loading });
    }
  };

  useEffect(() => {
    checkIDNumber();
  }, [accountNumber]);

  const [buyRamp] = useBuyRampMutation();
  const {
    amount,
    fee,
    wallet_address,
    refCode,
    vendor_account_name,
    vendor_account_number,
    vendor_bank_name,
    type,
    transaction_id,
    asset_code,
  } = location.state;

  const handleSubmitTransactionData = async () => {
    setIsLoading(true);
    if (!accountNumber || !bankCode) return;
    try {
      const data = await buyRamp({
        transaction: type,
        transaction_id,
        reference: refCode,
        asset_code,
        amount,
        fee,
        wallet_address,
        vendor_name: vendor_account_name,
        vendor_accNumber: vendor_account_number,
        vendor_bank: vendor_bank_name,
        bank_name: filterBankCode[0]?.label,
        account_number: accountNumber,
      }).unwrap();

      if (data.status === "success") {
        navigate("/stellar_deposit_success", {
          state: {
            ...location.state,
            bank_name: filterBankCode[0]?.label,
            account_number: accountNumber,
          },
        });
      }
    } catch (error: any) {
      console.log(error);
      navigate("/bad-request");
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
            onClick={() => navigate(-1)}
          />
          <Text size="xl" weight="semi-bold" align="center" color="#000" mt={5}>
            Proof of Payment
          </Text>
          <section>
            <div>
              <Card
                p="sm"
                radius={8}
                mt={20}
                style={{ backgroundColor: "#F4F8FF" }}
              >
                <Grid justify="space-between" align="flex-start">
                  <Grid.Col span={1}>
                    <IconInfoCircle size={30} stroke={1.5} color="#1565d8" />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Card.Section>
                      <Text size="xs" color="#1565d8">
                        Ensure the Account details provided below are in your
                        VERIFIED NAME and the SAME used in making transfer.
                      </Text>
                    </Card.Section>
                  </Grid.Col>
                </Grid>
              </Card>
              <Card
                p="sm"
                radius={8}
                mt={15}
                style={{ backgroundColor: "#F4F8FF" }}
              >
                <Grid justify="space-between" align="flex-start">
                  <Grid.Col span={1}>
                    <IconInfoCircle size={30} stroke={1.5} color="#1565d8" />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Card.Section>
                      <Text size="xs" color="#1565d8">
                        All deposit request initiated and haven't been completed
                        within 30min time frame will automatically be cancelled.
                      </Text>
                    </Card.Section>
                  </Grid.Col>
                </Grid>
              </Card>
            </div>
            <Space h={20} />
            <Select
              label="Bank"
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
            <Space h={20} />
            <TextInput
              label="Account number"
              type="number"
              disabled={bankCode ? false : true}
              size="md"
              placeholder={`Enter account number`}
              value={accountNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAccountNumber(event.target.value);
              }}
            />
            <p
              className="text-gray-600"
              style={{
                color: "red",
                marginTop: "2px",
                fontWeight: "lighter",
                fontSize: "14px",
              }}
            >
              {accNameCheck}
            </p>
          </section>
          <Space h={30} />

          <Button
            size="lg"
            fullWidth
            mb={-10}
            mt={10}
            style={{ fontWeight: 500 }}
            radius="md"
            className={classes.button}
            onClick={handleSubmitTransactionData}
            loading={isLoading && true}
            disabled={accountNumber === "" || verify === false ? true : false}
          >
            Continue
          </Button>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
