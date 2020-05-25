import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: 'vasya', age: 98 })
const root = document.querySelector('#root')

if (root) {
  const userForm = new UserForm(root, user)
  userForm.render()
} else {
  throw new Error('Root element not found')
}
