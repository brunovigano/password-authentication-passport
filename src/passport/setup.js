const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local  Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, senha, done) => {
    Usuario.findOne({ email: email })
      .then(usuario => {
        if (!usuario) {
          const novoUsuario = new Usuario({ email, senha });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
              if (err) throw err;
              novoUsuario.senha = hash;
              novoUsuario
                .save()
                .then(usuario => {
                  return done(null, user);
                })
                .catch(err => {
                  return done(null, false, { message: err });
                });
            });
          });
        } else {
          bcrypt.compare(passport, usuario.passport, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Wrong password' });
            }
          });
        }
      })
      .catch(err => {
        return done(null, false, { message: err });
      });
  })
);

module.exports = passport;
