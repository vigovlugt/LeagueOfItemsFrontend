import Api from "./DatasetApi";

export default class PatchScheduleApi {
    static getPatchSchedule() {
        return Api.getDataset().patchSchedule;
    }

    static getNextPatch(): any | null {
        const now = new Date();
        const patches = this.getPatchSchedule();

        let index = 0;
        while (new Date(patches[index].scheduledDate) < now) {
            index++;
            if (index === patches.length) {
                return null;
            }
        }

        return patches[index];
    }
}
