import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  createStyles,
  Grid,
  Group,
  Anchor,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconMessageCircle2,
  IconPhone,
} from "@tabler/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SlideInOutAnimation } from "../../../libs/PageAnimation";
import { linkBankList } from "../../../libs/linkBankList";
import { useBuyRampMutation } from "../../../services/transactionApi";
import { useEffect, useState } from "react";
const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.secondary[0],
    ":hover": { backgroundColor: theme.colors.secondary[5] },
    ":disabled": { backgroundColor: theme.colors.secondary[3], color: "white" },
    transition: "all 0.3s ease-in-out",
  },
}));

export const RampBuy_2 = () => {
  // const [fee, setFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [vendor_account_name, setVendorAccountName] = useState("");
  const [vendor_account_number, setVendorAccountNumber] = useState("");
  const [vendor_bank_name, setVendorBankName] = useState("");
  let [refCode] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * linkBankList.length);
    const randomBankDetail = linkBankList[randomIndex];

    setVendorAccountName(randomBankDetail.accountName);
    setVendorAccountNumber(randomBankDetail.accountNumber);
    setVendorBankName(randomBankDetail.bankName);
  }, []);

  refCode = Math.floor(Math.random() * 99999999999).toString();

  const [buyRamp] = useBuyRampMutation();
  const {
    type,
    asset_code,
    transaction_id,
    amount,
    fee,
    // feePercent,
    wallet_address,
    account_name,
    account_number,
    bank_name,
    domain,
  } = location.state;

  const handleSubmitTransactionData = async () => {
    setIsLoading(true);

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
        bank_name: bank_name,
        account_number: account_name,
        account_name: account_number,
        domain,
      }).unwrap();

      if (data.status === "success") {
        navigate("/stellar_deposit_success", {
          state: {
            ...location.state,
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
          <Text
            size="xl"
            weight="semi-bold"
            align="center"
            color="#000"
            mt={10}
          >
            Make Your Payment
          </Text>
          <section>
            <div>
              <Card
                p="sm"
                radius={8}
                mt={10}
                pb={5}
                style={{ backgroundColor: "#F4F8FF" }}
              >
                <Grid justify="space-between" align="flex-start">
                  <Grid.Col span={1}>
                    <IconInfoCircle size={30} stroke={1.5} color="#1565d8" />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Card.Section>
                      <Text size="xs" color="#1565d8">
                        Add REFERENCE CODE for transfer. <br />
                        Avoid adding CRYPTO PHRASES.
                      </Text>
                    </Card.Section>
                  </Grid.Col>
                </Grid>
              </Card>
              {/* <Card
                p="sm"
                radius={8}
                mt={10}
                style={{ backgroundColor: "#F4F8FF" }}
              >
                <Grid justify="space-between" align="flex-start">
                  <Grid.Col span={1}>
                    <IconInfoCircle size={25} stroke={1.5} color="#1565d8" />
                  </Grid.Col>
                  <Grid.Col span={10}>
                    <Card.Section>
                      <Text size="xs" color="#1565d8">
                        The processing fee is automatically deducted from the
                        total asset quantity when merchant releases asset.
                      </Text>
                    </Card.Section>
                  </Grid.Col>
                </Grid>
              </Card> */}
              <Card p="sm" radius={8} mt={10} shadow="xs">
                <Grid justify="space-between" align="">
                  <Grid.Col>
                    <Text size="xs" align="center" color="#696F79">
                      Amount to send
                    </Text>
                    <Text
                      weight={600}
                      align="center"
                      style={{ fontSize: "1.5rem" }}
                    >
                      NGN {amount}
                    </Text>
                    <Text size="xs" align="center" color="#696F79">
                      (Merchant fee included)
                      {/* (Merchant fee of {fee} included) */}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </div>

            <Card radius={8} mt={10} style={{ backgroundColor: "#F4F8FF" }}>
              <Card.Section>
                <Group position="apart" align="center" p="xs">
                  <Text size="md" color="#1565d8">
                    Contact support:
                  </Text>
                  <Group position="right" align="center">
                    <Anchor
                      href="https://api.whatsapp.com/send/?phone=16893033761&text&type=phone_number&app_absent=0"
                      style={{
                        backgroundColor: "#1565d8",
                        padding: "6px",
                        borderRadius: "50px",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      target="_blank"
                    >
                      <IconMessageCircle2
                        size={20}
                        fill="#fff"
                        color="#fff"
                        stroke={1}
                      />
                    </Anchor>
                    <Anchor
                      href="https://call.whatsapp.com/voice/x6n2yjS4MvaErkKSRSBHBc"
                      style={{
                        backgroundColor: "#1565d8",
                        padding: "6px",
                        borderRadius: "50px",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      target="_blank"
                    >
                      <IconPhone
                        size={20}
                        fill="#fff"
                        color="#fff"
                        stroke={1}
                      />
                    </Anchor>
                  </Group>
                </Group>
              </Card.Section>
            </Card>

            <Group position="apart" mt={10}>
              <Text size="md" align="center" color="#696F79">
                Account name
              </Text>
              <Group>
                <Text size="sm" weight="semi-bold" align="center" color="#000">
                  {vendor_account_name.slice(0, 20)}
                </Text>
                {/* <CopyButton value={account_name} timeout={1000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? 'Copied' : 'Copy'}
                      withArrow
                      position="top"
                      color="#2c74dc"
                      transitionDuration={300}
                    >
                      <ActionIcon
                        color={copied ? 'teal' : 'gray'}
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck size={20} />
                        ) : (
                          <IconCopy size={20} color="#000" />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton> */}
              </Group>
            </Group>
            <Group position="apart" mt={10}>
              <Text size="md" align="center" color="#696F79">
                Bank name
              </Text>
              <Group>
                <Text size="sm" weight="semi-bold" align="center" color="#000">
                  {vendor_bank_name}
                </Text>
                <CopyButton value={vendor_bank_name} timeout={1000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="top"
                      color="#2c74dc"
                      transitionDuration={300}
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck size={20} />
                        ) : (
                          <IconCopy size={20} color="#000" />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
            <Group position="apart" mt={10}>
              <Text size="md" align="center" color="#696F79">
                Account number
              </Text>
              <Group>
                <Text size="sm" weight="semi-bold" align="center" color="#000">
                  {vendor_account_number}
                </Text>
                <CopyButton value={vendor_account_number} timeout={1000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="top"
                      color="#2c74dc"
                      transitionDuration={300}
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck size={20} />
                        ) : (
                          <IconCopy size={20} color="#000" />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
            <Group position="apart" mt={10}>
              <Text size="md" align="center" color="#696F79">
                Reference code
              </Text>
              <Group>
                <Text size="sm" weight="semi-bold" align="center" color="#000">
                  {refCode}
                </Text>
                <CopyButton value={refCode} timeout={5000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="top"
                      color="#2c74dc"
                      transitionDuration={300}
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck size={20} />
                        ) : (
                          <IconCopy size={20} color="#000" />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Group>
          </section>

          <Space h={10} />

          <Button
            size="lg"
            fullWidth
            mb={-18}
            mt={5}
            style={{ fontWeight: 500 }}
            radius="md"
            className={classes.button}
            loading={isLoading && true}
            onClick={handleSubmitTransactionData}
            // onClick={() =>
            //   navigate("/stellar_deposit_3", {
            //     state: {
            //       fee,
            //       vendor_account_name: account_name,
            //       vendor_account_number: account_number,
            //       vendor_bank_name: bank_name,
            //       refCode: refCode,
            //       ...location.state,
            //     },
            //   })
            // }
          >
            I've Paid. Continue
          </Button>
        </section>
      </SlideInOutAnimation>
    </>
  );
};
