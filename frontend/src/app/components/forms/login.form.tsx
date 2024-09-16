import './form.scss';

export default function LoginForm() {
  return (
    <form onSubmit={submitAction}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  p-2.5 w-full" placeholder="name@gooddeed.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="border border-gray-300 rounded-lg p-2.5 w-full" required />
      </div>
      <div className="flex justify-around">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg px-5 py-2.5 text-center w-full">Login</button>
      </div>
      <p className="mt-2 text-sm text-red-600 disabled" id="helper-message"></p>
    </form>
  );
};

async function submitAction (event: React.SyntheticEvent) {
  event.preventDefault();

  const target = event.target as typeof event.target & {
    email: { value: string };
    password: { value: string };
  };

  const data = {
    Email: target.email.value,
    Password: target.password.value,
  }
  const jsonData = JSON.stringify(data);

  const url = 'http://localhost:4000/user/login';

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    body: jsonData,
  };
  
  const response = await fetch(url, option);

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    const helperMessage = document.getElementById('helper-message');
    if (helperMessage){
      helperMessage.classList.remove('disabled');
      helperMessage.innerText = jsonResponse.message ? jsonResponse.message : jsonResponse.Message;
    }
  }

  if (response.status === 200) {
    localStorage.setItem('Bearer', jsonResponse.Jwt);
    localStorage.setItem('UserId', jsonResponse.UserId);
    // window.location.href = 'http://localhost:3000/profile/my';
    window.location.href = 'https://good-deeds.zapto.org/profile/my';
  }
};