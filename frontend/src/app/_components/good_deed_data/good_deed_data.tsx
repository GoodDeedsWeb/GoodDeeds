import GoodDeed from "@/app/interfaces/good.deed.interface";
import { GetUserGoodDeeds } from "@/app/requests/get.user.good.deeds";

export default function GoodDeedData() {
  const goodDeeds = GetUserGoodDeeds();

  if (!goodDeeds) {
    return <div></div>
  }

  return (
    <div>
        <h2 className="mb-6 text-4xl font-semibold text-gray-900">My good deeds:</h2>
        <ul className="max-w-md text-2xl space-y-5 text-gray-500 list-disc list-inside">
            {goodDeeds.map((goodDeed: GoodDeed) => (
                <li key={goodDeed.Id}>
                    {goodDeed.GoodDeed}
                </li>
            ))}
        </ul>
        <div className="mt-6 flex gap-10">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Create
          </button>
          <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Delete
          </button>
        </div>
    </div>
  );
}