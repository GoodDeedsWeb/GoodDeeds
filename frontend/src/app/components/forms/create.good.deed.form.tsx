import './form.scss';

export default function CreateGoodDeedForm({ closeForm }: { closeForm:() => void }) {
  return (
    <form onSubmit={GoodDeedCreate} className='w-96'>
      <div className="mb-5">
        <label htmlFor="goodDeed" className="block mb-2 text-sm font-semibold text-gray-900">Enter your good deed =)</label>
        <input type="text" id="goodDeed" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full" required />
      </div>
      <div className="flex justify-around gap-5">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Create</button>
        <button onClick={closeForm} className="text-white bg-red-700 hover:bg-red-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Close</button>
      </div>
      <p className="mt-2 text-sm text-red-600 disabled" id="helper-message"></p>
    </form>
  );
};

async function GoodDeedCreate (event: React.SyntheticEvent) {
  event.preventDefault();

  const helperMessage = document.getElementById('helper-message');

  if (!helperMessage) {
    throw new Error('Helper message not found');
  }

  const target = event.target as typeof event.target & {
    goodDeed: { value: string };
  };

  const myId = localStorage.getItem("UserId");
  console.log(myId);
  const data = {
    UserId: myId,
    GoodDeed: target.goodDeed.value,
  };

  const jsonData = JSON.stringify(data);

  const token = localStorage.getItem("Bearer");

  const url = 'http://localhost:4000/good-deed';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'Bearer ' + token,
    },
    body: jsonData,
  };
  
  const response = await fetch(url, options);

  const jsonResponse = await response.json();

  if (response.status !== 201) {
    helperMessage.classList.remove('disabled');
    helperMessage.innerText = jsonResponse.message;
  }

  if (response.status === 201) {
    window.location.reload();
  }
};
