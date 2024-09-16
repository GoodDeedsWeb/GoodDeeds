import './form.scss';

export default function UpdateUserForm({ closeForm }: { closeForm:() => void }) {
  return (
    <form onSubmit={submitAction}>
       <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900">Email</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full" placeholder="name@gooddeed.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-900">Name</label>
        <input type="text" id="name" className="border border-gray-300 rounded-lg  p-2.5 w-full" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900">Password</label>
        <input type="password" id="password" className="border border-gray-300 rounded-lg  p-2.5 w-full" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900">Confirm password</label>
        <input type="password" id="confirmPassword" className="border border-gray-300 rounded-lg  p-2.5 w-full" required />
      </div>
      <div className="flex justify-around gap-5">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Update</button>
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

  const target = event.target as typeof event.target & {
    email: { value: string };
    name: { value: string };
    password: { value: string };
    confirmPassword: { value: string };
  };

  if (target.password.value !== target.confirmPassword.value) {
    helperMessage.classList.remove('disabled');
    helperMessage.innerText = 'Password must be equal with confirm password';
    return;
  }

  const token = localStorage.getItem('Bearer');
  const myId = localStorage.getItem('UserId');

  const data = {
    Id: myId,
    Email: target.email.value,
    Name: target.name.value,
    Password: target.password.value,
  };

  const jsonData = JSON.stringify(data);

  const url = 'http://localhost:4000/user';

  const options = {
    method: 'PUT',
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
    // window.location.href = 'http://localhost:3000/profile/my';
    window.location.href = 'https://good-deeds.zapto.org/profile/my';
  }
};
