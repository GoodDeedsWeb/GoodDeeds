import UserData from '@/app/interfaces/user.data.interface';

export default function ProfileData({ userData }: { userData: UserData }) {
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
    </div>
  );
}