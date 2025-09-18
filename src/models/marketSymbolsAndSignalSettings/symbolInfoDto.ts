export default interface SymbolInfoDto {
    symbol: string;
    spreadInPoints: number;
    tradeContractSize: string;
    tradePointSize: string;
    tradePointValue: string;
    minPositionSize: string;
    minPositionSizeStep: string;
    marginByContract: string;
    averageDailyRangeInCurrency: string;
    marginByMinPositionSize: string;
    spreadLossByContract: string;
    spreadLossByMinPositionSize: string;
    dailyMovingProfitByContract: string;
    dailyMovingProfitByMinPositionSize: string;
    spreadLossToMarginPercentRatio: string;
    dailyMovingProfitToMarginPercentRatio: string;
    dailyMovingProfitToSpreadLossRatio: string;
}