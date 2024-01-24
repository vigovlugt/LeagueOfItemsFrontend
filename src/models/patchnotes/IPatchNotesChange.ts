import IPatchNotesChangeDetail from "./IPatchNotesChangeDetail";

export default interface IPatchNotesChange {
    type: string;
    id: number;
    title: string;
    summary: string;
    quote: string;
    details: IPatchNotesChangeDetail[];
}
