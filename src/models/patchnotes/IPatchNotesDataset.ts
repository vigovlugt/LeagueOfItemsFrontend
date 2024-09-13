import IPatchNotesGroup from "./IPatchNotesGroup";

export default interface IPatchNotesDataset {
    title: string;
    description: string;
    bannerImageUrl: string;
    highlightImageUrl: string;
    quote: string;
    groups: IPatchNotesGroup[];
}
