import IPatchNotesAttributeChange from "./IPatchNotesAttributeChange";

export default interface IPatchNotesChangeDetail {
    title: string;
    attributeChanges: IPatchNotesAttributeChange[];
}
