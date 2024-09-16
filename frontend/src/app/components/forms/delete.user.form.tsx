import './form.scss';

export default function DeleteUserForm({ closeForm }: { closeForm:() => void }) {
  return (
    <form onSubmit={submitAction}>
      <div className="mb-5">
        <p className="font-normal text-gray-700 dark:text-gray-400">Are you sure about this? All data will be deleted!</p>
      </div>
      <div className="flex justify-around gap-5">
        <button type="submit" className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Ok</button>
        <button onClick={closeForm} className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Close</button>
      </div>
      <p className="mt-2 text-sm text-red-600 disabled" id="helper-message"></p>
    </form>
  );
};

async function submitAction (event: React.SyntheticEvent) {
  event.preventDefault();

  const helperMessage = document.getElementById('helper-message');

  if (!helperMessage) {
    throw new Error('Helper message not found');
  }
    
  const token = localStorage.getItem('Bearer');
  const myId = localStorage.getItem('UserId');

  const data = {
    Id : myId,
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://good-deeds.zapto.org/api/user';

  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    },
    body: jsonData,
  };
  
  const response = await fetch(url, option);

  if (response.status !== 200) {
    helperMessage.classList.remove('disabled');
    const jsonResponse = await response.json();
    helperMessage.innerText = jsonResponse.message;
  }

  if (response.status === 200) {
    // window.location.href = 'http://localhost:3000/auth?mode=login';
    window.location.href = 'https://good-deeds.zapto.org/auth?mode=login';
  }

  return response.status == 200 ? true : false;
};