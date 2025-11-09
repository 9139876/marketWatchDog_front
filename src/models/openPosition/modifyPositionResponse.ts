export default interface ModifyPositionResponse {
    success: boolean;
    retcodeDescription: string;
    balance: number;
    balanceStr: string;
    equity: number;
    equityStr: string;
    profit: number;
    profitStr: string;
    margin: number;
    marginStr: string;
    marginFree: number;
    marginFreeStr: string;
    marginLevel: number;
    marginLevelStr: string;
    comment: string;
}