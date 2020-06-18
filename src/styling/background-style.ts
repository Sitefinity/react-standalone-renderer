import { SdkItem } from "../sdk/dto/sdk-item";
import { ImagePosition } from "./position";

export interface BackgroundStyle {
    BackgroundType: "None" | "Color" | "Image" | "Video";
    Color: string,
    ImageItem: SdkItem;
    VideoItem: SdkItem;
    Position: ImagePosition;
}
