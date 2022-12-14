import { SdkItem } from "../../../sdk/dto/sdk-item"

export interface ContentListModelbase {
    Attributes: {[key: string]: string}
    OpenDetails: boolean
    Pager?: {}
    OnDetailsOpen: (sdkItem: SdkItem) => void
}
