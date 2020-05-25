import { ApiSync } from './ApiSync'
import { Attributes } from './Attributes'
import { Eventing } from './Eventing'
import { Collection } from './Collection'
import { Model } from './Model'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const baseUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Eventing(),
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(baseUrl)
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(baseUrl, (json: UserProps) =>
      User.buildUser(json)
    )
  }

  setRandomAge() {
    const age = Math.round(Math.random() * 100)
    this.set({ age })
  }
}
