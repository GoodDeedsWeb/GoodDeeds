import { GetUsersData } from '@/app/requests/get.friend.data';
import UserData from '../../interfaces/user.data.interface';
import './user.table.scss'

export default function UserTable() {
const users = GetUsersData();

if (!users) {
  return null;
}

return (
  <table>
    <caption className='title'>User Information</caption>
    <thead className='border-y uppercase'>
      <th className='cell'>Id</th>
      <th className='cell'>Name</th>
      <th className='cell'>Email</th>
    </thead>
    {users.map((user: UserData) => (
      <tr key={user.Id}>
        <td className='cell'>{user.Id}</td>
        <td className='cell'>{user.Name}</td>
        <td className='cell'>{user.Email}</td>
      </tr>
    ))}
  </table>
);
}