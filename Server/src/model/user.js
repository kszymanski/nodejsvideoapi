module.exports = DB  => {
    let Videos = require('./video')(DB);
    class User extends DB.Model {
        get tableName() { return 'users'; }
        get videos() {
            return this.hasMany('Video');
        }
    }
    return User;
}