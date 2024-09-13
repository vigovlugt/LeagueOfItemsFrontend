import ChampionGridCell from "./champions/ChampionGridCell";
import RuneGridCell from "./runes/RuneGridCell";
import ItemGridCell from "./items/ItemGridCell";

export default function GridCell({ type, id, className = "", size = "md" }) {
    const Component = {
        CHAMPION: ChampionGridCell,
        RUNE: RuneGridCell,
        ITEM: ItemGridCell,
    }[type] as any;

    return (
        <Component id={id} className={`!mr-0 !mb-0 ${className}`} size={size} />
    );
}
