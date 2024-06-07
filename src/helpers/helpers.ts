import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";
// const OPEN_FEE = Number(process.env.REACT_APP_OPEN_FEE || 0.1);
// const CLOSE_FEE = Number(process.env.REACT_APP_CLOSE_FEE || 0.1);
let storagePair = "" as any;
if (window.localStorage.getItem("persist:root")) {
  storagePair = JSON.parse(
    JSON.parse(window.localStorage.getItem("persist:root") ?? "")?.pair ?? ""
  );
}
const OPEN_FEE = Number(
  storagePair ? storagePair.openFee : process.env.REACT_APP_OPEN_FEE || 0.1
);
const CLOSE_FEE = Number(
  storagePair ? storagePair.closeFee : process.env.REACT_APP_OPEN_FEE || 0.1
);
const EXCUTION_FEE = Number(process.env.REACT_APP_EXCUTION_FEE || 0.2);
const LIQUID_PERCENT = 95;
export const toHexString = (bytes: any) =>
  bytes.reduce(
    (str: any, byte: any) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
export const toHexByte32 = (hex: any) => "0x" + toHexString(hex);

export const formatInput = (val: any) => {
  return new BigNumber(val.replace(/,/g, "")).toNumber();
};
export const formatInputString = (val: any) => {
  return new BigNumber(val.replace(/,/g, "")).toString();
};
//format input sending
export const parseEther = (input: string | number) => {
  return parseUnits(`${formatInput(input.toString())}`, 18) + "";
};
export const formatEther = (input: string | number | bigint) => {
  return formatUnits(BigInt(input), 18);
};
export const parseMwei = (input: string | number) => {
  return parseUnits(`${formatInput(input.toString())}`, 6) + "";
};
export const parseMweiPercent = (input: string | number) => {
  return new BigNumber(
    parseUnits(`${formatInput(input.toString()) ?? 0}`, 6) + ""
  )
    .dividedBy(100)
    .toString();
};

export const formatMwei = (input: string | number | bigint) => {
  if (typeof input === "number") {
    if (isNaN(input)) {
      return formatUnits(BigInt(0), 6);
    }
  }
  return formatUnits(BigInt(input), 6);
};
//format position
export const getOpenFee = (amount: number, leverage: number) => {
  return new BigNumber(amount * leverage)
    .multipliedBy(OPEN_FEE / 100)
    .toNumber();
};
export const getPositionSize = (amount: number, leverage: number) => {
  return new BigNumber(amount * leverage)
    .multipliedBy(1 - leverage * (OPEN_FEE / 100))
    .toNumber();
};

export const getPositionSizeNoOpen = (amount: number, leverage: number) => {
  return new BigNumber(amount * leverage).toNumber();
};
export const getInfoPosition = (positionSize: number, infoFeild: number) => {
  return new BigNumber(positionSize).div(infoFeild).toNumber();
};
export const getAmountLimit = (
  positionSize: number,
  limitLeverage: number,
  collateral: number
) => {
  return new BigNumber(positionSize)
    .div(limitLeverage)
    .minus(collateral)
    .toNumber();
};
export const getAmountWithdraw = (
  positionSize: number,
  limitLeverage: number,
  collateral: number
) => {
  return new BigNumber(positionSize)
    .div(limitLeverage)
    .minus(collateral)
    .toNumber();
};

export const getSizeLimit = (amount: number, leverage: number) => {
  return new BigNumber(amount * leverage).toNumber();
};
export const getCloseFee = (positionSize: number) => {
  return new BigNumber(positionSize).multipliedBy(CLOSE_FEE / 100).toNumber();
};
export const getPNL = (
  isLong: boolean = true,
  marketPrice: number,
  openPrice: number,
  amount: number,
  laverage: number,
  hasOpen?: "hasOpen",
  diffFunding?: number
) => {
  let positionSize = 0;
  if (!hasOpen) {
    positionSize = getPositionSize(amount, laverage);
  } else {
    positionSize = getPositionSizeNoOpen(amount, laverage);
  }
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(positionSize)
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  // console.log({ fundingFee });

  // const closeFee = getCloseFee(positionSize);
  let pnl = 0;
  if (isLong) {
    pnl = new BigNumber(positionSize)
      .multipliedBy((marketPrice - openPrice) / openPrice)
      .plus(fundingFee)
      .toNumber();
  } else {
    pnl = new BigNumber(positionSize)
      .multipliedBy((openPrice - marketPrice) / openPrice)
      .plus(fundingFee)
      .toNumber();
  }
  let pnlPercent = +new BigNumber(pnl / amount).multipliedBy(100).toFixed(2);
  return { pnl, pnlPercent };
};
export const getPricePnl = (
  isLong: boolean = true,
  initPrice: number,
  amount: number,
  laverage: number,
  pnlPercent: number,
  isStoploss: boolean = true,
  hasOpen?: "hasOpen",
  diffFunding?: number
) => {
  let positionSize = 0;

  if (!hasOpen) {
    positionSize = getPositionSize(amount, laverage);
  } else {
    positionSize = getPositionSizeNoOpen(amount, laverage);
  }
  const closeFee = getCloseFee(positionSize);
  let price = 0;
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(positionSize)
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  const valuePnl = new BigNumber(
    (isStoploss ? -pnlPercent : pnlPercent) * amount
  )
    .div(100)
    .toNumber();
  if (isLong) {
    price = new BigNumber(initPrice)
      .multipliedBy((valuePnl + positionSize - fundingFee) / positionSize)
      .toNumber();
  } else {
    price = new BigNumber(initPrice)
      .multipliedBy((-valuePnl + positionSize + fundingFee) / positionSize)
      .toNumber();
  }
  return { price };
};
export const getPricePnlLiquid = (
  isLong: boolean = true,
  initPrice: number,
  amount: number,
  leverage: number,
  diffFunding: number = 0,
  hasFee: boolean = false
) => {
  let positionSize = 0;
  if (hasFee) {
    positionSize = getSizeLimit(amount, leverage);
  } else {
    positionSize = getPositionSize(amount, leverage);
  }
  const closeFee = new BigNumber(getCloseFee(positionSize))
    .plus(EXCUTION_FEE)
    .toNumber();
  let price = 0;
  let amountAfter = getInfoPosition(positionSize, leverage);
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(positionSize)
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  let feePrice = new BigNumber(initPrice)
    .multipliedBy((-LIQUID_PERCENT / 100) * amountAfter + closeFee - fundingFee)
    .dividedBy(amountAfter * leverage)
    .toNumber();
  if (isLong) {
    price = new BigNumber(+initPrice).plus(feePrice).toNumber();
  } else {
    price = new BigNumber(+initPrice).minus(feePrice).toNumber();
  }
  return price;
};
export const getPricePnlLiquidIncrease = (
  isLong: boolean = true,
  initPrice: number,
  amount: number,
  leverage: number,
  diffFunding: number = 0,
  hasFee: boolean = false,
  initAmount: number
) => {
  let positionSize = 0;
  if (hasFee) {
    positionSize = getSizeLimit(amount, leverage);
  } else {
    positionSize = getPositionSize(amount, leverage);
  }
  const closeFee = new BigNumber(getCloseFee(positionSize))
    .plus(EXCUTION_FEE)
    .toNumber();
  let price = 0;
  let amountAfter = getPositionSize(positionSize, leverage);
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(getPositionSize(initAmount, leverage))
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  let feePrice = new BigNumber(initPrice)
    .multipliedBy((-LIQUID_PERCENT / 100) * amountAfter + closeFee - fundingFee)
    .dividedBy(amountAfter * leverage)
    .toNumber();
  if (isLong) {
    price = new BigNumber(+initPrice).plus(feePrice).toNumber();
  } else {
    price = new BigNumber(initPrice).minus(feePrice).toNumber();
  }
  return price;
};
export const getPriceLiquidIncrease = (
  isLong: boolean = true,
  initPrice: number,
  amount: number,
  leverage: number,
  diffFunding: number = 0,
  hasFee: boolean = false,
  initAmount: number,
  amountAfter: number
) => {
  let positionSize = 0;
  if (hasFee) {
    positionSize = getSizeLimit(amount, leverage);
  } else {
    positionSize = getPositionSize(amount, leverage);
  }
  const closeFee = new BigNumber(getCloseFee(positionSize))
    .plus(EXCUTION_FEE)
    .toNumber();
  let price = 0;
  // let amountAfter = getSizeLimit(positionSize, leverage)
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(getPositionSize(initAmount, leverage))
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  let feePrice = new BigNumber(initPrice)
    .multipliedBy((-LIQUID_PERCENT / 100) * amountAfter + closeFee)
    .dividedBy(amountAfter * leverage)
    .toNumber();
  if (isLong) {
    price = new BigNumber(+initPrice).plus(feePrice).toNumber();
  } else {
    price = new BigNumber(initPrice).minus(feePrice).toNumber();
  }
  return price;
};
export const getPriceLiquidDecrease = (
  isLong: boolean = true,
  initPrice: number,
  amount: number,
  leverage: number,
  diffFunding: number = 0,
  amountAfter: number
) => {
  let positionSize = getSizeLimit(amount, leverage);
  const closeFee = new BigNumber(getCloseFee(positionSize))
    .plus(EXCUTION_FEE)
    .toNumber();
  let price = 0;
  let fundingFee = 0;
  if (diffFunding) {
    fundingFee = new BigNumber(getSizeLimit(amount, leverage))
      .multipliedBy(diffFunding)
      .dividedBy(1e6)
      .toNumber();
  }
  let feePrice = new BigNumber(initPrice)
    .multipliedBy((-LIQUID_PERCENT / 100) * amountAfter + closeFee - fundingFee)
    .dividedBy(amountAfter * leverage)
    .toNumber();
  if (isLong) {
    price = new BigNumber(+initPrice).plus(feePrice).toNumber();
  } else {
    price = new BigNumber(initPrice).minus(feePrice).toNumber();
  }
  return price;
};
export const calcAmountUSDC = (
  totalSupply: string | bigint,
  amountLP: string | bigint,
  poolBalance: number,
  bps: number = 1e6,
  withdrawFee: number = 1000
) => {
  const amount = new BigNumber(
    +formatEther(amountLP) * +formatMwei(poolBalance)
  )
    .div(+formatEther(totalSupply))
    .toNumber();
  return { amount };
};

export const calcUSDCtoLP = (
  totalSupply: string | bigint,
  amountUSDC: number,
  poolBalance: number
) => {
  const amount = new BigNumber(
    +formatEther(totalSupply) / Number(formatMwei(poolBalance))
  )
    .multipliedBy(amountUSDC)
    .toNumber();
  return { amount };
};

export const definedError = (error: any) => {
  const splitCodeError = error.toString().split("DEX:")?.[1] ?? "";
  let codeError = 0;
  if (splitCodeError.length) {
    codeError = +splitCodeError.slice(0, 3);
  }
  return codeError;
};

export const getDiffFundingFee = (
  isLong: boolean,
  fundingTracker: number,
  currentFundingTracker: number
) => {
  if (isLong) {
    return new BigNumber(fundingTracker)
      .minus(currentFundingTracker)
      .toNumber();
  }
  return new BigNumber(currentFundingTracker).minus(fundingTracker).toNumber();
};

//get funding fee
export const getFundingFee = (
  amount: number,
  leverage: number,
  isLong: boolean,
  fundingTracker: number,
  currentFundingTracker: number
) => {
  const positionSize = getSizeLimit(amount, leverage);
  if (isLong) {
    return -new BigNumber(currentFundingTracker)
      .minus(fundingTracker)
      .dividedBy(1e6)
      .multipliedBy(positionSize)
      .toNumber();
  }
  return new BigNumber(currentFundingTracker)
    .minus(fundingTracker)
    .dividedBy(1e6)
    .multipliedBy(positionSize)
    .toNumber();
};
//calc oracle fee
export enum gasUsedL2 {
  EDIT_COPY = 200000,
  EDIT_COLLATERAL = 150000,
  EDIT_POSITION = 200000,
  EXCUTE_COPY = 350000,
  OPEN_POSITION = 350000,
  OPEN_POSITION_PERMIT = 380000,
  OPEN_LIMIT_POSITION = 350000,
  UPDATE_LIMIT = 150000,
  DEPOSIT = 150000,
  DEPOSIT_PERMIT = 200000,
  WITHDRAW = 150000,
  CLOSE_POSITION = 300000,
  WITHDRAW_PROFIT = 100000,
}
export const getOracleFee = (
  gasUsedL2: gasUsedL2,
  gasPrice: number,
  l1Gas: number = 0
) => {
  const oracleFee = new BigNumber(gasUsedL2)
    .multipliedBy(gasPrice)
    .dividedBy(1e9)
    .plus(l1Gas / 1e18)
    .multipliedBy(2e3)
    .toNumber();
  return oracleFee;
};
