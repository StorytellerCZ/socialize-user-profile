/* global Package */

/* eslint-disable import/no-unresolved, global-require*/
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { User } from 'meteor/socialize:user-model';

import { ProfilesCollection } from '../common/common.js';

let childrenPublications = [
    {
        find(user) {
            return ProfilesCollection.find({ _id: user._id });
        },
    },
];

let FriendsCollection;
let RequestsCollection;

if (Package['socialize:friendships']) {
    FriendsCollection = require('meteor/socialize:friendships').FriendsCollection;
    RequestsCollection = require('meteor/socialize:requestable').RequestsCollection;
}

Meteor.publish('socialize.userProfile', async function publishUserProfile(username) {
  check(username, String);
  if (!this.userId) return this.ready();
  const currentUser = User.createEmpty(this.userId);
  const userCursor = Meteor.users.find({ username }, { fields: User.fieldsToPublish });
  const userToPublish = await userCursor.fetchAsync()[0];
  const isSelf = userToPublish.isSelf(currentUser);

  if (isSelf || (!currentUser.blocksUser(userToPublish) && !userToPublish.blocksUser(currentUser))) {
    if (!isSelf && Package['socialize:friendships']) {
      const friendsCursor = FriendsCollection.find({
        $or: [
          { userId: userToPublish._id, friendId: this.userId },
          { userId: this.userId, friendId: userToPublish._id },
        ],
      });
      const requestsCursor = RequestsCollection.find({
        $or: [
          { linkedObjectId: this.userId, requesterId: userToPublish._id },
          { linkedObjectId: userToPublish._id, requesterId: this.userId },
        ],
      });
      return [userCursor, friendsCursor, requestsCursor];
    }
    return [userCursor];
  }
})
