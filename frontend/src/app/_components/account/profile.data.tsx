import { GetUserData } from "@/app/requests/get.user.data";
import './profile.data.scss';


export default function ProfileData({ userId }: { userId: string }) {
  const userData = GetUserData(userId);

  if (!userData) {
    return <div></div>
  }

  return (
    <div>
      <div className="card">
        <dl className="max-w-md text-gray-900">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-xl">User id</dt>
            <dd className="text-3xl font-semibold" id="user-id">{userData.Id}</dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-gray-500 md:text-xl">Username</dt>
            <dd className="text-3xl font-semibold" id="username">{userData.Name}</dd>
          </div>
          <div className="flex flex-col pt-3">
            <dt className="mb-1 text-gray-500 md:text-xl">Email</dt>
            <dd className="text-3xl font-semibold" id="user-email">{userData.Email}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-6 flex gap-10">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Update profile
          </button>
          <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Delete user
          </button>
        </div>
    </div>

  );
}