import PatchNotesAttributeChange from "./PatchNotesAttributeChange";

export default function PatchNotesChangeDetail({ title, attributeChanges }) {
    return (
        <div className="mb-3">
            {title && <h4 className="font-header text-xl">{title}</h4>}
            {attributeChanges.map((c, i) => (
                <PatchNotesAttributeChange key={i} {...c} />
            ))}
        </div>
    );
}
