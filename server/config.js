module.exports = {
  port: 8080,
  secret: "dat bubu lala do",
  pgAdmin: "porstgres://postgres:@localhost/restaurante-trabajo",
  MASSIVE_URI: "postgres://fqcgxihc:oD0eOOtZeQu6OEu3sOU0LcfIR4yyLVW3@baasu.db.elephantsql.com:5432/fqcgxihc",
  facebookAuthClient: {
    clientID: "185911935241914",
    clientSecret: "6cf2860931a4a513613d3bec472ad0f7",
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    passReqToCallback : true,
    enableProof: true
  },
  googleAuthClient: {
    clientID: "185911935241914",
    clientSecret: "6cf2860931a4a513613d3bec472ad0f7",
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback : true
  }
}
