import AddFriend from "@/app/requests/add.friend";

export default function AddFriendButton({ userId }: {userId : string}) {
  const AddFriendAction = async () => {
    if (await AddFriend(userId)) {
      window.location.reload();
    }
  }

  return (
    <button type="button" onClick={AddFriendAction} className="py-2.5 px-5 mt-8 text-xl font-medium text-blue-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
      Add friend
    </button>
  );
}
