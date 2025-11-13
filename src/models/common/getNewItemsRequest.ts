import {DealerTypeEnum} from "../enums/dealerTypeEnum";

export default interface GetNewItemsRequest {
    dealerType: DealerTypeEnum;
    after: Date;
    lastId: number;
}