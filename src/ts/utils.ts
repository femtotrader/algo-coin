import {PerspectiveWidget} from "@finos/perspective-phosphor";
import {Widget} from "@phosphor/widgets";
import {DataLoader} from "phosphor-perspective-utils/data";

export interface ITab {
    tab: Widget; // Phosphor Widget
    loaders: DataLoader[]; // Data Loaders
    perspectives: PerspectiveWidget[]; // Perspective widgets
}
