"use client";

import { ISubscription } from "@/app/_types/subscriptionTypes";
import { subscriptionOptions } from "@/app/_utils/constants";
import { jalaaliNumericDateAndTime } from "@/app/_utils/helpers";
import {
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import localFont from "next/font/local";
import styles from "./OrderTable.module.css";
import Image from "next/image";
import Link from "next/link";

type Props = { subscriptions: ISubscription[] };

const customFont = localFont({
  src: "../../../_fonts/Qs_Iranyekan.ttf",
});

function OrdersTable({ subscriptions }: Props) {
  const isXsmWindow = useMediaQuery("(min-width:500px");
  const isXlWindow = useMediaQuery("(min-width:1280px)");

  const theme = createTheme({
    typography: {
      fontFamily: customFont.style.fontFamily,
    },
    direction: "rtl",
  });

  const heads = ["زمان سفارش", "نوع سفارش", "شناسه سفارش", "مبلغ پرداختی", " "];
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TableContainer>
          <Table
            classes={{
              root: styles.table,
            }}
            sx={{
              borderCollapse: "separate",
              borderSpacing: isXsmWindow ? "0px 10px" : "0 1px",
            }}
          >
            <TableHead
              classes={{
                root: styles.thead,
              }}
            >
              <TableRow
                classes={{
                  root: styles["thead-table-row"],
                }}
              >
                {heads.map((hd, i) => (
                  <TableCell
                    classes={{ root: styles["thead-table-cell"] }}
                    align="center"
                    key={i}
                    {...(isXsmWindow && {
                      sx: {
                        borderTopRightRadius: i === 0 ? "12px" : 0,
                        borderBottomRightRadius: i === 0 ? "12px" : 0,
                        borderBottomLeftRadius:
                          i === heads.length - 1 ||
                          (i === heads.length - 2 && !isXlWindow)
                            ? "12px"
                            : 0,
                        borderTopLeftRadius:
                          i === heads.length - 1 ||
                          (i === heads.length - 2 && !isXlWindow)
                            ? "12px"
                            : 0,
                      },
                    })}
                    {...((hd === "شناسه سفارش" || hd === " ") && {
                      ...(!isXlWindow && { sx: { display: "none" } }),
                    })}
                  >
                    {hd}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody classes={{ root: styles.tbody }}>
              {subscriptions.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/account/orders/${sub._id}`}
                  passHref
                  legacyBehavior
                >
                  <TableRow
                    classes={{ root: styles["tbody-table-row"] }}
                    component="tr"
                  >
                    <TableCell
                      classes={{
                        root: styles["tbody-table-cell"],
                      }}
                      align="center"
                      {...(isXsmWindow && {
                        sx: {
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px",
                        },
                      })}
                    >
                      {jalaaliNumericDateAndTime(sub.createdAt)}
                    </TableCell>
                    <TableCell
                      classes={{
                        root: styles["tbody-table-cell"],
                      }}
                      align="center"
                    >
                      {
                        subscriptionOptions.find(
                          (el) => el.month === sub.months,
                        )?.expirationDate
                      }
                    </TableCell>
                    <TableCell
                      classes={{
                        root: styles["tbody-table-cell"],
                      }}
                      align="center"
                      {...(!isXlWindow && { sx: { display: "none" } })}
                    >
                      {sub.subCode}
                    </TableCell>
                    <TableCell
                      classes={{
                        root: styles["tbody-table-cell"],
                      }}
                      align="center"
                      {...(isXsmWindow &&
                        !isXlWindow && {
                          sx: {
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          },
                        })}
                    >
                      {sub.price} تومان
                    </TableCell>
                    <TableCell
                      classes={{
                        root: styles["tbody-table-cell"],
                      }}
                      sx={{
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                      }}
                      {...(!isXlWindow && { sx: { display: "none" } })}
                    >
                      <Image
                        src="/icons/chevron-left-gray.svg"
                        alt="arrow-left"
                        width={14}
                        height={14}
                      />
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}

export default OrdersTable;
