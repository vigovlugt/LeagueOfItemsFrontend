export default interface IPatchNotesAttributeChange {
    attribute: string;
    changeType: string;
    before: string;
    after: string;
    removed: string;
}
