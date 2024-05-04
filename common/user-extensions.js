export default ({ User, ProfilesCollection }) => {
    User.methods({
        async profile() {
            return ProfilesCollection.findOneAsync({ _id: this._id });
        },
    });
};
