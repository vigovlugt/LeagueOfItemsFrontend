export type PatchNotesChangeType = "CHAMPION" | "RUNE" | "ITEM";

export default interface IPatchNotesChange {
    type: PatchNotesChangeType | null;
    id: number | null;
    title: string;
    body: string;
}
