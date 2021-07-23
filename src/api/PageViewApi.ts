import connect from "../utils/database";
import PageView from "../models/api/PageView";

class PageViewApi {
  async getPopularPages() {
    await connect();

    await this.deleteOldPageViews();

    const pageViews = await PageView.find();

    const pagesByViews = pageViews.reduce((obj, pageView) => {
      const key = pageView.type + "-" + pageView.id;

      obj[key] = obj.hasOwnProperty(key) ? obj[key] + 1 : 1;

      return obj;
    }, {});

    const pages = Object.entries(pagesByViews)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map((p) => {
        const [type, id] = p[0].split("-");

        return { type, id: parseInt(id), views: p[1] };
      });

    return pages.slice(0, 100);
  }

  async deleteOldPageViews() {
    const oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

    await PageView.deleteMany({
      createdAt: { $lt: oneWeekAgo },
    });
  }
}

const api = new PageViewApi();
export default api;
