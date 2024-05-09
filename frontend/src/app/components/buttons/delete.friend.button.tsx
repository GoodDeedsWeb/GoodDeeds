import DeleteFriend from "@/app/requests/delete.friend";

export default function DeleteFriendButton({ userId }: {userId : string}) {
  const DeleteFriendAction = async () => {
    if (await DeleteFriend(userId)) {
      window.location.reload();
    }
  }

  return (
    <button type="button" onClick={DeleteFriendAction} className="py-2.5 px-5 mt-8 text-xl font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">
      Delete friend
    </button>
  );
}
