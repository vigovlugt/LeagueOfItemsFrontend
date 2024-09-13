import IPatchNotesChange from "./IPatchNotesChange";

export default interface IPatchNotesGroup {
    id: string;
    title: string;
    changes: IPatchNotesChange[];
}
